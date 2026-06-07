'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Blog = {
    no: number;
    image: string;
    title: string;
    description: string;
    date: string;
};

export const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: 'no',
        header: 'No',
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => (
            <Image
                src={row.original.image}
                alt={row.original.title}
                width={80}
                height={60}
                className="rounded-md object-cover"
            />
        ),
    },
    {
        accessorKey: 'title',
        header: 'Blog Title',
    },
    {
        accessorKey: 'description',
        header: 'Blog Description',
        cell: ({ row }) => <p className="max-w-xs truncate">{row.original.description}</p>
    },
    {
        accessorKey: 'date',
        header: 'Blog Date',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
