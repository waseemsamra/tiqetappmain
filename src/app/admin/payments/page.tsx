

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaymentSettingsAction } from "./actions";
import { Settings } from "lucide-react";
import Link from "next/link";
import React from 'react';

const StripeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <path fill="#635bff" d="M40,4H8C5.791,4,4,5.791,4,8v32c0,2.209,1.791,4,4,4h32c2.209,0,4-1.791,4-4V8C44,5.791,42.209,4,40,4z"/>
        <path fill="#fff" fillRule="evenodd" d="M21.229,22.184h-5.334v-5.266c0-1.072-0.874-1.945-1.945-1.945c-1.072,0-1.945,0.874-1.945,1.945v14.164c0,1.072,0.874,1.945,1.945,1.945c1.072,0,1.945-0.874,1.945-1.945v-5.184h5.334v5.184c0,1.072,0.874,1.945,1.945,1.945c1.072,0,1.945-0.874,1.945-1.945V16.918c0-1.072-0.874-1.945-1.945-1.945c-1.072,0-1.945,0.874-1.945,1.945V22.184z" clipRule="evenodd"/>
        <path fill="#fff" d="M29.583,16.899c-1.636-0.648-3.253-0.297-4.484,0.85c-1.231,1.146-1.581,2.898-0.9,4.484c0.68,1.583,2.266,2.44,3.902,1.791c1.636,0.648,3.253,0.297,4.484-0.85c1.231-1.146,1.581,2.898,0.9-4.484C32.808,17.108,31.219,16.251,29.583,16.899z"/>
        <path fill="#fff" d="M30.483,26.43c-0.68-1.583-2.266-2.44-3.902-1.791c-1.636-0.648-3.253-0.297-4.484,0.85c-1.231,1.146-1.581,2.898-0.9,4.484c0.68,1.583,2.266,2.44,3.902,1.791c1.636,0.648,3.253,0.297,4.484-0.85C40.814,29.776,41.165,28.023,40.483,26.43z"/>
    </svg>
);

const PayPalIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <path fill="#003087" d="M24,4H8C5.791,4,4,5.791,4,8v32c0,2.209,1.791,4,4,4h32c2.209,0,4-1.791,4-4V8c44,5.791,42.209,4,40,4z"/>
        <path fill="#009cde" d="M34.3,24.1c-0.1-2.2-1.8-3.9-3.9-3.9h-5.9c-0.5,0-1,0.4-1,1v1.5c0,0.6,0.4,1,1,1h0.5c2,0,3.6,1.6,3.7,3.6c0.1,2.2-1.6,4-3.7,4h-2.1c-0.5,0-1,0.4-1,1v1.5c0,0.6,0.4,1,1,1h2.1c3.9,0,6.9-3.1,6.8-6.8H34.3z"/>
        <path fill="#fff" d="M28.4,20.2c-0.1-2.2-1.8-3.9-3.9-3.9h-8c-0.5,0-1,0.4-1,1v1.5c0,0.6,0.4,1,1,1h8c2,0,3.6,1.6,3.7,3.6c0.1,2.2-1.6,4-3.7,4h-3.9c-0.5,0-1,0.4-1,1v1.5c0,0.6,0.4,1,1,1h3.9C25.3,30.3,28.3,27.2,28.4,20.2z"/>
    </svg>
);

export const ZiinaIcon: React.FC = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="8" fill="#F4F4F5"/>
        <path d="M24 16C24 11.5817 27.5817 8 32 8C36.4183 8 40 11.5817 40 16" stroke="#09090B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 32C24 36.4183 20.4183 40 16 40C11.5817 40 8 36.4183 8 32" stroke="#09090B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 24C40 18.4772 35.5228 14 30 14C24.4772 14 20 18.4772 20 24" stroke="#09090B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 24C8 29.5228 12.4772 34 18 34C23.5228 34 28 29.5228 28 24" stroke="#09090B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PlaceholderIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
)

const ProviderCard = ({ title, description, icon: Icon, href, isConfigured, isEnabled = true }: { title: string; description: string; icon: React.ElementType; href: string; isConfigured: boolean; isEnabled?: boolean; }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
            <div className="flex-shrink-0 w-12 h-12"><Icon /></div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <CardTitle>{title}</CardTitle>
                    {isConfigured && <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Connected</span>}
                </div>
                <CardDescription className="mt-1 line-clamp-2">{description}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="mt-auto">
            <Button asChild className="w-full" disabled={!isEnabled}>
                <Link href={href}>
                    <Settings className="mr-2 h-4 w-4" />
                    {isConfigured ? 'Manage' : 'Configure'}
                </Link>
            </Button>
        </CardContent>
    </Card>
);

export default async function PaymentProvidersPage() {
    const settings = await getPaymentSettingsAction();

    const providers = [
        { title: "ZIINA", description: "The easiest way to accept payments in the UAE. Get paid instantly from your customers.", icon: ZiinaIcon, href: "/admin/payments/ziina", isConfigured: !!settings.ziinaApiKey, isEnabled: true },
        { title: "Stripe", description: "A complete payments platform with built-in support for cards, wallets, and more.", icon: StripeIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "PayPal", description: "A globally recognized payment solution, trusted by millions of users worldwide.", icon: PayPalIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Trust My Travel", description: "Financial protection and payment solutions for the travel industry.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Rapyd", description: "A global Fintech-as-a-Service platform for collecting and disbursing payments.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Braintree", description: "A full-stack payments platform that makes it easy to accept payments in your app or website.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "GMO", description: "A leading payment gateway in Japan, offering a variety of payment methods.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Central Pay", description: "Payment solutions for businesses of all sizes, with a focus on security.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Nets Easy", description: "A simple and secure online payment solution for the Nordic market.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Paytrail", description: "The leading online payment provider in Finland.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Plug'n'Pay", description: "A reliable and secure gateway for processing online payments.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Straumur", description: "An Icelandic payment gateway offering secure online payment processing.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Teya", description: "All-in-one payment and business management solutions.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Valitor", description: "An international payment solutions company dedicated to helping merchants grow.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Authorize.Net", description: "A trusted payment gateway for small businesses.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Adyen", description: "A global payment company that allows businesses to accept e-commerce and POS payments.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
        { title: "Worldpay", description: "A global leader in payments processing technology and solutions for merchants.", icon: PlaceholderIcon, href: "#", isConfigured: false, isEnabled: false },
    ];


    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Payment Providers</h1>
                <p className="text-muted-foreground">
                    Connect your preferred payment gateway to start accepting online bookings.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {providers.map((provider) => (
                    <ProviderCard key={provider.title} {...provider} />
                ))}
            </div>
        </div>
    );
}
