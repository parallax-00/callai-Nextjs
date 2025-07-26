// "use client";
import ResponsiveDialog from "@/components/responsiveDialog";
import { useRouter } from "next/navigation";

import { MeetingForm } from "./meetingsForm";

interface IResponsiveDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewMeetingDialog = ({ open, onOpenChange }: IResponsiveDialog) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new meeting."
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onError={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewMeetingDialog;
