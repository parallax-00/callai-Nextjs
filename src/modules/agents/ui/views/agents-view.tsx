"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { LoadingState } from "@/components/loadingState";
import { ErrorState } from "@/components/errorState";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
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
