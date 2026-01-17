import { useCreateItem } from "@/features/items/hooks/use-create-item";
import { Button } from "@/features/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/features/shared/components/ui/field";
import { Input } from "@/features/shared/components/ui/input";
import { Spinner } from "@/features/shared/components/ui/spinner";
import {
  createItemValidation,
  type CreateItemValidation,
} from "@/worker/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export const CreateItemForm = ({
  slug,
  onSuccess,
  cancel,
}: {
  slug: string;
  onSuccess?: () => void;
  cancel?: ({ isSubmitting }: { isSubmitting: boolean }) => React.ReactNode;
}) => {
  const createItemMutation = useCreateItem();

  const form = useForm<CreateItemValidation>({
    resolver: zodResolver(createItemValidation),
    defaultValues: {
      name: "",
    },
    disabled: createItemMutation.isPending,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    createItemMutation.mutate(
      {
        slug,
        body: data,
      },
      {
        onSuccess,
      }
    );
  });

  return (
    <form onSubmit={onSubmit}>
      <FieldSet>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Item name</FieldLabel>
                <Input required placeholder="Enter item name" {...field} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex justify-end gap-2">
          {cancel && cancel({ isSubmitting: createItemMutation.isPending })}
          <Button type="submit" disabled={createItemMutation.isPending}>
            {createItemMutation.isPending && <Spinner />}
            Create Item
          </Button>
        </div>
      </FieldSet>
    </form>
  );
};
