"use client";

import { DataTable } from "@/components/dataTable";
import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";
import { useTRPC } from "@/trpc/client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/emptyState";

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div>
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Schedule your first Meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  );
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
