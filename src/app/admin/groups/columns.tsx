'use client';

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Edit, Trash2 } from "lucide-react";
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
import type { GroupForAdmin } from "@/types";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { createGroupAction, updateGroupAction, deleteGroupAction } from "@/app/actions/group-actions";

function DeleteMenuItem({ group }: { group: GroupForAdmin }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteGroupAction(group.id);

      if (result.success) {
        toast({ title: 'Success', description: result.message });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
      setIsAlertOpen(false);
    });
  };

  return (
    <>
      <DropdownMenuItem
        onSelect={e => e.preventDefault()}
        onClick={() => setIsAlertOpen(true)}
        disabled={isPending}
        className="text-destructive focus:bg-destructive/10"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {isPending ? 'Deleting...' : 'Delete'}
      </DropdownMenuItem>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the group "{group.name}". If it
              is associated with any users, this operation may fail.
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

export const columns: ColumnDef<GroupForAdmin>[] = [
  {
    accessorKey: "name",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      return <div className="pl-4 font-medium">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({row}) => {
      return <div className="pl-4">{row.original.description || <span className="text-muted-foreground">N/A</span>}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({row}) => {
      return <div className="pl-4">{row.original.created_at ? new Date(row.original.created_at).toLocaleString() : <span className="text-muted-foreground">N/A</span>}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({row}) => {
      const group = row.original;

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
                <Link href={`/admin/groups/edit/${group.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DeleteMenuItem group={group} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];