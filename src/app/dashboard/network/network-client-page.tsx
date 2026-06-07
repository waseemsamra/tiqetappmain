
'use client';

import React from 'react';
import type { User } from '@/types';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Users, User as UserIcon } from "lucide-react";


interface NetworkClientPageProps {
  initialMembers: User[];
}

export function NetworkClientPage({ initialMembers }: NetworkClientPageProps) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">My Network</h1>
        <p className="text-muted-foreground mt-1">View your network's statistics and direct referrals.</p>
      </header>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Left Leg Volume</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">0 PV</div>
                  <p className="text-xs text-muted-foreground">(Placeholder data)</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Right Leg Volume</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">0 PV</div>
                  <p className="text-xs text-muted-foreground">(Placeholder data)</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Network Size</CardTitle>
                  <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{initialMembers.length} Members</div>
                  <p className="text-xs text-muted-foreground">in your direct downline</p>
              </CardContent>
          </Card>
      </div>
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
