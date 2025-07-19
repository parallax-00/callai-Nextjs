"use client";

import {
  defaultShouldDehydrateQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { LoadingState } from "@/components/loadingState";
import { ErrorState } from "@/components/errorState";

import { DataTable } from "../components/dataTable";

import { columns } from "../components/columns";
import { EmptyState } from "@/components/emptyState";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns} />
      {data.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your first meeting. Each Agent will follow your instructions and interact with participants during the call."
        />
      )}
    </div>
  );
};

export default AgentsView;

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents."
      description="This may take a while."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error while loading Agents."
      description="Please try again later."
    />
  );
};
