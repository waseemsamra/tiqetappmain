
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Target, Star, Gift, Shield, Gem } from "lucide-react";

// In a real application, this data would come from a database or a configuration file
const ranks = [
    { name: "Scout", nextRank: "Pathfinder", progress: 60, requirement: "1,000 GV in weaker leg", nextReward: "Tech Gadget Pack", icon: Award },
    { name: "Pathfinder", nextRank: "Vanguard", progress: 75, requirement: "5,000 GV in weaker leg", nextReward: "Travel Bonus", icon: Shield },
    { name: "Vanguard", nextRank: "Elite", progress: 40, requirement: "20,000 GV in weaker leg", nextReward: "Leadership Retreat", icon: Gem },
    { name: "Elite", nextRank: "Legend", progress: 80, requirement: "50,000 GV in weaker leg", nextReward: "Luxury Car Bonus", icon: Star },
    { name: "Legend", nextRank: null, progress: 100, requirement: "You are at the top!", nextReward: null, icon: Star },
];

const currentRankName = "Pathfinder"; // This would be dynamically determined by the user's state

export function RankProgressTracker() {
    const currentRankData = ranks.find(r => r.name === currentRankName) || ranks[0];
    const CurrentRankIcon = currentRankData.icon;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Rank Progression
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-sm text-muted-foreground">Current Rank</p>
                        <p className="text-lg font-bold flex items-center gap-2">
                            <CurrentRankIcon className="h-5 w-5 text-primary" /> 
                            {currentRankData.name}
                        </p>
                    </div>
                     {currentRankData.nextRank && (
                         <div className="text-right">
                            <p className="text-sm text-muted-foreground">Next Rank</p>
                            <p className="text-lg font-bold text-primary">{currentRankData.nextRank}</p>
                        </div>
                     )}
                </div>

                <Progress value={currentRankData.progress} />
                
                {currentRankData.nextRank ? (
                    <>
                        <div className="flex items-center justify-center text-sm text-muted-foreground gap-2">
                            <Target className="h-4 w-4" />
                            <span>Next goal: <span className="font-semibold text-foreground">{currentRankData.requirement}</span></span>
                        </div>
                         <div className="flex items-center justify-center text-sm text-muted-foreground gap-2 pt-2 border-t mt-4">
                            <Gift className="h-4 w-4 text-green-500" />
                            <span>Next Reward: <span className="font-semibold text-green-600">{currentRankData.nextReward}</span></span>
                        </div>
                    </>
                ) : (
                     <div className="text-center text-primary font-semibold">
                        Congratulations! You have reached the highest rank.
                    </div>
                )}

            </CardContent>
        </Card>
    );
}
