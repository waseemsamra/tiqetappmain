
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

type Order = {
  no: number;
  product: string;
  invoiceId: string;
  username: string;
  paymentMethod: string;
  orderDate: string;
  totalPrice: number;
};

export const columns: ColumnDef<Order>[] = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'product', header: 'Product' },
  { accessorKey: 'invoiceId', header: 'Invoice Id' },
  { accessorKey: 'username', header: 'Username' },
  { accessorKey: 'paymentMethod', header: 'Payment Method' },
  { accessorKey: 'orderDate', header: 'Order Date' },
  { accessorKey: 'totalPrice', header: 'Total Price', cell: ({ row }) => `$${row.original.totalPrice}` },
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
          <DropdownMenuItem>View</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
