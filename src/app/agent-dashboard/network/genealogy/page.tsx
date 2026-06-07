
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { getDirectDownline } from '@/lib/user-service';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from 'react';
import { GenealogyTree } from './genealogy-tree';
import type { User } from '@/types';

export const revalidate = 0;

async function GenealogyContent() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'agent') {
        redirect('/login?message=You must be an agent to view this page.');
    }

    const { members: downlineMembers } = await getDirectDownline(user.id);
    
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
                <h1 className="text-3xl font-bold tracking-tight">Binary: Genealogy</h1>
                <p className="text-muted-foreground mt-1">Visually explore your network's structure.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>My Genealogy</CardTitle>
                    <CardDescription>This is a visual representation of your directly sponsored members. Click on a member to view their downline (feature coming soon).</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto p-4">
                    <GenealogyTree agent={agentForTree} members={downlineMembers} />
                </CardContent>
            </Card>
        </div>
    )
}

export default function GenealogyPage() {
    return (
        <Suspense fallback={<div>Loading genealogy...</div>}>
            <GenealogyContent />
        </Suspense>
    )
}
