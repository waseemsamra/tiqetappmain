
'use client';

import React from 'react';
import type { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
        <li className="flex justify-center">
             <div className="flex flex-col items-center relative 
                before:absolute before:h-6 before:w-px before:bg-gray-300 before:bottom-full before:left-1/2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <div className="flex flex-col items-center cursor-pointer group">
                                <Avatar className="w-16 h-16 border-4 border-white shadow-md">
                                    <AvatarImage src={avatarUrl} />
                                    <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="mt-2 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full group-hover:text-primary">{fullName}</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="font-semibold">{fullName}</p>
                            <p>Email: {email}</p>
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
        <div className="flex justify-center p-8 min-w-[800px]">
            <ul className="flex flex-col items-center space-y-8">
                <li className="flex flex-col items-center">
                    <div className="flex flex-col items-center relative">
                        <Avatar className="w-20 h-20 border-4 border-primary shadow-lg">
                            <AvatarImage src={agentAvatarUrl} />
                            <AvatarFallback>{agentFullName.charAt(0) || 'A'}</AvatarFallback>
                        </Avatar>
                        <span className="mt-2 text-base font-bold bg-primary/10 text-primary px-4 py-1.5 rounded-full">{agentFullName} (You)</span>
                    </div>

                    {members.length > 0 && (
                        <div className="mt-8 relative w-full
                             before:absolute before:h-8 before:w-px before:bg-gray-300 before:top-[-2rem] before:left-1/2">
                             <ul className="flex justify-center gap-8 md:gap-16
                                after:absolute after:h-px after:bg-gray-300 after:w-full after:top-0 after:left-0">
                                {members.map((member) => (
                                    <TreeNode key={member.id} user={member} level={1} />
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    );
};
