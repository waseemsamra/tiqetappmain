
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DatePicker } from '@/app/agent-dashboard/financial/e-wallet/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, RefreshCw, Search, X } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { columns } from './columns';
import { DataTable } from '@/app/admin/data-table';


type JoiningReportData = {
  no: number;
  userName: string;
  email: string;
  sponsor: string;
  dateOfJoined: string;
};

export default function JoiningReportClientPage({ initialData }: { initialData: JoiningReportData[] }) {
    const [rowSelection, setRowSelection] = React.useState({});
    
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>{/* Can be used for title if needed */}</div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pick Start Date</label>
              <DatePicker />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pick End Date</label>
              <DatePicker />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Search User</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Search User" />
                </SelectTrigger>
                <SelectContent>
                  {/* Add user options here */}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button className="w-full">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
              <Button variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>

           <DataTable
            columns={columns}
            data={initialData}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            filterColumn="userName"
            filterPlaceholder="Filter by user name..."
          />

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
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
