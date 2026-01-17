import { versionsTable } from "../../db/core/schemas/versions";
import {
  DropItemDescription,
  InitQueries,
} from "../../services/migrations/queries";
import type { DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";

const coreDbMigrations = [
  {
    note: "Initial migration, create items and versions tables",
    queries: InitQueries,
    version: 1,
  },
  {
    note: "Drop item description column",
    queries: DropItemDescription,
    version: 2,
  },
];

export async function runMigrations({
  storage,
  db,
}: {
  storage: DurableObjectStorage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: DrizzleSqliteDODatabase<any>;
}) {
  try {
    // Check if versions table exists to determine current schema version
    let currentVersion = 0;
    try {
      const result = await storage.sql.exec<{ max_version: number | null }>(
        "SELECT MAX(version) as max_version FROM versions"
      );
      const row = result.one();
      const maxVersion = row?.max_version;
      currentVersion = maxVersion ? Number(maxVersion) : 0;
    } catch (error) {
      console.error("Error checking current version", { error });
      // Versions table doesn't exist yet, we're at version 0
      currentVersion = 0;
    }

    // Run migrations if needed
    if (currentVersion < coreDbMigrations.length) {
      const migrationsToRun = coreDbMigrations
        .sort((a, b) => a.version - b.version)
        .filter((m) => m.version > currentVersion);

      for (const migration of migrationsToRun) {
        // Run all queries for this migration
        for (const query of migration.queries) {
          await storage.sql.exec(query);
        }

        // Insert version record after successful migration
        // The versions table is created in the first migration, so after running
        // the queries, it should exist and we can insert the version record
        const noteValue = migration.note || null;
        await db.insert(versionsTable).values({
          version: migration.version,
          note: noteValue,
        });
      }
    }
  } catch (error) {
    console.error("Migration error", { error });
    throw new Error(
      `Failed to run migrations: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
