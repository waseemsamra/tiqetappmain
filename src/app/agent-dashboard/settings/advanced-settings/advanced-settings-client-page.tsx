

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
    PlusCircle,
    CreditCard,
    Key,
    Lock,
    Mail,
    Package,
    FileText,
    BarChart,
} from 'lucide-react';
import { DataTable } from '@/app/admin/data-table';
import { columns as currencyColumns } from './columns';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';


const currencyData = [
  { no: 1, name: 'Euro', code: 'EUR', symbol: '€', status: 'Enabled', exchangeRate: 0.9441979 },
  { no: 2, name: 'Hong Kong Dollar', code: 'HKD', symbol: '$', status: 'Enabled', exchangeRate: 7.84579526 },
  { no: 3, name: 'Indian Rupee', code: 'INR', symbol: '₹', status: 'Enabled', exchangeRate: 77.61047921 },
  { no: 4, name: 'Pound Sterling', code: 'GBP', symbol: '£', status: 'Enabled', exchangeRate: 0.82346332 },
  { no: 5, name: 'Russian Ruble', code: 'RUB', symbol: '₽', status: 'Enabled', exchangeRate: 56.4036 },
  { no: 6, name: 'US Dollar', code: 'USD', symbol: '$', status: 'Enabled', exchangeRate: 1 },
];

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

