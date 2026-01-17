import { useItems } from "@/features/items/hooks/use-items";
import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "@/features/shared/components/ui/editor";
import { Spinner } from "@/features/shared/components/ui/spinner";

export const Route = createFileRoute("/app/$slug/_items/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug, id } = Route.useParams();
  const auth = authClient.useSession();
  const items = useItems({ slug });

  if (auth.isPending) {
    return (
      <div className="flex items-center gap-4">
        <Spinner />
        Loading...
      </div>
    );
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (!auth.data) {
    return <div>Not authenticated</div>;
  }

  if (items.isPending) {
    return (
      <div className="flex items-center gap-4">
        <Spinner />
        Loading...
      </div>
    );
  }

  if (items.error) {
    return <div>Error: {items.error.message}</div>;
  }

  if (!items.data) {
    return <div>Item not found</div>;
  }

  const item = items.data.find((item) => item.id.toString() === id);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <Editor
        host={`${import.meta.env.VITE_URL}`}
        room={`${id}_${slug}`}
        user={auth.data.user.name}
      />
    </div>
  );
}
