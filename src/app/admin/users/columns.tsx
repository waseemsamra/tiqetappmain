
'use client';

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Edit, Trash2, Lock, Unlock } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import type { UserForAdmin } from "@/types";
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { lockUserAction, unlockUserAction } from "@/app/actions";


function LockUnlockMenuItem({ user }: { user: UserForAdmin }) {
    const { toast } = useToast();
    const [isLocking, startLockTransition] = useTransition();
    const [isUnlocking, startUnlockTransition] = useTransition();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    
    const isLocked = user.status === 'Locked';
    const isPending = isLocking || isUnlocking;

    const handleAction = () => {
        if (isLocked) {
            startUnlockTransition(async () => {
                const result = await unlockUserAction(user.id);
                if (result.success) {
                    toast({ title: 'Success', description: result.message });
                } else {
                    toast({ variant: 'destructive', title: 'Error', description: result.message });
                }
            });
        } else {
            startLockTransition(async () => {
                const result = await lockUserAction(user.id);
                 if (result.success) {
                    toast({ title: 'Success', description: result.message });
                } else {
                    toast({ variant: 'destructive', title: 'Error', description: result.message });
                }
            });
        }
        setIsAlertOpen(false);
    }
    
    if (isLocked) {
        return (
             <DropdownMenuItem onClick={handleAction} disabled={isUnlocking}>
                <Unlock className="mr-2 h-4 w-4" />
                {isUnlocking ? 'Unlocking...' : 'Unlock User'}
            </DropdownMenuItem>
        );
    }

    return (
       <>
            <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                onClick={() => setIsAlertOpen(true)}
                disabled={isLocking}
                className="text-destructive focus:bg-destructive/10"
            >
                <Lock className="mr-2 h-4 w-4" />
                {isLocking ? 'Locking...' : 'Lock User'}
            </DropdownMenuItem>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to lock this user?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Locking a user will prevent them from logging in. They will not be able to access their account until they are unlocked.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isPending}
                            onClick={handleAction}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isLocking ? 'Locking...' : 'Lock User'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export const columns: ColumnDef<UserForAdmin>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase pl-4">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row }) => <div>{row.getValue("full_name") || <span className="text-muted-foreground">N/A</span>}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
        const role = row.getValue("role") as string;
        const variant = role === 'admin' ? 'destructive' : 'secondary';
        return <Badge variant={variant} className="capitalize">{role || 'User'}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant = status === 'Active' ? 'default' : 'destructive';
        return <Badge variant={variant}>{status}</Badge>;
    }
  },
  {
    accessorKey: "last_sign_in_at",
    header: "Last Signed In",
    cell: ({ row }) => {
        const lastSignIn = row.getValue("last_sign_in_at") as string | null;
        if (!lastSignIn) {
            return <span className="text-muted-foreground">Never</span>;
        }
        return <span>{formatDistanceToNow(new Date(lastSignIn), { addSuffix: true })}</span>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
                <Link href={`/admin/users/edit/${user.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit User
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
             <LockUnlockMenuItem user={user} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
