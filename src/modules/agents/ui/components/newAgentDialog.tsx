// "use client";
import ResponsiveDialog from "@/components/responsiveDialog";
import { AgentForm } from "./agentsForm";

interface IResponsiveDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewAgentDialog = ({ open, onOpenChange }: IResponsiveDialog) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onError={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewAgentDialog;
