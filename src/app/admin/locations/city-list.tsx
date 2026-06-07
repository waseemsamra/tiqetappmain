
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { deleteCityAction } from "@/app/actions";
import { CityForm } from "./city-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Country, City } from "@/types";
import { DataTable } from "@/app/admin/data-table"; // Using shared data table
import { useRouter } from "next/navigation";

type CityRow = { id: string; name: string };

function DeleteMenuItem({ countryCode, name, onDeleted }: { countryCode: string, name: string, onDeleted: () => void }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete the city "${name}"?`)) {
            startTransition(async () => {
                const result = await deleteCityAction(countryCode, name);
                if (result.success) {
                    toast({ title: "Success", description: result.message });
                    onDeleted();
                } else {
                    toast({ variant: "destructive", title: "Error", description: result.message });
                }
            });
        }
    };

    return (
        <DropdownMenuItem onClick={handleDelete} disabled={isPending} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
        </DropdownMenuItem>
    );
}

export function CityList({ country, cities: initialCities }: { country: Country; cities: City[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<{ name: string } | undefined>(undefined);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const router = useRouter();


  const handleCreate = () => {
    setSelectedCity(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (city: CityRow) => {
    setSelectedCity(city);
    setIsFormOpen(true);
  };

  const onCityUpdate = () => {
    setIsFormOpen(false);
    router.refresh();
  }
  
  const columns: ColumnDef<CityRow>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: "City Name",
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const city = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleEdit(city)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DeleteMenuItem 
                    countryCode={country.code} 
                    name={city.name} 
                    onDeleted={() => router.refresh()}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ], [country.code, router]);

  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Cities in {country.name}</h2>
                <p className="text-muted-foreground">Manage the cities for this country.</p>
            </div>
            <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New City
            </Button>
        </div>
        
        <DataTable columns={columns} data={initialCities} filterColumn="name" filterPlaceholder="Filter cities..." rowSelection={rowSelection} setRowSelection={setRowSelection}/>

        <CityForm
            countryCode={country.code}
            city={selectedCity}
            open={isFormOpen}
            onOpenChange={setIsFormOpen}
            onFormSubmitSuccess={onCityUpdate}
        />
    </div>
  );
}
