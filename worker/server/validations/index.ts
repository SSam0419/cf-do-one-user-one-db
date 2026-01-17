import { z } from "zod/v4";

export const createItemValidation = z.object({
  name: z.string().min(1),
});
export type CreateItemValidation = z.infer<typeof createItemValidation>;

export const createOrganizationValidation = z.object({
  name: z.string().min(1),
});
export type CreateOrganizationValidation = z.infer<
  typeof createOrganizationValidation
>;
