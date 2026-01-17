export const InitQueries: string[] = [
  `CREATE TABLE \`items\` (
      \`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      \`name\` text NOT NULL,
      \`description\` text,
      \`created_at\` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
      \`updated_at\` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
    )`,
  `CREATE TABLE \`versions\` (
      \`version\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      \`note\` text,
      \`created_at\` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
    )`,
];
