

'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
    Users, 
    Percent, 
    Trophy, 
    UserPlus, 
    Award,
    Network,
    PlusCircle
} from 'lucide-react';

const binaryMatchingBonusLevels = [
    { level: 1, value: 25 }, { level: 2, value: 35 }, { level: 3, value: 42 },
    { level: 4, value: 50 }, { level: 5, value: 0 }, { level: 6, value: 0 },
    { level: 7, value: 0 }, { level: 8, value: 0 }, { level: 9, value: 0 },
    { level: 10, value: 0 }
];

const levelBonusData = [
    { level: 1, value: 8 }, { level: 2, value: 4 }, { level: 3, value: 8 },
    { level: 4, value: 0 }, { level: 5, value: 0 }, { level: 6, value: 0 },
    { level: 7, value: 0 }, { level: 8, value: 0 }, { level: 9, value: 0 },
    { level: 10, value: 0 }
];

const rankData = [
    { rankName: 'Active Customer', rankBonus: '50.00' },
    { rankName: 'Business Builder', rankBonus: '100.00' },
    { rankName: 'Bronze Executive', rankBonus: '500.00' },
    { rankName: 'Silver Executive', rankBonus: '1000.00' },
    { rankName: 'Gold Executive', rankBonus: '2000.00' },
];

const referralData = [
    { rankName: 'Customer', bonus: '8.00' },
    { rankName: 'Active Customer', bonus: '4.00' },
    { rankName: 'Business Builder', bonus: '8.00' },
    { rankName: 'Bronze Executive', bonus: '0.00' },
    { rankName: 'Silver Executive', bonus: '0.00' },
    { rankName: 'Gold Executive', bonus: '0.00' },
    { rankName: 'Ttop', bonus: '0.00' },
]

const firstOrderBonusData = [
    { product: '20K POINT', bonus: '0.00' },
    { product: 'Cryptocurrency Crash', bonus: '10.00' },
    { product: 'Graphic Design Master', bonus: '5.00' },
    { product: 'Data Science Foundati', bonus: '15.00' },
    { product: 'Leadership Excellence', bonus: '20.00' },
    { product: 'Mindfulness Meditatio', bonus: '5.00' },
    { product: 'Astrophysics Explainer', bonus: '15.00' },
    { product: 'Web Development Fur', bonus: '10.00' },
    { product: 'Entrepreneurship Boot', bonus: '20.00' },
    { product: 'Artificial Intelligence E', bonus: '5.00' },
    { product: 'Digital Mastery 101', bonus: '5.00' },
    { product: 'Rhythms of Revelation', bonus: '10.00' },
    { product: 'Echoes of Eden', bonus: '15.00' },
];

