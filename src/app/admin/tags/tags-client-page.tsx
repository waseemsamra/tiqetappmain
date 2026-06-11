'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/app/admin/data-table';
import type { ColumnDef } from "@tanstack/react-table";

interface Tag {
  id: string;
  name: string;
  type_name: string;
  type_id: string;
  type_group_name?: string | null;
}

const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tag Name",
  },
  {
    accessorKey: "type_name",
    header: "Type",
  },
  {
    accessorKey: "type_group_name",
    header: "Group",
    cell: ({ row }) => row.original.type_group_name || '-',
  },
];

export default function TagsClientPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_TIQETS_API_KEY;
    if (!apiKey) {
      setError('Missing NEXT_PUBLIC_TIQETS_API_KEY');
      setLoading(false);
      return;
    }

    fetch('/api/admin/tags', {
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setTags(data.tags || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch tags');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading tags...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
        <p className="text-muted-foreground">Manage tags from Tiqets.</p>
      </div>

      <DataTable
        columns={columns}
        data={tags}
        filterColumn="name"
        filterPlaceholder="Filter tags..."
        pageSize={200}
      />
    </div>
  );
}
