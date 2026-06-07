
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowRight, Link as LinkIcon, Users, ShoppingCart } from 'lucide-react';

const funnelData = [
  { stage: 'Link Shared', count: 150, icon: <LinkIcon className="h-6 w-6 text-blue-500" /> },
  { stage: 'Sign Ups', count: 30, icon: <Users className="h-6 w-6 text-purple-500" /> },
  { stage: 'First Purchase', count: 12, icon: <ShoppingCart className="h-6 w-6 text-green-500" /> },
];

export function RecruitmentFunnel() {
    const getConversionRate = (from: number, to: number) => {
        if (from === 0) return '0%';
        return `${((to / from) * 100).toFixed(1)}%`;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recruitment Funnel</CardTitle>
                <CardDescription>From link click to first purchase. (Placeholder data)</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row items-stretch justify-around gap-4 text-center">
                    {funnelData.map((item, index) => (
                        <React.Fragment key={item.stage}>
                            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                                <div className="p-3 bg-background rounded-full mb-2 border">{item.icon}</div>
                                <p className="font-bold text-2xl">{item.count}</p>
                                <p className="text-sm text-muted-foreground">{item.stage}</p>
                            </div>
                            {index < funnelData.length - 1 && (
                                <div className="flex items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
                                        <ArrowDown className="h-6 w-6 text-muted-foreground md:hidden my-2" />
                                        <span className="text-xs font-semibold text-primary mt-1">
                                            {getConversionRate(item.count, funnelData[index + 1].count)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
