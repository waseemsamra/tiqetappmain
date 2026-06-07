'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Lead = {
  no: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
};

export const columns: ColumnDef<Lead>[] = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phoneNumber', header: 'Phone Number' },
  { accessorKey: 'createdAt', header: 'Created at' },
  {
    id: 'actions',
    header: 'Edit',
    cell: () => (
      <Button variant="ghost" size="icon">
        <Edit className="h-4 w-4" />
      </Button>
    ),
  },
];
