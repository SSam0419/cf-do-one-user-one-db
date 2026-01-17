import { orpcQuery } from "@/features/shared/lib/orpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/features/shared/components/ui/field";
import { Input } from "@/features/shared/components/ui/input";
import {
  createOrganizationValidation,
  type CreateOrganizationValidation,
} from "@/worker/server/validations";
import { Controller, useForm } from "react-hook-form";

type CreateOrganizationFormProps = {
  cancelButton?: ({
    isSubmitting,
  }: {
    isSubmitting: boolean;
  }) => React.ReactNode;
  onSuccess?: () => void;
};

export const CreateOrganizationForm = ({
  cancelButton,
  onSuccess,
}: CreateOrganizationFormProps) => {
  const navigate = useNavigate();
  const createOrganizationMutation = useMutation({
    ...orpcQuery.organizations.create.mutationOptions({
      meta: {
        successMessage: "Organization created successfully",
        errorMessage: "Failed to create organization",
      },
      onSuccess: (data) => {
        if (!data) return;
        navigate({
          to: "/app/$slug",
          params: {
            slug: data.slug,
          },
        });
        onSuccess?.();
      },
    }),
  });

  const form = useForm<CreateOrganizationValidation>({
    resolver: zodResolver(createOrganizationValidation),
    defaultValues: {
      name: "",
    },
    disabled: createOrganizationMutation.isPending,
  });

  const onSubmit = form.handleSubmit((data) => {
    createOrganizationMutation.mutate({
      name: data.name,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <FieldSet>
        <FieldLegend>Organization</FieldLegend>
        <FieldDescription>
          Create a new organization to get started.
        </FieldDescription>
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input placeholder="Organization Name" {...field} />
                <FieldDescription>
                  The name of the organization.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end gap-2">
          {cancelButton &&
            cancelButton({
              isSubmitting: createOrganizationMutation.isPending,
            })}
          <Button
            type="submit"
            isLoading={createOrganizationMutation.isPending}
          >
            Create
          </Button>
        </div>
      </FieldSet>
    </form>
  );
};
