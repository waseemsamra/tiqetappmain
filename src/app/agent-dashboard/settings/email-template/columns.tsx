'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export type EmailTemplate = {
  no: number;
  name: string;
  sendGridId: string;
  language: string;
  subject: string;
};

export const columns: ColumnDef<EmailTemplate>[] = [
  {
    accessorKey: 'no',
    header: 'No',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'sendGridId',
    header: 'SendGrid Email Template ID',
  },
  {
    accessorKey: 'language',
    header: 'Language',
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
  },
  {
    id: 'actions',
    header: 'Edit Template',
    cell: () => {
      return (
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      );
    },
  },
];
