import { useItems } from "@/features/items/hooks/use-items";
import { Link } from "@tanstack/react-router";

export const ItemsList = ({ slug }: { slug: string }) => {
  const itemsQuery = useItems({ slug });

  if (itemsQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (itemsQuery.isError) {
    return <div>Error: {itemsQuery.error.message}</div>;
  }

  if (itemsQuery.data.length === 0) {
    return <div>No items found</div>;
  }

  return (
    <div className="space-y-2">
      {itemsQuery.data.map((item) => (
        <Link
          key={item.id}
          to="/app/$slug/$id"
          params={{ slug: slug, id: item.id.toString() }}
          className="px-4 py-2 rounded-md dark:bg-zinc-800 block"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
