
'use client';

import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal, Plus } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/app/admin/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Event = {
  no: number;
  type: string;
  url: string;
  zoomPassword?: string;
  from: string;
  time: string;
  duration: string;
  host: string;
  topic: string;
};

const columns: ColumnDef<Event>[] = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'type', header: 'Events Type' },
  { accessorKey: 'url', header: 'URL', cell: ({ row }) => <span className="truncate max-w-xs block">{row.original.url}</span> },
  { accessorKey: 'zoomPassword', header: 'Zoom Password' },
  { accessorKey: 'from', header: 'From' },
  { accessorKey: 'time', header: 'Time' },
  { accessorKey: 'duration', header: 'Duration' },
  { accessorKey: 'host', header: 'Host' },
  { accessorKey: 'topic', header: 'Topic' },
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

export default function EventsClientPage({ initialEvents }: { initialEvents: Event[] }) {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <Button asChild>
          <Link href="#">
            <Plus className="mr-2 h-4 w-4" />
            Events
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={initialEvents}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            filterColumn="topic"
            filterPlaceholder="Filter by topic..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
