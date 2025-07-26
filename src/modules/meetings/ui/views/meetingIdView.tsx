"use client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import MeetingIdViewHeader from "../components/meetingIdViewHeader";
import UpdateMeetingDialog from "../components/updateMeetingDialog";
import { ActiveState } from "@/components/activeState";
import { UpcomingState } from "@/components/upcomingState";
import { CancelledState } from "@/components/cancelledState";
import { ProcessingState } from "@/components/processingState";
import CompletedState from "@/components/completedState";

interface IMeetingIdView {
  meetingId: string;
}

const MeetingIdView = ({ meetingId }: IMeetingIdView) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={() => removeMeeting.mutate({ id: meetingId })}
        />
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isCancelled && <CancelledState />}
        {isCompleted && <CompletedState data={data} />}
        {isProcessing && <ProcessingState />}
      </div>
    </>
  );
};

export default MeetingIdView;

export const MeetingsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings."
      description="This may take a while."
    />
  );
};

export const MeetingsIdViewError = () => {
  return (
    <ErrorState
      title="Error while loading Meetings."
      description="Please try again later."
    />
  );
};
