import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  dehydrate,
  HydrationBoundary,
  useQueryClient,
} from "@tanstack/react-query";
import { trpc } from "@/trpc/server";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import MeetingIdView, {
  MeetingsIdViewError,
  MeetingsIdViewLoading,
} from "@/modules/meetings/ui/views/meetingIdView";

interface IPage {
  params: Promise<{
    meetingId: string;
  }>;
}

const Page = async ({ params }: IPage) => {
  const { meetingId } = await params;
  const queryClient = useQueryClient();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingsIdViewError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
