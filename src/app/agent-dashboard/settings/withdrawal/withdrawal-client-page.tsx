
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const payoutOptions = [
    { id: 'crypto', label: 'Crypto Payout' },
    { id: 'bank', label: 'Manual Bank Payout' },
    { id: 'stripe', label: 'Stripe Payout' },
];

const coinOptions = [
    { id: 'litecoin', label: 'Litecoin' },
    { id: 'ethereum', label: 'Ethereum' },
    { id: 'bitcoin', label: 'Bitcoin' },
    { id: 'bitcoincash', label: 'Bitcoin Cash' },
];

const dayOptions = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
];

const CheckboxGroup = ({ title, options }: { title: string, options: {id: string, label: string}[]}) => (
    <div className="space-y-4">
        <Label className="font-semibold">{title}</Label>
        <div className="space-y-2">
            {options.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox id={option.id} defaultChecked={option.id !== 'stripe' && option.id !== 'sunday'} />
                    <Label htmlFor={option.id} className="font-normal">{option.label}</Label>
                </div>
            ))}
        </div>
    </div>
);


export default function WithdrawalClientPage() {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <CheckboxGroup title="Available Payout" options={payoutOptions} />
                        
                        <div className="space-y-2">
                            <Label htmlFor="min-amount" className="font-semibold">Min Amount For Withdrawal: $</Label>
                            <Input id="min-amount" defaultValue="100" />
                        </div>
                        
                        <CheckboxGroup title="Available Coins" options={coinOptions} />
                    </div>
                    <div className="space-y-8">
                         <div className="space-y-2">
                            <Label htmlFor="admin-fee" className="font-semibold">Withdrawal Admin Fee Percent: %</Label>
                            <Input id="admin-fee" defaultValue="10" />
                        </div>

                        <CheckboxGroup title="Open Withdrawals on this days" options={dayOptions} />
                    </div>
                </div>

                <div className="mt-8 space-y-2">
                     <Label htmlFor="withdrawal-text" className="font-semibold">Withdrawal Text to Display on Members Page</Label>
                     <Textarea id="withdrawal-text" />
                </div>
                
                <div className="flex justify-end mt-8">
                    <Button>Update</Button>
                </div>
            </CardContent>
        </Card>
    );
}
