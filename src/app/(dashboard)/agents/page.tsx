import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";

import { SearchParams } from "nuqs";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import AgentsView, {
  AgentsViewError,
  AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import AgentsListHeader from "@/modules/agents/ui/components/agentsListHeader";
import { loadSearchParams } from "@/modules/agents/params";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface ISearchParams {
  searchParams: Promise<SearchParams>;
}

const page = async ({ searchParams }: ISearchParams) => {
  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.fetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
