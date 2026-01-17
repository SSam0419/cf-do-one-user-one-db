import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "@/features/shared/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className="flex min-h-svh w-full flex-col bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
          <Outlet />
          <Toaster />
        </main>
      </ThemeProvider>
    </React.Fragment>
  );
}
