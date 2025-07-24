"use client";
import ResponsiveDialog from "@/components/responsiveDialog";

import { MeetingForm } from "./meetingsForm";
import { MeetingGetOne } from "../../types";

interface IResponsiveDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: IResponsiveDialog) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the meeting details."
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onError={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateMeetingDialog;
