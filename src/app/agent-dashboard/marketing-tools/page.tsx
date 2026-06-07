
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Link as LinkIcon, QrCode, Percent, BarChart2, User, Share2, Mail, MessageSquare, Video, Download } from 'lucide-react';
import { useAuth } from '@/app/auth-provider';
import { useMemo } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const marketingContent = [
    {
        id: 'promo-video-1',
        type: 'Video',
        title: 'Exotic Getaway Promo',
        thumbnail: 'https://picsum.photos/seed/promo1/400/225',
        description: 'A captivating video showcasing stunning travel destinations. Perfect for social media stories.',
    },
    {
        id: 'image-post-1',
        type: 'Image',
        title: 'Paris Adventure',
        thumbnail: 'https://picsum.photos/seed/promo2/400/225',
        description: 'High-quality image of the Eiffel Tower. Ideal for Instagram and Facebook posts.',
    },
    {
        id: 'email-template-1',
        type: 'Email',
        title: 'Exclusive Summer Deals',
        thumbnail: 'https://picsum.photos/seed/promo3/400/225',
        description: 'A pre-written email template to send to your prospect list about the latest summer promotions.',
    },
];

const MarketingContentCard = ({ content, onGenerateLink }: { content: (typeof marketingContent)[0], onGenerateLink: (contentId: string, campaign: string) => void }) => {
    const { toast } = useToast();
    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: `Copied ${type} to clipboard!` });
    };

    const campaignName = `${content.type.toLowerCase()}-${content.id.split('-')[2]}`;
    const generatedLink = `https://aafare.com/?ref=YOUR_CODE&campaign=${campaignName}`;

    return (
        <Card className="overflow-hidden">
            <div className="relative aspect-video">
                <Image src={content.thumbnail} alt={content.title} fill className="object-cover" />
                 <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">{content.type}</div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold">{content.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
                 <div className="mt-4 space-y-2">
                    <Label htmlFor={`link-${content.id}`} className="text-xs">Your Trackable Link</Label>
                    <div className="flex items-center space-x-2">
                        <Input id={`link-${content.id}`} value={generatedLink} readOnly className="h-9" />
                        <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleCopy(generatedLink, 'link')}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};


export default function MarketingToolsPage() {
    const { session } = useAuth();
    const { toast } = useToast();
    const user = session?.user;

    const referralCode = user?.user_metadata?.referral_code;
    const publicProfileName = user?.user_metadata?.full_name?.replace(/\s+/g, '') || user?.email?.split('@')[0];

    const referralLink = useMemo(() => {
        if (typeof window !== 'undefined' && referralCode) {
            return `${window.location.origin}/?ref=${referralCode}`;
        }
        return '';
    }, [referralCode]);

     const digitalBusinessCardUrl = useMemo(() => {
        if (typeof window !== 'undefined' && publicProfileName) {
            return `${window.location.origin}/agent/${publicProfileName}`;
        }
        return '';
    }, [publicProfileName]);
    
    const qrCodeUrl = useMemo(() => {
        if (referralLink) {
            return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(referralLink)}`;
        }
        return '';
    }, [referralLink]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied to clipboard!' });
    }

    if (!user || user.user_metadata?.role !== 'agent') {
        return notFound();
    }
    
    if (!referralCode) {
        return <p>Loading referral information...</p>;
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Marketing & Prospecting Tools</h1>
                <p className="text-muted-foreground mt-1">
                    Your hub for sharing referral links, accessing content, and tracking campaign performance.
                </p>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User /> Digital Business Card</CardTitle>
                    <CardDescription>Your personalized landing page. Share this single link for prospects to learn more and sign up under you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full max-w-lg items-center space-x-2">
                        <Input value={digitalBusinessCardUrl} readOnly />
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(digitalBusinessCardUrl)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                         <Button variant="secondary" asChild>
                            <Link href="#" target="_blank">Preview</Link>
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Feature coming soon.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Share2 /> Pre-Built Marketing Content</CardTitle>
                    <CardDescription>Use our library of professionally designed content to promote AAFare. Each item comes with a unique, trackable link.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {marketingContent.map(content => (
                            <MarketingContentCard key={content.id} content={content} onGenerateLink={() => {}} />
                        ))}
                    </div>
                </CardContent>
            </Card>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LinkIcon /> Default Referral Link</CardTitle>
                        <CardDescription>A direct link to the homepage with your referral code attached.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex w-full items-center space-x-2">
                            <Input value={referralLink} readOnly />
                            <Button variant="outline" size="icon" onClick={() => copyToClipboard(referralLink)}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><QrCode /> Referral QR Code</CardTitle>
                        <CardDescription>Share your link easily in person with a scannable QR code.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        {qrCodeUrl && <Image src={qrCodeUrl} alt="Referral QR Code" width={150} height={150} className="rounded-lg border p-1" />}
                        <Button variant="outline" disabled>
                            <Download className="mr-2 h-4 w-4"/>
                            Download QR Code
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Mail /> Automated Follow-Up System</CardTitle>
                    <CardDescription>Set up email or SMS sequences to automatically engage with new leads. (Coming Soon)</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-16">
                     <p>Create automated follow-up campaigns to nurture your prospects.</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart2 /> Link Performance</CardTitle>
                    <CardDescription>Track the performance of your marketing campaigns. (Coming Soon)</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-16">
                    <p>Analytics on link clicks and conversions will be displayed here.</p>
                </CardContent>
            </Card>

        </div>
    );
}