const LevelBonusTab = () => (
    <Card className="mt-6 border-none shadow-none">
        <CardHeader>
            <CardTitle>Level Bonus Settings</CardTitle>
            <CardDescription>Configure the commission percentage for each level.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
                 <Label className="font-semibold text-muted-foreground">Level</Label>
                 <Label className="font-semibold text-muted-foreground">Level Bonus(%)</Label>

                {levelBonusData.map(item => (
                    <React.Fragment key={item.level}>
                        <div className="flex items-center">
                            <Input defaultValue={`Level ${item.level}`} readOnly className="bg-muted/50 border-none"/>
                        </div>
                        <div>
                            <Input type="number" defaultValue={item.value} />
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className="flex justify-end max-w-md">
                <Button>Update</Button>
            </div>
        </CardContent>
   </Card>
);

const FirstOrderBonusTab = () => (
     <Card className="mt-6 border-none shadow-none">
        <CardHeader>
            <CardTitle>First Order Bonus Settings</CardTitle>
            <CardDescription>Set the bonus percentage for the first order of each product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
                <Label className="font-semibold text-muted-foreground">Products</Label>
                <Label className="font-semibold text-muted-foreground">First order bonus (%)</Label>
                
                {firstOrderBonusData.map(item => (
                    <React.Fragment key={item.product}>
                        <div className="flex items-center">
                            <Input id={`product-${item.product.replace(/\s+/g, '-')}`} defaultValue={item.product} readOnly className="bg-muted/50 border-none"/>
                        </div>
                        <div>
                            <Input id={`bonus-${item.product.replace(/\s+/g, '-')}`} type="number" defaultValue={item.bonus} />
                        </div>
                    </React.Fragment>
                ))}
            </div>
             <div className="flex justify-end max-w-md">
                <Button>Update</Button>
            </div>
        </CardContent>
    </Card>
);

const RankSettingsTab = () => (
    <Card className="mt-6 border-none shadow-none">
        <CardHeader>
            <CardTitle>Rank Settings</CardTitle>
            <CardDescription>Configure rank criteria, options, and bonuses.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="space-y-2 max-w-sm">
                <Label>Rank Criteria</Label>
                 <Select defaultValue="daily">
                    <SelectTrigger>
                        <SelectValue placeholder="Rank Criteria" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-4">
                <Label>Options</Label>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="packages" defaultChecked />
                        <Label htmlFor="packages">Packages</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="referral-count" />
                        <Label htmlFor="referral-count">Referral Count</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="team-volume" />
                        <Label htmlFor="team-volume">Team Volume</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="personal-volume" />
                        <Label htmlFor="personal-volume">Personal Volume</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="referral-package" />
                        <Label htmlFor="referral-package">Referral Package</Label>
                    </div>
                </div>
                <Button>Update</Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-end">
                    <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Rank</Button>
                </div>
                 <div className="grid grid-cols-3 gap-x-8 gap-y-4 items-center">
                    <Label className="font-semibold text-muted-foreground">Rank Name</Label>
                    <Label className="font-semibold text-muted-foreground">Packages</Label>
                    <Label className="font-semibold text-muted-foreground">Rank Bonus</Label>

                    {rankData.map((rank, index) => (
                        <React.Fragment key={index}>
                             <Input defaultValue={rank.rankName} />
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a package" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bronze">Bronze</SelectItem>
                                    <SelectItem value="silver">Silver</SelectItem>
                                    <SelectItem value="gold">Gold</SelectItem>
                                    <SelectItem value="titanium-triumph">Titanium Triumph</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input type="number" defaultValue={rank.rankBonus} />
                        </React.Fragment>
                    ))}
                      {/* Special case for "Ttop" with different select */}
                        <Input defaultValue="Ttop" />
                        <Select defaultValue="titanium-triumph">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bronze">Bronze</SelectItem>
                                <SelectItem value="silver">Silver</SelectItem>
                                <SelectItem value="gold">Gold</SelectItem>
                                <SelectItem value="titanium-triumph">Titanium Triumph</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input type="number" defaultValue="5000.00" />
                </div>
                 <div className="flex justify-end mt-4">
                    <Button>Update Ranks</Button>
                </div>
            </div>
        </CardContent>
    </Card>
);


const ReferralCommissionTab = () => (
    <Card className="mt-6 border-none shadow-none">
        <CardHeader>
            <CardTitle>Referral Commission Settings</CardTitle>
            <CardDescription>Set the referral bonus percentage for each rank.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
                <Label className="font-semibold text-muted-foreground">Rank</Label>
                <Label className="font-semibold text-muted-foreground">Referral Bonus(%)</Label>
                
                {referralData.map(item => (
                    <React.Fragment key={item.rankName}>
                        <div className="flex items-center">
                            <Label htmlFor={`rank-${item.rankName.replace(/\s+/g, '-')}`}>{item.rankName}</Label>
                        </div>
                        <div>
                            <Input id={`rank-${item.rankName.replace(/\s+/g, '-')}`} type="number" defaultValue={item.bonus} />
                        </div>
                    </React.Fragment>
                ))}
            </div>
             <div className="flex justify-end max-w-md">
                <Button>Update</Button>
            </div>
        </CardContent>
    </Card>
);


export default function NetworkSettingsClientPage() {
    return (
        <Card>
            <CardContent className="pt-6">
                <Tabs defaultValue="first-order">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto flex-wrap">
                        <TabsTrigger value="binary-bonus" className="gap-2"><Users /> Binary Bonus</TabsTrigger>
                        <TabsTrigger value="matching-bonus" className="gap-2"><Percent /> Binary Matching Bonus</TabsTrigger>
                        <TabsTrigger value="rank" className="gap-2"><Trophy /> Rank Settings</TabsTrigger>
                        <TabsTrigger value="referral" className="gap-2"><UserPlus /> Referral Commission</TabsTrigger>
                        <TabsTrigger value="first-order" className="gap-2"><Award /> First Order Bonus</TabsTrigger>
                        <TabsTrigger value="level" className="gap-2"><Network /> Level Bonus</TabsTrigger>
                    </TabsList>
                    <TabsContent value="binary-bonus">
                        <div className="p-8 text-center text-muted-foreground">Binary Bonus Settings will be displayed here.</div>
                    </TabsContent>
                    <TabsContent value="matching-bonus">
                       <Card className="mt-6 border-none shadow-none">
                            <CardHeader>
                                <CardTitle>Binary Matching Bonus Settings</CardTitle>
                                <CardDescription>Configure the commission percentage for each level in the binary tree.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
                                     <Label className="font-semibold text-muted-foreground">Level</Label>
                                     <Label className="font-semibold text-muted-foreground">Binary Matching Bonus(%)</Label>

                                    {binaryMatchingBonusLevels.map(item => (
                                        <React.Fragment key={item.level}>
                                            <div className="flex items-center">
                                                <Input defaultValue={`Level ${item.level}`} readOnly className="bg-muted/50 border-none"/>
                                            </div>
                                            <div>
                                                <Input type="number" defaultValue={item.value} />
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="flex justify-end max-w-md">
                                    <Button>Update</Button>
                                </div>
                            </CardContent>
                       </Card>
                    </TabsContent>
                     <TabsContent value="rank">
                        <RankSettingsTab />
                    </TabsContent>
                     <TabsContent value="referral">
                        <ReferralCommissionTab />
                    </TabsContent>
                     <TabsContent value="first-order">
                        <FirstOrderBonusTab />
                    </TabsContent>
                     <TabsContent value="level">
                        <LevelBonusTab />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
