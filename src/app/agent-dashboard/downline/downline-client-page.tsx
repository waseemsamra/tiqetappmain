

'use client';

import React, { useState } from 'react';
import type { UserForAdmin } from '@/types';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface DownlineClientPageProps {
  initialMembers: UserForAdmin[];
}

const MEMBERS_PER_PAGE = 10;

export function DownlineClientPage({ initialMembers }: DownlineClientPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(initialMembers.length / MEMBERS_PER_PAGE);
  const paginatedMembers = initialMembers.slice(
      (currentPage - 1) * MEMBERS_PER_PAGE,
      currentPage * MEMBERS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Network Members</h1>
            <Breadcrumb className="mt-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Network Members</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <Button asChild>
            <Link href="/agent-dashboard/downline/add">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Member
            </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
            <CardTitle>Your Downline</CardTitle>
            <CardDescription>View, filter, and manage members you have personally sponsored.</CardDescription>
        </CardHeader>
        <CardContent>
            <DataTable 
                columns={columns} 
                data={paginatedMembers}
                totalCount={initialMembers.length}
                page={currentPage}
                perPage={MEMBERS_PER_PAGE}
                onPageChange={setCurrentPage}
            />
        </CardContent>
      </Card>
    </div>
  );
}
