'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { DataTable } from '@/app/admin/data-table';
import { columns, type Lead } from './columns';
import { Search } from 'lucide-react';

const NoDataAvailable = () => (
    <div className="text-center py-16">
        <div className="inline-block p-6 bg-muted rounded-full">
             <div className="p-4 bg-background rounded-full border-2 border-dashed flex items-center justify-center h-24 w-24">
                <div className="relative">
                    <Search className="h-12 w-12 text-muted-foreground" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">?</span>
                </div>
             </div>
        </div>
        <p className="mt-4 text-muted-foreground">No Data Available</p>
    </div>
);


export default function LeadsClientPage({ initialLeads }: { initialLeads: Lead[] }) {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <Card>
      <CardContent className="pt-6">
        {initialLeads.length > 0 ? (
           <DataTable
                columns={columns}
                data={initialLeads}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                filterColumn="name"
                filterPlaceholder="Filter by name..."
            />
        ) : (
            <NoDataAvailable />
        )}
        <div className="mt-6 flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
