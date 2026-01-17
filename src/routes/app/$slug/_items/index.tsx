import { CreateItemButton } from "@/features/items/components/create-item-button";
import { ItemsList } from "@/features/items/components/items-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$slug/_items/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Items</h1>
        <CreateItemButton slug={slug} />
      </div>
      <ItemsList slug={slug} />
    </div>
  );
}
