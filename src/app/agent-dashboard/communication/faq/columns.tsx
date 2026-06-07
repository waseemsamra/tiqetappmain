'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type FAQ = {
    no: number;
    question: string;
    answer: string;
};

export const columns: ColumnDef<FAQ>[] = [
    {
        accessorKey: 'no',
        header: 'No',
        meta: {
            className: "w-1/12",
        },
    },
    {
        accessorKey: 'question',
        header: 'Question',
        meta: {
            className: "w-4/12",
        },
    },
    {
        accessorKey: 'answer',
        header: 'Answer',
        meta: {
            className: "w-6/12",
        },
        cell: ({ row }) => <p className="truncate max-w-md">{row.original.answer}</p>
    },
    {
        id: 'actions',
        header: 'Actions',
        meta: {
            className: "w-1/12 text-right",
        },
        cell: () => (
            <div className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                             <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
];
