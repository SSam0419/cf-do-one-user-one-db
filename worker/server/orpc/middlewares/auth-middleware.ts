import type { ORPCContext } from "@/worker/server/orpc/api-router";
import { ORPCError, os } from "@orpc/server";

export const authMiddleware = os
  .$context<ORPCContext>()
  .middleware(async ({ context, next }) => {
    const { authClient, headers } = context;

    const [sessionData, organizations] = await Promise.all([
      authClient.api.getSession({
        headers,
      }),
      authClient.api.listOrganizations({
        headers,
      }),
    ]);

    if (!sessionData?.session || !sessionData?.user) {
      throw new ORPCError("UNAUTHORIZED");
    }

    return next({
      context: {
        session: sessionData.session,
        user: sessionData.user,
        organizations,
      },
    });
  });
