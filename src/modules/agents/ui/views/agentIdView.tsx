"use client";

import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface IAgentId {
  agentId: string;
}

const AgentIdView = ({ agentId }: IAgentId) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export default AgentIdView;

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent."
      description="Just a second."
    />
  );
};

export const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Error while loading the Agent."
      description="Please try again later."
    />
  );
};