const MembershipSettingsTab = () => {
    const mandatoryFields = [
        { no: 1, label: 'Email', type: 'text', status: true, required: true },
        { no: 2, label: 'Username', type: 'text', status: true, required: true },
        { no: 3, label: 'Password', type: 'password', status: true, required: true },
        { no: 4, label: 'Confirm Password', type: 'password', status: true, required: true },
        { no: 5, label: 'Referral', type: 'text', status: true, required: false },
        { no: 6, label: 'Address', type: 'text', status: false, required: false },
        { no: 7, label: 'Gender', type: 'text', status: false, required: false },
        { no: 8, label: 'Date of birth', type: 'date', status: true, required: true },
        { no: 9, label: 'Country', type: 'country', status: true, required: true },
        { no: 10, label: 'City', type: 'text', status: false, required: false },
        { no: 11, label: 'Zip code', type: 'text', status: false, required: false },
        { no: 12, label: 'Mobile', type: 'text', status: true, required: true },
    ];

    return (
        <div className="mt-6 space-y-8">
            <Card className="border-none shadow-none">
                <CardContent className="pt-6 space-y-6">
                    <div className="flex items-center space-x-2">
                        <Switch id="dynamic-username" />
                        <Label htmlFor="dynamic-username">Dynamic Username</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="dob-required" defaultChecked />
                        <Label htmlFor="dob-required">Date of Birth Required</Label>
                    </div>
                    <div className="space-y-2 max-w-sm">
                        <Label htmlFor="min-age">Minimum Required Age</Label>
                        <Input id="min-age" placeholder="Minimum Required Age" />
                    </div>
                    <div className="flex justify-end">
                        <Button>Update</Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-none">
                <CardHeader>
                    <CardTitle>Mandatory</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Label</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Required</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mandatoryFields.map(field => (
                                <TableRow key={field.no}>
                                    <TableCell>{field.no}</TableCell>
                                    <TableCell>{field.label}</TableCell>
                                    <TableCell>{field.type}</TableCell>
                                    <TableCell><Switch defaultChecked={field.status} /></TableCell>
                                    <TableCell><Switch defaultChecked={field.required} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            
            <Card className="border-none shadow-none">
                 <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Custom</CardTitle>
                    <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Label</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Required</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             <TableRow>
                                <TableCell>13</TableCell>
                                <TableCell><Input defaultValue="text" /></TableCell>
                                <TableCell>text</TableCell>
                                <TableCell><Switch defaultChecked /></TableCell>
                                <TableCell><Switch /></TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
};


const PaymentsTab = () => {
    const paymentMethods = [
        { id: 'stripe', label: 'Credit/ Debit (Stripe)', logo: '/logos/stripe.svg', recurring: true },
        { id: 'paypal', label: 'Paypal', logo: '/logos/paypal.svg', recurring: true },
        { id: 'finpay', label: 'FIN PAY', logo: '/logos/visa-mastercard.svg', recurring: true },
        { id: 'deposit', label: 'Deposit Wallet', logo: '/logos/wallet.svg', recurring: false },
        { id: 'coinpayments', label: 'CoinPayments', logo: '/logos/coinpayments.svg', recurring: false },
        { id: 'bitcoin', label: 'Bitcoin', logo: '/logos/bitcoin.svg', recurring: false, update: true },
        { id: 'coupon', label: 'Coupon 100 Percent', logo: '/logos/coupon.svg', recurring: false },
        { id: 'bank', label: 'Bank Payment', logo: '/logos/bank.svg', recurring: false, update: true },
    ];
    
    return (
         <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Choose Methods to Enable</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map(method => (
                    <div key={method.id} className="p-4 border rounded-lg flex flex-col justify-between">
                       <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <Checkbox id={method.id} defaultChecked={method.id !== 'deposit'} />
                                <Label htmlFor={method.id} className="text-base font-medium">{method.label}</Label>
                            </div>
                            <img src={method.logo} alt={`${method.label} logo`} className="h-8" />
                       </div>
                       <div className="mt-4 flex items-center justify-between">
                            {method.recurring && (
                                <div className="flex items-center space-x-2">
                                    <Switch id={`recurring-${method.id}`} defaultChecked />
                                    <Label htmlFor={`recurring-${method.id}`} className="text-sm">Enable Recurring</Label>
                                </div>
                            )}
                             {method.update && (
                                <Button size="sm">Update</Button>
                            )}
                       </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-start mt-6">
                <Button>Update</Button>
            </div>
        </div>
    );
};


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


export default function AdvancedSettingsClientPage() {
    const [rowSelection, setRowSelection] = React.useState({});

    return (
        <Card>
            <CardContent className="pt-6">
                <Tabs defaultValue="payments">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto flex-wrap">
                        <TabsTrigger value="currency">Currency</TabsTrigger>
                        <TabsTrigger value="kyc">Kyc</TabsTrigger>
                        <TabsTrigger value="leads">Leads</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                        <TabsTrigger value="membership-settings">Membership Settings</TabsTrigger>
                        <TabsTrigger value="2fa">2FA</TabsTrigger>
                        <TabsTrigger value="verify-email">Verify Email</TabsTrigger>
                        <TabsTrigger value="membership-packages">Membership Packages</TabsTrigger>
                    </TabsList>
                    <TabsContent value="currency" className="mt-6">
                        <div className="flex justify-end mb-4">
                            <Button asChild>
                                <Link href="#">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add
                                </Link>
                            </Button>
                        </div>
                         <DataTable
                            columns={currencyColumns}
                            data={currencyData}
                            rowSelection={rowSelection}
                            setRowSelection={setRowSelection}
                            filterColumn="name"
                            filterPlaceholder="Filter by name..."
                         />
                    </TabsContent>
                    <TabsContent value="kyc" className="mt-6">
                        <div className="space-y-4 max-w-md">
                            <div className="flex items-center space-x-2">
                                <Switch id="show-kyc" defaultChecked />
                                <Label htmlFor="show-kyc">Show KYC</Label>
                            </div>
                             <Button>Update</Button>
                             <p className="text-sm text-muted-foreground">
                                By turning on KYC users will have an option to upload their documents
                             </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="leads" className="mt-6">
                        <div className="space-y-4 max-w-md">
                            <div className="flex items-center space-x-4">
                                <Switch id="show-leads" defaultChecked />
                                <Label htmlFor="show-leads">Show Leads</Label>
                                <Button>Update</Button>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="payments">
                        <PaymentsTab />
                    </TabsContent>
                    <TabsContent value="membership-settings">
                        <MembershipSettingsTab />
                    </TabsContent>
                    <TabsContent value="2fa" className="mt-6">
                        <div className="space-y-4 max-w-lg">
                            <div className="flex items-center space-x-4">
                                <Switch id="2fa-required" defaultChecked />
                                <Label htmlFor="2fa-required">Two Factor Authentication Required</Label>
                                <Button>Update</Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                By turning on Two Factor Authentication users will have the option to enable Two Factor Authentication from their profile settings. If it is enabled the user will be required to enter an OTP before login.
                            </p>
                        </div>
                    </TabsContent>
                     <TabsContent value="verify-email" className="mt-6">
                        <div className="flex items-center space-x-4">
                            <Switch id="email-verification" defaultChecked />
                            <Label htmlFor="email-verification">Email Verification Required</Label>
                            <Button>Update</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="membership-packages" className="mt-6">
                        <div className="flex items-center space-x-4">
                            <Switch id="package-purchase-required" defaultChecked />
                            <Label htmlFor="package-purchase-required">Package Purchase Required</Label>
                            <Button>Update</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
