
import { getUsers } from "@/lib/user-service";
import UsersClientPage from "../users-client-page";
import { Suspense } from "react";

export const revalidate = 0;
const USERS_PER_PAGE = 25;

async function PartnersContent({ searchParams }: { searchParams: { page?: string, search?: string }}) {
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';

  const { users, totalCount } = await getUsers({ page, perPage: USERS_PER_PAGE, search, role: 'partner' });

  return (
    <UsersClientPage 
      initialUsers={users}
      title="Partner Management"
      description="View and manage all registered partners."
      totalCount={totalCount}
      page={page}
      perPage={USERS_PER_PAGE}
    />
  );
}


export default async function PartnersPage({ searchParams }: { searchParams: { page?: string, search?: string }}) {
   return (
     <Suspense fallback={<div>Loading partners...</div>}>
      <PartnersContent searchParams={searchParams} />
    </Suspense>
  );
}
