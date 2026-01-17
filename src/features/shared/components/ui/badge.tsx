import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils.js";

const badgeVariants = cva(
  "inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-400/15 text-zinc-700 group-data-hover:bg-zinc-400/25 dark:bg-zinc-400/10 dark:text-zinc-400 dark:group-data-hover:bg-zinc-400/20",
        success:
          "bg-green-400/15 text-green-700 group-data-hover:bg-green-400/25 dark:bg-green-400/10 dark:text-green-400 dark:group-data-hover:bg-green-400/20",
        info: "bg-blue-400/15 text-blue-700 group-data-hover:bg-blue-400/25 dark:bg-blue-400/10 dark:text-blue-400 dark:group-data-hover:bg-blue-400/20",
        warning:
          "bg-yellow-400/15 text-yellow-700 group-data-hover:bg-yellow-400/25 dark:bg-yellow-400/10 dark:text-yellow-400 dark:group-data-hover:bg-yellow-400/20",
        destructive:
          "bg-rose-400/15 text-rose-700 group-data-hover:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-data-hover:bg-rose-400/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
