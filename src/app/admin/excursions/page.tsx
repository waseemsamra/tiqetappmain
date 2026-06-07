
import { getExcursionsForAdmin } from "@/lib/excursions";
import ExcursionsClientPage from "./excursions-client-page";
import { Suspense } from "react";

export const revalidate = 0;

const EXCURSIONS_PER_PAGE = 50;

async function ExcursionsContent({ searchParams }: { searchParams: { page?: string, search?: string }}) {
    const page = Number(searchParams?.page) || 1;
    const search = searchParams?.search || '';

    const { excursions, totalCount } = await getExcursionsForAdmin({ page, perPage: EXCURSIONS_PER_PAGE, search });

    return (
        <ExcursionsClientPage 
            initialExcursions={excursions}
            totalCount={totalCount}
            page={page}
            perPage={EXCURSIONS_PER_PAGE}
        />
    );
}


export default async function ExcursionsPage({ searchParams }: { searchParams: { page?: string, search?: string }}) {
  return (
    <Suspense fallback={<div>Loading excursions...</div>}>
      <ExcursionsContent searchParams={searchParams} />
    </Suspense>
  );
}
