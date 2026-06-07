
'use client';

import { ColumnDef } from '@tanstack/react-table';

type JoiningReport = {
  no: number;
  userName: string;
  email: string;
  sponsor: string;
  dateOfJoined: string;
};

export const columns: ColumnDef<JoiningReport>[] = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'userName', header: 'User name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'sponsor', header: 'Sponsor' },
  { accessorKey: 'dateOfJoined', header: 'Date of Joined' },
];
