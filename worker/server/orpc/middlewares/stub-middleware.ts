import type { ORPCContext } from "@/worker/server/orpc/api-router";
import { ORPCError, os } from "@orpc/server";

export const stubMiddleware = os
  .$context<
    ORPCContext & {
      organizations: { slug: string }[];
    }
  >()
  .middleware(async ({ context, next }, input: { slug: string }) => {
    const { slug } = input;
    if (
      !context.organizations.find((organization) => organization.slug === slug)
    ) {
      throw new ORPCError("UNAUTHORIZED");
    }

    const stub = context.workspaceAPI.getByName(slug);

    return next({
      context: {
        stub,
      },
    });
  });
