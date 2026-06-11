'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/app/admin/data-table';
import type { ColumnDef } from "@tanstack/react-table";

interface TagType {
  id: string;
  name: string;
  group_name: string;
}

const columns: ColumnDef<TagType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Type Name",
  },
  {
    accessorKey: "group_name",
    header: "Group",
  },
];

export default function TagTypesClientPage() {
  const [tagTypes, setTagTypes] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_TIQETS_API_KEY;
    if (!apiKey) {
      setError('Missing NEXT_PUBLIC_TIQETS_API_KEY');
      setLoading(false);
      return;
    }

    fetch('/api/admin/tag-types', {
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setTagTypes(data.tag_types || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch tag types');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading tag types...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tag Types</h1>
        <p className="text-muted-foreground">Manage tag types from Tiqets.</p>
      </div>

      <DataTable
        columns={columns}
        data={tagTypes}
        filterColumn="name"
        filterPlaceholder="Filter tag types..."
        pageSize={200}
      />
    </div>
  );
}
