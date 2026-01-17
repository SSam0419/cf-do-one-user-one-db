import * as schemas from "@/worker/server/db/core/schemas";
import type { Item } from "@/worker/server/models/item";
import { createItem, listItems } from "@/worker/server/services/items";
import { runMigrations } from "@/worker/server/services/migrations";
import type { CreateItemValidation } from "@/worker/server/validations";
import { DurableObject } from "cloudflare:workers";
import { drizzle, DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";

export class WorkspaceAPI extends DurableObject<Env> {
  // sessions: Map<WebSocket, { [key: string]: string }>;
  storage: DurableObjectStorage;
  db: DrizzleSqliteDODatabase<typeof schemas>;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    // this.sessions = new Map();
    this.storage = ctx.storage;
    this.db = drizzle(this.storage, { logger: false });

    ctx.blockConcurrencyWhile(async () => {
      await runMigrations({ storage: this.storage, db: this.db });
    });
  }

  async getDocument(name: string) {
    const content = await this.storage.get(name);
    return content as unknown as Uint8Array;
  }

  async saveDocument(name: string, content: Uint8Array) {
    await this.storage.put(name, content);
    return { success: true };
  }

  async listItems(): Promise<Item[]> {
    const items = await listItems({ db: this.db });
    return items;
  }

  async createItem(item: CreateItemValidation) {
    return await createItem({ db: this.db, data: item });
  }
}
