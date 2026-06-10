

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { getExcursionsCountForAdmin } from '@/app/actions';

import { getUsersCount, getActiveUsersCount } from '@/lib/user-service';

import { List, UserCheck, PlusCircle, Users, DollarSign, TagIcon } from 'lucide-react';

import Link from 'next/link';



export const revalidate = 0;



const StatCard = ({ title, value, icon: Icon, link, linkText, note }: { title: string, value: string | number, icon: React.ElementType, link?: string, linkText?: string, note?: string }) => (

    <Card>

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">{title}</CardTitle>

            <Icon className="h-4 w-4 text-muted-foreground" />

        </CardHeader>

        <CardContent>

            <div className="text-2xl font-bold">{value}</div>

            {link && linkText &&

              <Link href={link} className="text-xs text-muted-foreground hover:underline">

                {linkText}

              </Link>

            }

            {note && <p className="text-xs text-muted-foreground">{note}</p>}

        </CardContent>

    </Card>

)



export default async function AdminDashboard() {

  let excursionCount = 0;

  let userCount = 0;

  let activeUserCount = 0;



  try {

    [excursionCount, userCount, activeUserCount] = await Promise.all([

      getExcursionsCountForAdmin(),

      getUsersCount(),

      getActiveUsersCount(),

    ]);

  } catch (error) {

    console.error('[AdminDashboard] Error loading stats:', error);

    // Continue rendering with zero counts

  }



  return (

    <div className="space-y-6">

        <div>

            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

            <p className="text-muted-foreground">An overview of your website's content and business metrics.</p>

        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

             <StatCard 

                title="Total Users" 

                value={userCount} 

                icon={Users}

                link="/admin/users"

                linkText="Manage users"

            />

            <StatCard 

                title="Active Users" 

                value={activeUserCount} 

                icon={UserCheck}

                note={userCount > 0 ? `${((activeUserCount / userCount) * 100).toFixed(1)}% of total users` : "N/A"}

            />

             <StatCard 

                title="Total Excursions" 

                value={excursionCount} 

                icon={List}

                link="/admin/excursions"

                linkText="View all excursions"

            />

             <StatCard 

                title="Total Commissions Paid" 

                value="$12,345.67" 

                icon={DollarSign}

                note="Placeholder Data"

            />

        </div>



        <Card>

            <CardHeader>

                <CardTitle>Quick Actions</CardTitle>

            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                <Link href="/admin/create" className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted transition-colors">

                    <PlusCircle className="h-6 w-6 text-primary" />

                    <div>

                        <p className="font-semibold">Add New Excursion</p>

                        <p className="text-sm text-muted-foreground">Create a new tour or activity.</p>

                    </div>

                </Link>

                <Link href="/admin/excursion-types/create" className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted transition-colors">

                    <TagIcon className="h-6 w-6 text-primary" />

                    <div>

                        <p className="font-semibold">Add Excursion Type</p>

                        <p className="text-sm text-muted-foreground">Define a new category.</p>

                    </div>

                </Link>

                <Link href="/admin/users/invite" className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted transition-colors">

                    <Users className="h-6 w-6 text-primary" />

                    <div>

                        <p className="font-semibold">Invite New User</p>

                        <p className="text-sm text-muted-foreground">Onboard a new member or partner.</p>

                    </div>

                </Link>

            </CardContent>

        </Card>

    </div>

  );

}

