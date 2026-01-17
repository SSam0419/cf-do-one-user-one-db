import { drizzle as drizzleD1 } from "drizzle-orm/d1";

export const createD1AuthDb = ({ d1 }: { d1: D1Database }) => drizzleD1(d1);
export * as betterAuthSchemas from "./better-auth-schemas";
