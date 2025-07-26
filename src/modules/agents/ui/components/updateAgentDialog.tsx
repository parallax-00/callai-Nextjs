// "use client";
import ResponsiveDialog from "@/components/responsiveDialog";
import { AgentForm } from "./agentsForm";
import { AgentGetOne } from "../../types";

interface IResponsiveDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initailValues: AgentGetOne;
}

const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initailValues,
}: IResponsiveDialog) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the Agent details."
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onError={() => onOpenChange(false)}
        initialValues={initailValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentDialog;
