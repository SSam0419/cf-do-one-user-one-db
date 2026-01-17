import { orpcQuery } from "@/features/shared/lib/orpc";
import { useQuery } from "@tanstack/react-query";

export const useItems = ({ slug }: { slug: string }) => {
  return useQuery(orpcQuery.items.list.queryOptions({ input: { slug } }));
};
