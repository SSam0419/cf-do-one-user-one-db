import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useEffect, useState } from "react";
import useYProvider from "y-partyserver/react";
import * as Y from "yjs";

type EditorProps = {
  host: string;
  room: string;
  user: string;
};

export function Editor({ host, room, user }: EditorProps) {
  const doc = new Y.Doc();

  const provider = useYProvider({
    host,
    room,
    party: "my-y-server",
    doc,
    // options,
  });

  const [wsConnected, setWsConnected] = useState(provider.wsconnected);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("wsconnected", provider.wsconnected);
      if (provider.wsconnected) {
        clearInterval(interval);
        setWsConnected(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [provider]);

  const colors = [
    "#ff0000", // red
    "#00ff00", // green
    "#0000ff", // blue
    "#ffff00", // yellow
    "#ff00ff", // magenta
    "#00ffff", // cyan
    "#ff8000", // orange
    "#8000ff", // purple
    "#0080ff", // light blue
    "#ff0080", // pink
    "#80ff00", // lime
    "#008080", // teal
  ];

  // Hash function to convert username to a number
  const hashUsername = (username: string): number => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      const char = username.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Get color for user based on username hash
  const getUserColor = (username: string): string => {
    const index = hashUsername(username) % colors.length;
    return colors[index];
  };

  const editor = useCreateBlockNote({
    collaboration: {
      provider: provider,
      connect: false,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: user,
        color: getUserColor(user),
      },
      showCursorLabels: "activity",
    },
  });

  return (
    <BlockNoteView
      editable={wsConnected}
      editor={editor}
      shadCNComponents={
        {
          // Pass modified ShadCN components from your project here.
          // Otherwise, the default ShadCN components will be used.
        }
      }
    />
  );
}
