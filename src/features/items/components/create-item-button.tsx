import { CreateItemForm } from "@/features/items/components/create-item-form";
import { CreateButtonFactory } from "@/features/shared/components/create-button-factory";
import { DialogClose } from "@/features/shared/components/ui/dialog";

export const CreateItemButton = ({ slug }: { slug: string }) => {
  return (
    <CreateButtonFactory
      dialogTriggerRender={{
        type: "default",
        text: "Item",
      }}
      header={{
        title: <span>New Item</span>,
        // description: "fill in the following fields to create a new item",
      }}
      form={({ setOpen }) => (
        <CreateItemForm
          slug={slug}
          onSuccess={() => setOpen(false)}
          cancel={({ isSubmitting }) => (
            <DialogClose disabled={isSubmitting}>Cancel</DialogClose>
          )}
        />
      )}
    />
  );
};
