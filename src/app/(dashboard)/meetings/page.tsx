import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { Suspense } from "react";

import { SearchParams } from "nuqs/server";
import MeetingsView, {
  MeetingsViewError,
  MeetingsViewLoading,
} from "@/modules/meetings/ui/views/meetingsView";
import MeetingsListHeader from "@/modules/meetings/ui/components/meetingsListHeader";
import { loadSearchParams } from "@/modules/meetings/params";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getQueryClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

interface IPage {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: IPage) => {
  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );

  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
