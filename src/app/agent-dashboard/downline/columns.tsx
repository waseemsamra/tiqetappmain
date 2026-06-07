

'use client';

import type { User, Agent, UserForAdmin } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, KeyRound, UserSquare2, User as UserIcon, MailCheck, Ban, Trash2, Lock, Unlock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast";
import { lockUserAction, unlockUserAction } from "@/app/actions";
import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/app/auth-provider";

const ActionMenuItem = ({ label, icon: Icon, onSelect, className }: { label: string, icon: React.ElementType, onSelect: () => void, className?: string }) => (
    <DropdownMenuItem onClick={onSelect} className={className}>
        <Icon className="mr-2 h-4 w-4" />
        <span>{label}</span>
    </DropdownMenuItem>
);


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
                {isUnlocking ? 'Unblocking...' : 'Unblock User'}
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
                {isLocking ? 'Blocking...' : 'Block User'}
            </DropdownMenuItem>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to block this user?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Blocking a user will prevent them from logging in. They will not be able to access their account until they are unblocked.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isPending}
                            onClick={handleAction}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isLocking ? 'Blocking...' : 'Block User'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export const columns: ColumnDef<UserForAdmin>[] = [
  {
    header: "No",
    cell: ({ row, table }) => {
        const pageIndex = (table.getState().pagination.pageIndex);
        const pageSize = table.getState().pagination.pageSize;
        return <div>{pageIndex * pageSize + row.index + 1}</div>
    },
  },
  {
    accessorKey: "full_name",
    header: "Username",
    cell: ({ row }) => <div>{row.original.full_name || 'N/A'}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
     cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.original.status;
        const variant = status === 'Active' ? 'default' : status === 'Pending' ? 'secondary' : 'destructive';
        return <Badge variant={variant}>{status}</Badge>;
    }
  },
  {
    header: "Paid Active",
    cell: ({ row }) => <div>{row.index % 3 === 0 ? 'No' : 'Yes'}</div>, // Placeholder
  },
  {
    accessorKey: "created_at",
    header: "Created At",
     cell: ({ row }) => {
        const joinDate = row.getValue("created_at") as string | null;
        if (!joinDate) {
            return <span className="text-muted-foreground">Unknown</span>;
        }
        return <span>{new Date(joinDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>;
    }
  },
   {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const { toast } = useToast();
      const { session } = useAuth();
      const showNotImplemented = () => toast({ title: "Coming Soon!", description: "This feature is under development."});
      const isSelf = row.original.id === session?.user.id;

      if (isSelf) {
          return (
              <div className="text-right">
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                               <span tabIndex={0}>
                                    <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                               </span>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>Actions cannot be performed on self.</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
              </div>
          )
      }

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
                <DropdownMenuLabel>Member Actions</DropdownMenuLabel>
                <ActionMenuItem label="Change Password" icon={KeyRound} onSelect={showNotImplemented} />
                <ActionMenuItem label="Change Username" icon={UserSquare2} onSelect={showNotImplemented} />
                <ActionMenuItem label="Impersonate" icon={Users} onSelect={showNotImplemented} />
                <ActionMenuItem label="View Profile" icon={UserIcon} onSelect={showNotImplemented} />
                <DropdownMenuSeparator />
                <ActionMenuItem label="Verify Email" icon={MailCheck} onSelect={showNotImplemented} />
                <ActionMenuItem label="Disable Email" icon={MailCheck} onSelect={showNotImplemented} className="opacity-50" />
                <DropdownMenuSeparator />
                <ActionMenuItem label="Permissions" icon={Ban} onSelect={showNotImplemented} className="text-orange-600 focus:text-orange-600" />
                <LockUnlockMenuItem user={row.original} />
                 <ActionMenuItem label="Delete" icon={Trash2} onSelect={showNotImplemented} className="text-destructive focus:text-destructive" />
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
];
