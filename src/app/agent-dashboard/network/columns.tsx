
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type User = {
  email?: string;
  user_metadata?: { full_name?: string };
  created_at?: string;
  banned_until?: string | undefined;
};

const isUserBanned = (banned_until: string | undefined): boolean => {
    if (!banned_until || banned_until === 'none') return false;
    if (banned_until.toLowerCase() === 'infinity') return true;
    try {
        return new Date(banned_until) > new Date();
    } catch (e) {
        return false;
    }
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user_metadata.full_name",
    header: "Full Name",
    cell: ({ row }) => <div>{row.original.user_metadata?.full_name || 'N/A'}</div>,
  },
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
     cell: ({ row }) => <div className="pl-4">{row.original.email}</div>,
  },
  {
    accessorKey: "created_at",
    header: "Join Date",
     cell: ({ row }) => {
        const joinDate = row.getValue("created_at") as string | null;
        if (!joinDate) {
            return <span className="text-muted-foreground">Unknown</span>;
        }
        return <span>{new Date(joinDate).toLocaleDateString()}</span>;
    }
  },
  {
    accessorKey: "banned_until",
    header: "Status",
    cell: ({ row }) => {
        const isBanned = isUserBanned(row.original.banned_until);
        const status = isBanned ? 'Inactive' : 'Active';
        return <Badge variant={isBanned ? 'destructive' : 'default'}>{status}</Badge>;
    }
  },
];
