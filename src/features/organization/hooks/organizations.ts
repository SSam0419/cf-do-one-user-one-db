import { orpcQuery } from "@/features/shared/lib/orpc";
import { authClient } from "@/lib/auth-client";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const createOrganizationQueryOptions = () => {
  return queryOptions({
    queryKey: ["organizations"],
    queryFn: async () => {
      const organizations = await authClient.organization.list();

      if (organizations.error) {
        throw new Error(
          organizations.error.message || organizations.error.statusText
        );
      }

      return organizations.data;
    },
  });
};

export const useOrganizations = () => {
  return useQuery(createOrganizationQueryOptions());
};

export const useCreateOrganizationMutation = ({
  onSuccess = () => {},
}: {
  onSuccess?: () => void;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    ...orpcQuery.organizations.create.mutationOptions({
      meta: {
        successMessage: "Organization created successfully",
        errorMessage: "Failed to create organization",
      },
      onSuccess: async (data) => {
        if (!data) return;

        await queryClient.cancelQueries({
          queryKey: createOrganizationQueryOptions().queryKey,
        });
        queryClient.setQueryData(
          createOrganizationQueryOptions().queryKey,
          (old) => {
            return [
              ...(old || []),
              {
                ...data,
                createdAt: new Date(data.createdAt),
              },
            ];
          }
        );

        if (!data) return;
        navigate({
          to: "/app/$slug",
          params: {
            slug: data.slug,
          },
        });

        onSuccess();
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: createOrganizationQueryOptions().queryKey,
        });
      },
    }),
  });
};
