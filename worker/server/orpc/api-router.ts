/// <reference types="../../../worker-configuration" />

import type { WorkspaceAPI } from "@/worker/server/durable-objects/workspace-api";
import { createAuthClient } from "@/worker/server/lib/auth";
import type { Item } from "@/worker/server/models/item";
import { stubMiddleware } from "@/worker/server/orpc/middlewares/stub-middleware";
import {
  createItemValidation,
  createOrganizationValidation,
} from "@/worker/server/validations";
import { os } from "@orpc/server";
import { type Organization } from "better-auth/plugins/organization";
import { type Session, type User } from "better-auth/types";
import { z } from "zod";

type BaseContext = {
  headers: Headers;
  session: Session;
  user: User;
  organizations: Organization[];
  authClient: ReturnType<typeof createAuthClient>;
};

type CloudflareWorkerEnvContext = {
  authDb: D1Database;
  workspaceAPI: DurableObjectNamespace<WorkspaceAPI>;
};

export interface ORPCContext extends BaseContext, CloudflareWorkerEnvContext {}

export const apiRouter = {
  health: os
    .$context<ORPCContext>()
    .route({
      method: "GET",
      path: "/",
    })
    .handler(async () => {
      return { ok: true };
    }),
  items: {
    list: os
      .$context<ORPCContext>()
      .route({
        method: "GET",
        path: "/{slug}/items",
      })
      .input(z.object({ slug: z.string() }))
      .use(stubMiddleware)
      .handler(async ({ context }) => {
        const { stub } = context;
        const items: Item[] = await stub.listItems();
        return items;
      }),
    create: os
      .$context<ORPCContext>()
      .route({
        method: "POST",
        path: "/{slug}/items",
      })
      .input(z.object({ slug: z.string(), body: createItemValidation }))
      .use(stubMiddleware)
      .handler(async ({ context, input }) => {
        const { stub } = context;
        const { body } = input;
        const [item] = await stub.createItem(body);
        return item as Item;
      }),
  },
  organizations: {
    create: os
      .$context<ORPCContext>()
      .route({
        method: "POST",
        path: "/organizations",
      })
      .input(createOrganizationValidation)
      .handler(async ({ context, input }) => {
        try {
          const { authClient } = context;
          const { name } = input;

          console.log({ name, userId: context.user.id });

          const organization = await authClient.api.createOrganization({
            body: {
              name,
              slug: `${name.toLowerCase().replace(/ /g, "-")}-${Date.now().toString(36).slice(0, 4)}`,
              userId: context.user.id,
            },
          });
          return organization;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }),
  },
};
