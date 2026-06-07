

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Edit, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
} from '@/components/ui/alert-dialog';
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteExcursionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { Excursion } from "@/types";

const StatusBadge = ({ status }: { status: Excursion['status'] }) => {
    const statusConfig = {
        active: { variant: 'default', label: 'Active', icon: CheckCircle },
        pending_approval: { variant: 'secondary', label: 'Pending', icon: Clock },
        rejected: { variant: 'destructive', label: 'Rejected', icon: XCircle },
        inactive: { variant: 'outline', label: 'Inactive', icon: Clock },
    };

    const config = statusConfig[status || 'inactive'] || statusConfig.inactive;
    const Icon = config.icon;

    return (
        <Badge variant={config.variant}>
            <Icon className="mr-2 h-3 w-3" />
            {config.label}
        </Badge>
    );
};


function DeleteMenuItem({ excursion }: { excursion: Excursion }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteExcursionAction(excursion.id);
            if (result.success) {
                toast({ title: "Success", description: result.message });
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message });
            }
            setIsAlertOpen(false);
        });
    };

    return (
        <>
            <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                onClick={() => setIsAlertOpen(true)}
                disabled={isPending}
                className="text-destructive focus:bg-destructive/10"
            >
                <Trash2 className="mr-2 h-4 w-4" />
                {isPending ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the excursion "{excursion.name}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isPending}
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export const columns: ColumnDef<Excursion>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-4 font-medium">{row.original.name}</div>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "city.name",
    header: "City",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const excursion = row.original;
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
                <DropdownMenuItem asChild>
                    <Link href={`/admin/edit/${excursion.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DeleteMenuItem excursion={excursion} />
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      );
    },
  },
];
