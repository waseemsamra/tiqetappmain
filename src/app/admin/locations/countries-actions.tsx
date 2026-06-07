
"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteCountryAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { Country } from "@/types";


export function CountryActions({ country }: { country: Country }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteCountryAction(country.code);
            if (result.success) {
                toast({ title: "Success", description: result.message });
                router.refresh();
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message });
            }
            setIsAlertOpen(false);
        });
    };

    return (
        <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/admin/locations/countries/edit/${country.code}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Country & Cities
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => setIsAlertOpen(true)}
                    className="text-destructive focus:bg-destructive/10"
                    disabled={isPending}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the country "{country.name}" and all of its associated cities from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending} onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          disabled={isPending}
                          onClick={handleDelete} 
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
