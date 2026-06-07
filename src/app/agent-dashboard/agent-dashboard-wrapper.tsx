
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DollarSign, Users, PlusCircle, Award, RefreshCw, Calendar, Trophy, MessageSquare, Map, HelpCircle, BarChart } from 'lucide-react';
import type { User, UserForAdmin } from '@/types';
import Link from 'next/link';
import { CommissionSimulator } from './commission-simulator';
import { RecruitmentFunnel } from './recruitment-funnel';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart as RechartsLineChart,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';


const chartData = [
  { month: 'Jan', bonus: 186, payout: 80 },
  { month: 'Feb', bonus: 305, payout: 200 },
  { month: 'Mar', bonus: 237, payout: 120 },
  { month: 'Apr', bonus: 73, payout: 190 },
  { month: 'May', bonus: 209, payout: 130 },
  { month: 'Jun', bonus: 214, payout: 140 },
];

const chartConfig = {
  bonus: {
    label: 'Network Bonus',
    color: 'hsl(var(--primary))',
  },
  payout: {
    label: 'Payout',
    color: 'hsl(var(--muted-foreground))',
  },
};

const RegistrationRow = ({ user }: { user: UserForAdmin }) => (
  <TableRow>
    <TableCell>
      <div className="font-medium">{user.full_name}</div>
      <div className="text-sm text-muted-foreground">{user.email}</div>
    </TableCell>
    <TableCell>N/A</TableCell>
    <TableCell>{new Date(user.created_at || '').toLocaleDateString()}</TableCell>
    <TableCell>N/A</TableCell>
  </TableRow>
);


export default function AgentDashboardWrapper({ user, initialStats, latestRegistrations, agentRank }: { user: User, initialStats: any, latestRegistrations: UserForAdmin[], agentRank: string }) {
  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Network Bonus</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${initialStats.totalEarnings.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Payout</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$3300.3</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Holding Tank</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">New members to place</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Network Members</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{initialStats.totalReferrals}</div>
                    <p className="text-xs text-muted-foreground">Total members in your downline</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Network Bonus</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <RechartsLineChart
                        data={chartData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Line dataKey="bonus" type="monotone" stroke="var(--color-bonus)" strokeWidth={2} dot={true} />
                        <Line dataKey="payout" type="monotone" stroke="var(--color-payout)" strokeWidth={2} dot={true} />
                    </RechartsLineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center"><span>Open</span><span className="ml-auto font-bold">120</span></div>
                    <div className="flex items-center"><span>Closed</span><span className="ml-auto font-bold">1</span></div>
                    <div className="flex items-center"><span>Total Tickets</span><span className="ml-auto font-bold">121</span></div>
                </CardContent>
            </Card>
        </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader><CardTitle>Members Map</CardTitle></CardHeader>
                <CardContent>
                    <div className="relative aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Map className="h-16 w-16 text-muted-foreground" />
                        <p className="absolute bottom-4 text-sm text-muted-foreground">Member location data coming soon</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="lg:col-span-3">
                <CardHeader><CardTitle>Latest Registrations</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Sponsor</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Country</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {latestRegistrations.slice(0, 5).map((member) => (
                                <RegistrationRow key={member.id} user={member} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CommissionSimulator />
            <RecruitmentFunnel />
        </div>
    </div>
  );
}
