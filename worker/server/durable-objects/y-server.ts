import type { Connection } from "partyserver";
import { YServer } from "y-partyserver";
import * as Y from "yjs";

export class YPartyServer extends YServer {
  onError(connection: Connection, error: unknown): void | Promise<void> {
    console.log("@onError", { connection, error });
    return;
  }

  onClose(
    connection: Connection<unknown>,
    code: number,
    reason: string,
    wasClean: boolean
  ): void | Promise<void> {
    console.log("@onClose", { connection, code, reason, wasClean });
    return;
  }

  onStart(): Promise<void> {
    console.log("@onStart");
    return Promise.resolve();
  }

  async onLoad() {
    console.log("@onLoad");
    // load a document from a database, or some remote resource
    // and apply it on to the Yjs document instance at `this.document`
    // const content = (await fetchDataFromExternalService(this.name)) as Uint8Array;

    const name = this.name;
    const parts = name.split("_");
    const id = parts[0];
    const slug = parts.slice(1).join("_");
    console.log("@onLoad", { name, id, slug });

    const content =
      await this.env.WORKSPACE_API.getByName(slug).getDocument(id);
    if (content) {
      Y.applyUpdate(this.document, content);
    }
    return;
  }

  async onSave() {
    console.log("@onSave");
    // called every few seconds after edits, and when the room empties
    // you can use this to write to a database or some external storage
    // await sendDataToExternalService(this.name, Y.encodeStateAsUpdate(this.document) satisfies Uint8Array);

    const name = this.name;
    const parts = name.split("_");
    const id = parts[0];
    const slug = parts.slice(1).join("_");
    console.log("@onSave", { name, id, slug });

    await this.env.WORKSPACE_API.getByName(slug).saveDocument(
      id,
      Y.encodeStateAsUpdate(this.document) satisfies Uint8Array
    );
  }
}
