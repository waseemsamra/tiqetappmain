'use client';

import { DataTable } from '@/app/admin/data-table';
import type { ColumnDef } from "@tanstack/react-table";

interface OptionItem {
  id: string;
  name: string;
  type: string;
  price: number;
  status: string;
}

const columns: ColumnDef<OptionItem>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Option Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "status", header: "Status" },
];

export default function OptionsClientPage() {
  const data: OptionItem[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Options</h1>
        <p className="text-muted-foreground">Manage excursion options and ticket types.</p>
      </div>

      <DataTable
        columns={columns}
        data={data}
        filterColumn="name"
        filterPlaceholder="Filter options..."
        pageSize={200}
      />
    </div>
  );
}
