"use client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { DataTable } from "@/components/dataTable";
import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";

import { columns } from "../components/columns";
import { EmptyState } from "@/components/emptyState";
import { DataPagination } from "@/components/dataPagination";

import { useMeetingsFilters } from "../../hooks/useMeetingsFilter";
import { useRouter } from "next/navigation";

const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );
  return (
    <div>
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
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
