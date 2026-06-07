
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getUserById } from "@/lib/user-service";
import { Presentation, Star } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function AgentCmsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }
    
    // Reliably fetch user details to get the correct name
    const userProfile = await getUserById(user.id);
    const agentName = userProfile?.full_name && userProfile.full_name !== 'AgentBookingsLead'
        ? userProfile.full_name
        : user.email?.split('@')[0] || 'agent';
    const agentNameForUrl = encodeURIComponent((agentName || '').replace(/\s+/g, ''));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">Manage the content for your public-facing agent website.</p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Public Website</CardTitle>
            <CardDescription>Customize the look and feel of your personal agent page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Presentation className="h-8 w-8 text-primary" />
                <div className="flex-grow">
                    <p className="font-semibold">My Public Page</p>
                    <p className="text-sm text-muted-foreground">This is the personal website you can share with prospects.</p>
                </div>
                <Button asChild>
                    <Link href={`/agent/${agentNameForUrl}`} target="_blank">
                        View My Site
                    </Link>
                </Button>
            </div>
             <Link href="/dashboard/cms/featured-excursions" className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Star className="h-8 w-8 text-primary" />
                <div className="flex-grow">
                    <p className="font-semibold">Manage Featured Excursions</p>
                    <p className="text-sm text-muted-foreground">Select which excursions to highlight on your page.</p>
                </div>
            </Link>
        </CardContent>
      </Card>
      <div className="border-2 border-dashed rounded-lg p-12 text-center">
        <p className="text-muted-foreground">More content management features are coming soon.</p>
      </div>
    </div>
  );
}
