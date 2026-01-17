import { createAuthClient } from "@/worker/server/lib/auth";
import { addCorsHeaders, handleOptions } from "@/worker/server/lib/cors";
import { apiHandler } from "@/worker/server/orpc/api-handler";
import { routePartykitRequest } from "partyserver";

export { WorkspaceAPI } from "./server/durable-objects/workspace-api";
export { YPartyServer as MyYServer } from "./server/durable-objects/y-server";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle OPTIONS preflight requests
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }

    if (url.pathname.startsWith("/api/auth")) {
      const auth = createAuthClient(env.BetterAuthDB, [`${env.VITE_URL}`]);
      const response = await auth.handler(request);
      return addCorsHeaders(response, request);
    }

    // below are supposed to only be accessible to logged in user
    const auth = createAuthClient(env.BetterAuthDB, [`${env.VITE_URL}`]);
    const [sessionData, organizations] = await Promise.all([
      auth.api.getSession({
        headers: request.headers,
      }),
      auth.api.listOrganizations({
        headers: request.headers,
      }),
    ]);

    if (!sessionData?.session || !sessionData?.user) {
      return new Response("Unauthorized", { status: 400 });
    }

    if (url.pathname.startsWith("/parties/")) {
      const resp =
        (await routePartykitRequest(request, env, {
          onBeforeRequest: (_req, { party, name }) => {
            const parts = name.split("_");
            const id = parts[0];
            const slug = parts.slice(1).join("_");
            if (
              !organizations.find((organization) => organization.slug === slug)
            ) {
              return new Response("Unauthorized", { status: 400 });
            }
            console.log("@onBeforeRequest", { party, name, id, slug });
            return;
          },
          onBeforeConnect: (_req, { party, name }) => {
            const parts = name.split("_");
            const id = parts[0];
            const slug = parts.slice(1).join("_");
            if (
              !organizations.find((organization) => organization.slug === slug)
            ) {
              return new Response("Unauthorized", { status: 400 });
            }
            console.log("@onBeforeConnect", { party, name, id, slug });
            return;
          },
        })) || new Response("Not Found", { status: 404 });
      return resp;
    }

    const { matched, response } = await apiHandler.handle(request, {
      context: {
        headers: request.headers,
        authDb: env.BetterAuthDB,
        workspaceAPI: env.WORKSPACE_API,
        session: sessionData.session,
        organizations: organizations,
        user: sessionData.user,
        authClient: auth,
      },
      prefix: "/api",
    });

    if (matched) {
      return response;
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
