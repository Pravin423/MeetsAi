"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));


    return (
        <div className="overflow-x-scroll">
            <DataTable data={data.items} columns={columns} />
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