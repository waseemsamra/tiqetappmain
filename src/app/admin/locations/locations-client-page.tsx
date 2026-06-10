'use client';

import { useState, useTransition } from 'react';
import type { RowSelectionState } from "@tanstack/react-table";
import { columns } from "./countries-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Trash2, MapPin, RefreshCw, Loader2 } from "lucide-react";
import { deleteSelectedCountriesAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/app/admin/data-table';
import { ColumnDef } from "@tanstack/react-table";
import type { Country, City } from "@/types";

const citiesColumns: ColumnDef<City>[] = [
  {
    accessorKey: "name",
    header: "City",
  },
  {
    accessorKey: "country_name",
    header: "Country",
  }
];

export default function LocationsClientPage({ initialCountries, initialCities }: { initialCountries: Country[]; initialCities: City[] }) {
  const countries = Array.isArray(initialCountries) ? initialCountries : [];
  const cities = Array.isArray(initialCities) ? initialCities : [];
  const { toast } = useToast();
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isDeleting, startDeleteTransition] = useTransition();
  const [syncing, setSyncing] = useState(false);

  const selectedIds = Object.keys(rowSelection)
    .filter((key) => rowSelection[key])
    .map((key) => countries[parseInt(key)].code);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/admin/sync-locations', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Sync failed');
      toast({ title: 'Synced', description: `Loaded ${data.countries} countries and ${data.cities} cities.` });
      router.refresh();
    } catch (err) {
      toast({ variant: 'destructive', title: 'Sync failed', description: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setSyncing(false);
    }
  };

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
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Countries</h1>
            <p className="text-muted-foreground">Manage all countries and their cities here.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSync} disabled={syncing}>
            {syncing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            {syncing ? 'Syncing...' : 'Sync Now'}
          </Button>
          <Button asChild>
            <Link href="/admin/locations/countries/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Country
            </Link>
          </Button>
        </div>
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

      <section>
        <div className="rounded-md border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Currency</th>
              </tr>
            </thead>
            <tbody>
              {countries.length === 0 ? (
                <tr><td colSpan={3} className="p-4 text-center text-muted-foreground">No countries found</td></tr>
              ) : (
                countries.map((c: any, idx: number) => (
                  <tr key={c.id || c.code || idx} className="border-b last:border-0">
                    <td className="p-3 font-medium">{c.name || '-'}</td>
                    <td className="p-3">{c.code || '-'}</td>
                    <td className="p-3">{c.currency_symbol || c.currency || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-2xl font-bold tracking-tight">Cities</h2>
        </div>
        <div className="rounded-md border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">City</th>
                <th className="p-3 text-left">Country</th>
                <th className="p-3 text-left">Country Code</th>
              </tr>
            </thead>
            <tbody>
              {cities.length === 0 ? (
                <tr><td colSpan={3} className="p-4 text-center text-muted-foreground">No cities found</td></tr>
              ) : (
                cities.map((c: any, idx: number) => (
                  <tr key={c.id || idx} className="border-b last:border-0">
                    <td className="p-3 font-medium">{c.name || '-'}</td>
                    <td className="p-3">{c.country_name || '-'}</td>
                    <td className="p-3">{c.country_code || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
