import { CreateOrganizationForm } from "@/features/organization/components/create-organization-form";
import { CreateButtonFactory } from "@/features/shared/components/create-button-factory";
import { DialogClose } from "@/features/shared/components/ui/dialog";

export const CreateOrganizationButton = () => {
  return (
    <CreateButtonFactory
      header={null}
      form={({ setOpen }) => (
        <CreateOrganizationForm
          onSuccess={() => setOpen(false)}
          cancelButton={({ isSubmitting }) => (
            <DialogClose disabled={isSubmitting}>Cancel</DialogClose>
          )}
        />
      )}
      dialogTriggerRender={{
        type: "default",
        text: "Organization",
      }}
    />
  );
};
