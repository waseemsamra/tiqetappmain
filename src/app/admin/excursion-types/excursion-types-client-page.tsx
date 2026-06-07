
'use client';

import { useState, useTransition } from 'react';
import type { RowSelectionState } from "@tanstack/react-table";
import { columns } from "./columns";
import { DataTable } from "../data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Trash2 } from "lucide-react";
import type { ExcursionType } from "@/types";
import { deleteSelectedExcursionTypesAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function ExcursionTypesClientPage({ initialExcursionTypes }: { initialExcursionTypes: ExcursionType[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isDeleting, startDeleteTransition] = useTransition();

  const selectedIds = Object.keys(rowSelection)
    .filter(key => rowSelection[key])
    .map(key => initialExcursionTypes[parseInt(key)].id);

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    if (confirm(`Are you sure you want to delete ${selectedIds.length} excursion type(s)? This action cannot be undone.`)) {
        startDeleteTransition(async () => {
            const result = await deleteSelectedExcursionTypesAction(selectedIds);
            if (result.success) {
                toast({ title: 'Success', description: result.message });
                setRowSelection({}); // Clear selection
                router.refresh();
            } else {
                toast({ variant: 'destructive', title: 'Error', description: result.message });
            }
        });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Excursion Types</h1>
            <p className="text-muted-foreground">Manage all excursion types here.</p>
        </div>
        <Button asChild>
          <Link href="/admin/excursion-types/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      {selectedIds.length > 0 && (
        <div className="mb-4 flex items-center gap-4 rounded-lg border bg-card p-3">
            <p className="text-sm font-medium">{selectedIds.length} selected</p>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleDeleteSelected} 
              disabled={isDeleting}
            >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeleting ? 'Deleting...' : 'Delete Selected'}
            </Button>
        </div>
      )}

      <DataTable 
        columns={columns} 
        data={initialExcursionTypes}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
      />
    </div>
  );
}
