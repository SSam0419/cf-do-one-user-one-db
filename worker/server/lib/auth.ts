import * as schemas from "@/worker/server/db/better-auth/better-auth-schemas";
import type { D1Database } from "@cloudflare/workers-types";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";

export const createAuthClient = (db: D1Database, trustedOrigins: string[]) =>
  betterAuth({
    database: drizzleAdapter(drizzle(db), {
      schema: schemas,
      provider: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      organization({
        allowUserToCreateOrganization: false, // handle it server side
      }),
    ],
    trustedOrigins,
  });
