'use client';

import { useState, useTransition } from 'react';
import type { RowSelectionState } from "@tanstack/react-table";
import { columns } from "./columns";
import { DataTable } from "@/app/admin/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Trash2 } from "lucide-react";
import { CleanupButton } from "./cleanup-button";
import type { Excursion } from "@/types";
import { ApproveAllButton } from "./approve-all-button";
import { CsvImport } from "./csv-import";
import { Separator } from "@/components/ui/separator";
import { deleteSelectedExcursionsAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function ExcursionsClientPage({ 
    initialExcursions
}: { 
    initialExcursions: Excursion[];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isDeleting, startDeleteTransition] = useTransition();

  const selectedIds = Object.keys(rowSelection).filter(key => rowSelection[key]).map(key => initialExcursions[parseInt(key)].id);

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    if (confirm(`Are you sure you want to delete ${selectedIds.length} excursion(s)? This action cannot be undone.`)) {
        startDeleteTransition(async () => {
            const result = await deleteSelectedExcursionsAction(selectedIds);
            if (result.success) {
                toast({ title: 'Success', description: result.message });
                setRowSelection({}); // Clear selection
                router.refresh(); // Refresh the page to show the updated list
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
            <h1 className="text-3xl font-bold tracking-tight">Excursions</h1>
            <p className="text-muted-foreground">Manage all travel excursions here.</p>
        </div>
        <div className="flex items-center gap-2">
            <ApproveAllButton />
            <CleanupButton />
            <Button asChild>
              <Link href="/admin/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New
              </Link>
            </Button>
        </div>
      </div>
      <CsvImport />
      <Separator className="my-8" />
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
        data={initialExcursions}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        filterColumn="name"
        filterPlaceholder="Filter excursions..."
        pageSize={200}
      />
    </div>
  );
}
