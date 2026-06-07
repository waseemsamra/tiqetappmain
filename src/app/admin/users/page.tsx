
import { getUsers } from "@/lib/user-service";
import UsersClientPage from "./users-client-page";
import { Suspense } from "react";

export const revalidate = 0; // Ensure fresh data on every request

const USERS_PER_PAGE = 25;

async function UsersContent({ searchParams }: { searchParams: { page?: string, search?: string }}) {
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';

  const { users, totalCount } = await getUsers({ page, perPage: USERS_PER_PAGE, search });

  return (
    <UsersClientPage 
      initialUsers={users}
      title="User Management"
      description="View and manage all registered users."
      totalCount={totalCount}
      page={page}
      perPage={perPage}
    />
  );
}


export default async function UsersPage({ searchParams }: { searchParams: { page?: string, search?: string }}) {
  return (
     <Suspense fallback={<div>Loading users...</div>}>
      <UsersContent searchParams={searchParams} />
    </Suspense>
  );
}
