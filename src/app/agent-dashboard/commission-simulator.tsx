
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, DollarSign } from 'lucide-react';

const COMMISSION_RATE = 0.10; // 10%

export function CommissionSimulator() {
    const [leftLegVolume, setLeftLegVolume] = useState('');
    const [rightLegVolume, setRightLegVolume] = useState('');
    const [projectedEarnings, setProjectedEarnings] = useState<number | null>(null);

    const handleCalculate = () => {
        const left = parseFloat(leftLegVolume) || 0;
        const right = parseFloat(rightLegVolume) || 0;
        
        const payableVolume = Math.min(left, right);
        const earnings = payableVolume * COMMISSION_RATE;
        
        setProjectedEarnings(earnings);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Commission Simulator
                </CardTitle>
                <CardDescription>
                    Enter hypothetical volumes to project your potential earnings based on a 10% commission on the weaker leg.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="left-leg">Left Leg Volume ($)</Label>
                        <Input 
                            id="left-leg" 
                            type="number" 
                            value={leftLegVolume}
                            onChange={(e) => setLeftLegVolume(e.target.value)}
                            placeholder="e.g., 5000"
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="right-leg">Right Leg Volume ($)</Label>
                        <Input 
                            id="right-leg" 
                            type="number" 
                            value={rightLegVolume}
                            onChange={(e) => setRightLegVolume(e.target.value)}
                            placeholder="e.g., 4500"
                        />
                    </div>
                </div>
                <Button onClick={handleCalculate} className="w-full">
                    Calculate Earnings
                </Button>
                {projectedEarnings !== null && (
                    <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground">Projected Earnings</p>
                        <p className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                           <DollarSign className="h-7 w-7" /> {Number(projectedEarnings || 0).toFixed(2)}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
