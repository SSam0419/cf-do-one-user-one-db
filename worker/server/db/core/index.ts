import { drizzle } from "drizzle-orm/libsql";

export const createAppDb = ({
  url,
  authToken,
}: {
  url: string;
  authToken: string;
}) => drizzle({ connection: { url, authToken } });

export * from "./schemas";
