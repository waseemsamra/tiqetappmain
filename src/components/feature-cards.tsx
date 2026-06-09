
'use client';

import { DollarSign, ShieldCheck, Ticket } from 'lucide-react';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="bg-muted/60 p-6 rounded-xl flex items-start gap-4 min-h-[120px]">
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
                {/* Mobile carousel - visible on small screens */}
                <div className="md:hidden">
                    <Carousel
                        opts={{ align: "start", loop: false }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {features.map((feature, index) => (
                                <CarouselItem key={feature.title} className="pl-4 basis-full">
                                    <div className="h-full py-4">
                                        <FeatureCard {...feature} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                    </Carousel>
                </div>
                
                {/* Desktop grid - visible on medium+ screens */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map(feature => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}
