
'use client';

import { useState, useTransition } from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import type { Excursion } from '@/types';
import { deleteExcursionAction } from '@/app/actions';

function DeleteMenuItem({ excursion }: { excursion: Excursion }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteExcursionAction(excursion.id);
      if (result.success) {
        toast({ title: "Success", description: result.message });
        // You'll need to refresh the page or update state to remove the item from the UI.
        // For simplicity, we can rely on page refresh.
        window.location.reload();
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

export function ActionsMenu({ excursion }: { excursion: Excursion }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 rounded-full bg-black/50 hover:bg-black/70 text-white">
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
        <DropdownMenuSeparator />
        <DeleteMenuItem excursion={excursion} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
