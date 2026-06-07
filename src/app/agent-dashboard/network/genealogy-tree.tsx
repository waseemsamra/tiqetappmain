'use client';

import React from 'react';
import type { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { User as UserIcon, Users } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface TreeNodeProps {
    user: User;
    level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ user, level }) => {
    const fullName = user.user_metadata?.full_name || 'N/A';
    const email = user.email || 'No Email';
    const avatarUrl = user.user_metadata?.avatar_url || '';
    const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown';

    return (
        <li className="relative pl-8 before:absolute before:left-0 before:top-1/2 before:w-6 before:h-px before:bg-border">
            <div className="relative">
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="inline-flex items-center gap-3 p-3 hover:bg-muted transition-colors w-full sm:w-auto">
                                <Avatar>
                                    <AvatarImage src={avatarUrl} />
                                    <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{fullName}</p>
                                    <p className="text-xs text-muted-foreground">{email}</p>
                                </div>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Joined: {joinDate}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </li>
    );
};


export const GenealogyTree = ({ agent, members }: { agent: User, members: User[] }) => {
    const agentFullName = agent?.user_metadata?.full_name || 'Agent';
    const agentEmail = agent?.email || 'N/A';
    const agentAvatarUrl = agent?.user_metadata?.avatar_url || '';
    
    return (
        <div className="space-y-4">
             <ul className="space-y-4">
                <li className="flex items-center gap-3">
                     <Card className="inline-flex items-center gap-3 p-3 bg-primary/10 border-primary w-full sm:w-auto">
                        <Avatar className="border-2 border-primary">
                            <AvatarImage src={agentAvatarUrl} />
                            <AvatarFallback>{agentFullName.charAt(0) || 'A'}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">{agentFullName} (You)</p>
                            <p className="text-sm text-muted-foreground">{agentEmail}</p>
                        </div>
                    </Card>
                </li>
                 <li className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-border">
                    {members.length > 0 ? (
                        <ul className="space-y-4 pt-4">
                            {members.map((member) => (
                               <TreeNode key={member.id} user={member} level={1} />
                            ))}
                        </ul>
                    ) : (
                         <div className="pt-4 text-muted-foreground">
                            Your direct referrals will appear here.
                        </div>
                    )}
                </li>
             </ul>
        </div>
    );
};