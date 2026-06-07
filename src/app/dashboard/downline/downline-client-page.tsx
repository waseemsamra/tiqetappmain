
'use client';

import React from 'react';
import type { User } from '@/types';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DownlineClientPageProps {
  initialMembers: User[];
}

export function DownlineClientPage({ initialMembers }: DownlineClientPageProps) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">My Downline</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your directly sponsored members.
        </p>
      </header>
      <Card>
        <CardHeader>
            <CardTitle>Direct Referrals</CardTitle>
            <CardDescription>This table shows all members you have personally sponsored.</CardDescription>
        </CardHeader>
        <CardContent>
            <DataTable columns={columns} data={initialMembers} />
        </CardContent>
      </Card>
    </div>
  );
}
