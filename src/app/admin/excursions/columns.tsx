

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Edit, Trash2, Copy, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
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
} from '@/components/ui/alert-dialog';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useTransition } from "react";
import { cloneExcursionAction, deleteExcursionAction, approveExcursionAction, rejectExcursionAction } from "@/app/actions";
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

function ApprovalActions({ excursion }: { excursion: Excursion }) {
    const { toast } = useToast();
    const [isApproving, startApproveTransition] = useTransition();
    const [isRejecting, startRejectTransition] = useTransition();

    const handleApprove = () => {
        startApproveTransition(async () => {
            const result = await approveExcursionAction(excursion.id);
            if (result.success) {
                toast({ title: 'Success', description: result.message });
            } else {
                toast({ variant: 'destructive', title: 'Error', description: result.message });
            }
        });
    };

    const handleReject = () => {
        startRejectTransition(async () => {
            const result = await rejectExcursionAction(excursion.id);
            if (result.success) {
                toast({ title: 'Success', description: result.message });
            } else {
                toast({ variant: 'destructive', title: 'Error', description: result.message });
            }
        });
    };

    if (excursion.status !== 'pending_approval') return null;

    return (
        <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleApprove} disabled={isApproving}>
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                {isApproving ? 'Approving...' : 'Approve'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleReject} disabled={isRejecting} className="text-destructive">
                <XCircle className="mr-2 h-4 w-4" />
                {isRejecting ? 'Rejecting...' : 'Reject'}
            </DropdownMenuItem>
        </>
    );
}

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

function CloneMenuItem({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleClone = () => {
        startTransition(async () => {
            const result = await cloneExcursionAction(id);
            if (result.success) {
                toast({ title: "Success", description: result.message });
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message });
            }
        });
    };

    return (
        <DropdownMenuItem onClick={handleClone} disabled={isPending}>
            <Copy className="mr-2 h-4 w-4" />
            Clone
        </DropdownMenuItem>
    );
}

export const columns: ColumnDef<Excursion>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "city",
    header: "City",
  },
    {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-4">{row.original.country}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(String(row.getValue("price")));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const excursion = row.original;

      return (
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
                <Link href={`/excursions/${excursion.id}`} target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href={`/admin/edit/${excursion.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </Link>
            </DropdownMenuItem>
             <CloneMenuItem id={excursion.id} />
            <ApprovalActions excursion={excursion} />
            <DropdownMenuSeparator />
            <DeleteMenuItem excursion={excursion} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
