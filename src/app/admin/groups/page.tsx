import { getGroups } from "@/lib/user-service";
import GroupsClientPage from "./groups-client-page";
import { Suspense } from "react";

export const revalidate = 0; // Ensure fresh data on every request

const GROUPS_PER_PAGE = 25;

async function GroupsContent({ searchParams }: { searchParams: { page?: string, search?: string }}) {
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';

  const { groups, totalCount } = await getGroups({ page, perPage: GROUPS_PER_PAGE, search });

  return (
    <GroupsClientPage 
      initialGroups={groups}
      title="Group Management"
      description="View and manage user groups."
      totalCount={totalCount}
      page={page}
      perPage={GROUPS_PER_PAGE}
    />
  );
}

export default async function GroupsPage({ searchParams }: { searchParams: { page?: string, search?: string }}) {
  return (
    <Suspense fallback={<div>Loading groups...</div>}>
      <GroupsContent searchParams={searchParams} />
    </Suspense>
  );
}