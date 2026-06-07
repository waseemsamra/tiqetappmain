
import { DollarSign, ShieldCheck, Ticket } from 'lucide-react';
import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="bg-muted/60 p-6 rounded-xl flex items-start gap-4">
        <div className="flex-shrink-0">
            <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Icon className="h-6 w-6" />
            </div>
        </div>
        <div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground mt-1">{description}</p>
        </div>
    </div>
);

export default function FeatureCards() {
    const features = [
        {
            icon: DollarSign,
            title: "Stay flexible",
            description: "Flexible cancellation options on all venues"
        },
        {
            icon: ShieldCheck,
            title: "Book with confidence",
            description: "Easy booking and skip-the-line entry on your phone"
        },
        {
            icon: Ticket,
            title: "Enjoy culture your way",
            description: "The best experiences at museums and attractions worldwide"
        }
    ];

    return (
        <div className="bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map(feature => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}
