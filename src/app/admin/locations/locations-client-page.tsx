
'use client';

import { useState, useTransition } from 'react';
import type { RowSelectionState } from "@tanstack/react-table";
import { columns } from "./countries-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Trash2 } from "lucide-react";
import type { Country } from "@/types";
import { deleteSelectedCountriesAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/app/admin/data-table';

export default function LocationsClientPage({ initialCountries }: { initialCountries: Country[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isDeleting, startDeleteTransition] = useTransition();

  const selectedIds = Object.keys(rowSelection)
    .filter(key => rowSelection[key])
    .map(key => initialCountries[parseInt(key)].code);

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    if (confirm(`Are you sure you want to delete ${selectedIds.length} countries? This action cannot be undone and will delete all associated cities.`)) {
        startDeleteTransition(async () => {
            const result = await deleteSelectedCountriesAction(selectedIds);
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
            <h1 className="text-3xl font-bold tracking-tight">Countries</h1>
            <p className="text-muted-foreground">Manage all countries and their cities here.</p>
        </div>
        <Button asChild>
          <Link href="/admin/locations/countries/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Country
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
        data={initialCountries} 
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
       />
    </div>
  );
}
