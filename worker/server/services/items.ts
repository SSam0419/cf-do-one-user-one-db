import { itemsTable } from "../../server/db/core/schemas/items";
import type { CreateItemValidation } from "../../server/validations";
import { desc } from "drizzle-orm";
import { DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";

export const listItems = ({ db }: { db: DrizzleSqliteDODatabase<any> }) => {
  return db.select().from(itemsTable).orderBy(desc(itemsTable.createdAt)).all();
};

export const createItem = ({
  db,
  data,
}: {
  db: DrizzleSqliteDODatabase<any>;
  data: CreateItemValidation;
}) => {
  return db.insert(itemsTable).values(data).returning();
};
