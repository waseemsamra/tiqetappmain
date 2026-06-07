
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Coupon = {
    no: number;
    couponName: string;
    code: string;
    type: string;
    usedAvailable: string;
    discount: number;
    startDate: string;
    endDate: string;
    active: string;
    createdAt: string;
};


export const columns: ColumnDef<Coupon>[] = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'couponName', header: 'Coupon Name' },
  { accessorKey: 'code', header: 'Code' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'usedAvailable', header: 'Used / Available' },
  { accessorKey: 'discount', header: 'Discount (Fixed/%)' },
  { accessorKey: 'startDate', header: 'Start Date' },
  { accessorKey: 'endDate', header: 'End Date' },
  { accessorKey: 'active', header: 'Active' },
  { accessorKey: 'createdAt', header: 'Created at' },
  {
    id: 'actions',
    header: 'Action',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
