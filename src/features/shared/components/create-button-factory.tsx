import { Button } from "@/features/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/shared/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

type CreateButtonFactoryProps = {
  header: {
    title: string | React.ReactNode;
    description?: string;
  } | null;
  dialogTriggerRender:
    | {
        type: "none";
      }
    | {
        type: "default";
        text: string;
        withIcon?: boolean;
      }
    | {
        type: "custom";
        trigger: React.ReactNode;
      };
  form: ({ setOpen }: { setOpen: (open: boolean) => void }) => React.ReactNode;
};

const renderDialogTrigger = (
  dialogTriggerRender: CreateButtonFactoryProps["dialogTriggerRender"]
) => {
  switch (dialogTriggerRender.type) {
    case "none":
      return null;
    case "default":
      return (
        <DialogTrigger render={<Button />}>
          {(dialogTriggerRender.withIcon ?? true) && (
            <Plus className="size-4 text-muted-foreground" />
          )}
          {dialogTriggerRender.text}
        </DialogTrigger>
      );
    case "custom":
      return dialogTriggerRender.trigger;
  }
};

export const CreateButtonFactory = ({
  header,
  form,
  dialogTriggerRender,
}: CreateButtonFactoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {renderDialogTrigger(dialogTriggerRender)}
      <DialogContent>
        {header && (
          <DialogHeader>
            <DialogTitle>{header.title}</DialogTitle>
            <DialogDescription>{header.description}</DialogDescription>
          </DialogHeader>
        )}
        {form({ setOpen })}
      </DialogContent>
    </Dialog>
  );
};
