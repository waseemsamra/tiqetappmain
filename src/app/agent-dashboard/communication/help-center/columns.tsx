
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, User, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

type Ticket = {
  no: number;
  ticketNumber: string;
  from: string;
  date: string;
  subject: string;
  status: string;
  priority: string;
  department: string;
  category: string;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'no',
    header: 'No',
  },
  {
    accessorKey: 'ticketNumber',
    header: 'Ticket Number',
    cell: ({ row }) => <Link href="#" className="text-primary hover:underline">{row.original.ticketNumber}</Link>,
  },
  {
    accessorKey: 'from',
    header: 'From',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
        <Select defaultValue={row.original.status.toLowerCase()}>
            <SelectTrigger className="w-[100px]"><SelectValue placeholder={row.original.status} /></SelectTrigger>
            <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
        </Select>
    )
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Impersonate
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
