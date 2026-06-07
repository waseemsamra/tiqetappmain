

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Shield, Gem } from 'lucide-react';
import React from 'react';


const tierIcons: { [key: string]: React.ElementType } = {
    Explorer: Award,
    Adventurer: Shield,
    Globetrotter: Gem,
};

export function LoyaltyHub({ userPoints, tierName, progress, pointsToNext }: { 
    userPoints: number,
    tierName: string,
    progress: number,
    pointsToNext: number
}) {
  const TierIcon = tierIcons[tierName] || Award;

  return (
        <Card>
            <CardContent className="p-6">
                <div className="bg-muted/50 border rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                        <TierIcon className="h-16 w-16 text-primary" />
                    </div>
                    <div className="flex-1 w-full text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <h3 className="text-2xl font-bold">{tierName} Tier</h3>
                        </div>
                        <p className="text-muted-foreground">You have <span className="font-bold text-foreground">{userPoints}</span> points.</p>
                        
                        {pointsToNext > 0 ? (
                            <>
                                <Progress value={progress} className="mt-4" />
                                <p className="text-sm text-muted-foreground mt-2">
                                    {pointsToNext} points to the next tier!
                                </p>
                            </>
                        ) : (
                            <p className="text-sm text-primary font-semibold mt-4">You've reached the highest tier!</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
  );
}
