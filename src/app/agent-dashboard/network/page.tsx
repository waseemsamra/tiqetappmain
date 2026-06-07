
import { createClient } from '@/lib/supabase/server';
import { getDirectDownline } from '@/lib/user-service';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User as UserIcon } from "lucide-react";
import React, { Suspense } from 'react';
import type { User } from '@/types';
import { RankProgressTracker } from '../rank-progress-tracker';
import { RecruitmentFunnel } from '../recruitment-funnel';
import { DataTable } from './data-table';
import { columns } from './columns';

async function MyNetworkContent() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'agent') {
        redirect('/login?message=You must be an agent to view this page.');
    }

    const downlineMembers = await getDirectDownline(user.id);
    
    const agentForTree = {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        user_metadata: {
            full_name: user.user_metadata.full_name || user.email,
            avatar_url: user.user_metadata.avatar_url,
        }
    } as User;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">My Network</h1>
                <p className="text-muted-foreground mt-1">
                    An overview of your team's structure and performance.
                </p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Left Leg</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div>
                            <p className="text-xs text-muted-foreground">PV</p>
                            <p className="text-2xl font-bold">0</p>
                       </div>
                       <div>
                            <p className="text-xs text-muted-foreground">Members</p>
                            <p className="text-2xl font-bold">0</p>
                       </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Right Leg</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div>
                            <p className="text-xs text-muted-foreground">PV</p>
                            <p className="text-2xl font-bold">0</p>
                       </div>
                       <div>
                            <p className="text-xs text-muted-foreground">Members</p>
                            <p className="text-2xl font-bold">0</p>
                       </div>
                    </CardContent>
                </Card>
                <RankProgressTracker />
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>Direct Referrals</CardTitle>
                    <CardDescription>This table shows all members you have personally sponsored.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={downlineMembers} />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <RecruitmentFunnel />
                <Card>
                    <CardHeader>
                        <CardTitle>Team Performance</CardTitle>
                        <CardDescription>Performance of your direct referrals. (Placeholder)</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground py-16">
                        <p>A detailed table of your team's performance will be shown here.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function MyNetworkPage() {
    return (
        <Suspense fallback={<div>Loading network...</div>}>
            <MyNetworkContent />
        </Suspense>
    );
}
