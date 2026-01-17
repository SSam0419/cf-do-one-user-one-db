import { createOrganizationInvitationQueryOptions } from "@/features/organization/hooks/invitations";
import { Button } from "@/features/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/features/shared/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/features/shared/components/ui/input-group";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { CreateButtonFactory } from "../../shared/components/create-button-factory";

export const InviteMemberButton = ({ orgId }: { orgId: string }) => {
  return (
    <CreateButtonFactory
      header={{
        title: "Invite member",
        description:
          "Enter the email of the member you want to invite to the organization",
      }}
      dialogTriggerRender={{ type: "default", text: "Invite", withIcon: false }}
      form={({ setOpen }) => (
        <InviteMemberForm
          onCancel={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
          orgId={orgId}
        />
      )}
    />
  );
};

const InviteMemberForm = ({
  onCancel,
  onSuccess,
  orgId,
}: {
  onCancel: () => void;
  onSuccess: () => void;
  orgId: string;
}) => {
  const inviteMemberMutation = useInviteMemberMutation(orgId);

  const form = useForm({
    resolver: zodResolver(z.object({ email: z.email() })),
    defaultValues: { email: "" },
    disabled: inviteMemberMutation.isPending,
  });

  const onSubmit = form.handleSubmit((data) => {
    inviteMemberMutation.mutate(
      {
        email: data.email,
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
            control={form.control}
            name="email"
            render={({ field, fieldState }) => {
              return (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                    <InputGroupInput
                      required
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Field orientation={"horizontal"} className="justify-end gap-2">
          <Button variant="ghost" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button isLoading={inviteMemberMutation.isPending} type="submit">
            Invite
          </Button>
        </Field>
      </FieldSet>
    </form>
  );
};

const useInviteMemberMutation = (orgId: string) => {
  const queryClient = useQueryClient();
  const organizationInvitationsQueryKey =
    createOrganizationInvitationQueryOptions({ orgId }).queryKey;

  return useMutation({
    mutationKey: ["add-member"],
    mutationFn: async ({ email }: { email: string }) => {
      const invitation = await authClient.organization.inviteMember({
        email,
        role: "member",
        organizationId: orgId,
      });
      if (invitation.error) {
        throw new Error(
          invitation.error.message || invitation.error.statusText
        );
      }
      return invitation.data;
    },
    meta: {
      successMessage: "Member invited",
      errorMessage: "Failed to invite member",
    },
    onSuccess: async (data) => {
      await queryClient.cancelQueries({
        queryKey: organizationInvitationsQueryKey,
      });
      queryClient.setQueryData(organizationInvitationsQueryKey, (old) => {
        return [...(old || []), data];
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: organizationInvitationsQueryKey,
      });
    },
  });
};
