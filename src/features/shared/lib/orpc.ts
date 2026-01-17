import { createORPCClient, onError } from "@orpc/client";
import type { ContractRouterClient } from "@orpc/contract";
import type { JsonifiedClient } from "@orpc/openapi-client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { apiRouter } from "@/worker/server/orpc/api-router";
import { apiContract } from "@/worker/server/lib/contracts";

const link = new OpenAPILink(apiContract as typeof apiRouter, {
  url: `${import.meta.env.VITE_URL}/api`,
  headers: () => ({}),
  fetch: (request, init) => {
    return globalThis.fetch(request, {
      ...init,
      credentials: "include", // Include cookies for cross-origin requests
    });
  },
  interceptors: [
    onError((error: unknown) => {
      console.error(error);
    }),
  ],
});

export const orpcClient: JsonifiedClient<
  ContractRouterClient<typeof apiRouter>
> = createORPCClient(link);

export const orpcQuery = createTanstackQueryUtils(orpcClient);
