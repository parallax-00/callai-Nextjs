"use client";

import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";
import { useTRPC } from "@/trpc/client";

import { useSuspenseQuery } from "@tanstack/react-query";

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>{JSON.stringify(data)}</div>;
};

export default MeetingsView;

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings."
      description="This may take a while."
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error while loading Meetings."
      description="Please try again later."
    />
  );
};
