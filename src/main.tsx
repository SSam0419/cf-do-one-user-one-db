import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "@/features/shared/components/ui/sonner";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

interface MutationMeta extends Record<string, unknown> {
  successMessage?: string;
  errorMessage?: string;
}

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: MutationMeta;
  }
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _onMutateResult, mutation) => {
      const { meta } = mutation;
      if (meta?.successMessage) {
        toast.success(meta.successMessage);
      }
    },
    onError: (error, _variables, _onMutateResult, mutation) => {
      const { meta } = mutation;
      if (meta?.errorMessage) {
        toast.error(meta.errorMessage, {
          description:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    },
  }),
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
