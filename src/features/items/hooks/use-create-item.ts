import { orpcQuery } from "@/features/shared/lib/orpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    orpcQuery.items.create.mutationOptions({
      onSuccess: (data, variables) => {
        const { slug } = variables;
        queryClient.setQueryData(
          orpcQuery.items.list.queryKey({
            input: {
              slug,
            },
          }),
          (old) => (old ? [...old, data] : [data])
        );
      },
      meta: {
        successMessage: "Item created successfully",
        errorMessage: "Failed to create item",
      },
    })
  );
};
