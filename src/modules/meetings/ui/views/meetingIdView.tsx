"use client";

import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import MeetingIdViewHeader from "../components/meetingIdViewHeader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UpdateMeetingDialog from "../components/updateMeetingDialog";
import { optional } from "zod";
import { useState } from "react";

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
        router.push("/meeings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

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
