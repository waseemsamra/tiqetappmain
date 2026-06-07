'use client';

import { getAgentPublicProfile, getFeaturedExcursions } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Globe, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import AttractionListingSection from '@/app/attraction-listing';
import type { Excursion } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

function AgentPublicPageClient({ agentName }: { agentName: string }) {
    const [agent, setAgent] = useState<any>(null);
    const [featuredExcursions, setFeaturedExcursions] = useState<Excursion[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const agentData = await getAgentPublicProfile(agentName);

                if (!agentData) {
                    notFound();
                    return;
                }
                setAgent(agentData);
                
                const featuredData = await getFeaturedExcursions(agentData.id);
                setFeaturedExcursions(featuredData);

            } catch (error) {
                console.error("Failed to fetch agent page data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [agentName]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12 space-y-12">
                <div className="text-center space-y-4">
                    <Skeleton className="w-32 h-32 rounded-full mx-auto" />
                    <Skeleton className="h-10 w-1/3 mx-auto" />
                    <Skeleton className="h-5 w-1/4 mx-auto" />
                    <Skeleton className="h-16 w-2/3 mx-auto" />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-80 w-full" />)}
                 </div>
            </div>
        )
    }

    if (!agent) {
        return notFound();
    }

    return (
        <div className="bg-muted/5">
            <header className="relative h-80 flex items-center justify-center text-center text-white">
                <Image 
                  src="https://picsum.photos/seed/agent-hero/1200/400" 
                  alt={`Hero image for ${agent.full_name}`} 
                  fill 
                  className="object-cover"
                  data-ai-hint="background"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="relative z-10 p-4">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
                        <AvatarImage src={agent.avatar_url} alt={agent.full_name} />
                        <AvatarFallback className="text-4xl">{agent.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-4xl font-bold mt-4">{agent.full_name}</h1>
                    <p className="text-lg text-white/90">Independent Agent</p>
                    
                    {agent.bio && (
                        <p className="max-w-2xl mx-auto mt-4 text-center">{agent.bio}</p>
                    )}

                    <div className="flex justify-center gap-4 mt-6">
                        {agent.facebook_url && <Button variant="outline" size="icon" asChild className="bg-transparent text-white border-white/50 hover:bg-white/10"><a href={agent.facebook_url} target="_blank"><Facebook /></a></Button>}
                        {agent.twitter_url && <Button variant="outline" size="icon" asChild className="bg-transparent text-white border-white/50 hover:bg-white/10"><a href={agent.twitter_url} target="_blank"><Twitter /></a></Button>}
                        {agent.instagram_url && <Button variant="outline" size="icon" asChild className="bg-transparent text-white border-white/50 hover:bg-white/10"><a href={agent.instagram_url} target="_blank"><Instagram /></a></Button>}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                 <AttractionListingSection
                    title="My Featured Excursions"
                    excursions={featuredExcursions}
                    layout="grid"
                    showViewAllButton={false}
                    showTabs={false}
                />
                {featuredExcursions.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <h2 className="text-xl font-semibold">No Featured Excursions Yet</h2>
                        <p className="text-muted-foreground mt-2">This agent hasn't featured any excursions yet. Check back soon!</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function AgentPublicPage({ params }: { params: { agentName: string } }) {
    const agentName = decodeURIComponent(params.agentName);
    return <AgentPublicPageClient agentName={agentName} />;
}
