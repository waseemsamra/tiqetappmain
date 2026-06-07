
'use client';

import { columns } from "./columns";
import { DataTable } from "./data-table";
import type { UserForAdmin } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useDebouncedCallback } from 'use-debounce';

export default function UsersClientPage({ 
  initialUsers, 
  title, 
  description,
  totalCount,
  page,
  perPage
}: { 
  initialUsers: UserForAdmin[],
  title: string,
  description: string,
  totalCount: number;
  page: number;
  perPage: number;
}) {

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </div>
        <Button asChild>
          <Link href="/admin/users/invite">
            <PlusCircle className="mr-2 h-4 w-4" />
            Invite User
          </Link>
        </Button>
      </div>
      <DataTable 
        columns={columns} 
        data={initialUsers}
        totalCount={totalCount}
        page={page}
        perPage={perPage}
      />
    </div>
  );
}
