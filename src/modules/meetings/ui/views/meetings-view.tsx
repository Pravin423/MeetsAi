"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const [filters, setFilters] = useMeetingsFilters();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({ ...filters }));


    return (
        <div className="overflow-x-scroll">
            <DataTable data={data.items} columns={columns} onRowCLick={(row) => {
                router.push(`/meetings/${row.id}`)
            }} />
            <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => {
                setFilters({ page })
            }} />
            {data.items.length === 0 && (
                <EmptyState
                    title="Create Your First Meetings"
                    description="Schedule a meeting to connect with your desired agent.
                    Each meeting lets you collabrate,share ideas and interact with participants in real time."
                />
            )}

        </div>
    )
}


export const MeetingsViewLoading = () => {
    return (
        <LoadingState title="Loading Meetings" description="This may few seconds..." />
    )
}



export const MeetingsViewError = () => {
    return (
        <ErrorState title="Something Went Wrong" description="Try Again Later..." />
    )
}