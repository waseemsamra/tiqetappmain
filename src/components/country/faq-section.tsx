
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image';

interface FaqItem {
  question: string;
  answer: string;
  image: string;
  aiHint: string;
}

const getFaqData = (countryName: string): FaqItem[] => [
    {
        question: `What are the best things to do in ${countryName}?`,
        answer: `The best things to do in ${countryName} include visiting iconic landmarks, exploring vibrant markets, and enjoying the local cuisine. Top attractions often include historic sites, museums, and natural parks.`,
        image: "https://picsum.photos/80/80?random=1",
        aiHint: "landmark",
    },
    {
        question: `What places should I visit in ${countryName} with family?`,
        answer: `${countryName} is very family-friendly. Consider visiting theme parks, interactive museums, and beaches. Many places offer dedicated activities for children.`,
        image: "https://picsum.photos/80/80?random=2",
        aiHint: "family attraction",
    },
    {
        question: `What are the hidden gems in ${countryName}?`,
        answer: `To discover hidden gems in ${countryName}, venture off the beaten path to find charming local neighborhoods, smaller art galleries, and authentic restaurants that are popular with locals.`,
        image: "https://picsum.photos/80/80?random=3",
        aiHint: "historic street",
    },
    {
        question: `What day trips can I take from the main cities in ${countryName}?`,
        answer: `From major cities in ${countryName}, you can often take day trips to nearby natural wonders, historical towns, or coastal areas. Options range from guided bus tours to scenic train rides.`,
        image: "https://picsum.photos/80/80?random=4",
        aiHint: "landscape",
    },
    {
        question: `How is the nightlife in ${countryName}?`,
        answer: `The nightlife in ${countryName} is diverse, offering everything from rooftop bars with stunning views to traditional pubs and lively nightclubs.`,
        image: "https://picsum.photos/80/80?random=5",
        aiHint: "city nightlife",
    },
    {
        question: `How can I spend a weekend or stopover in ${countryName}?`,
        answer: `For a weekend or stopover, focus on one or two key areas. A typical itinerary could include a major museum, a famous landmark, and a walking tour of a historic district, leaving time for dining.`,
        image: "https://picsum.photos/80/80?random=6",
        aiHint: "cityscape",
    },
];


export function FaqSection({ countryName }: { countryName: string }) {
    const faqData = getFaqData(countryName);

    return (
        <section>
            <h2 className="text-3xl font-bold mb-8">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg hover:no-underline">
                           <div className="flex items-center gap-4">
                             <Image 
                                src={item.image} 
                                alt={item.question} 
                                width={60} 
                                height={60} 
                                className="rounded-lg object-cover" 
                                data-ai-hint={item.aiHint}
                             />
                             <span className="text-left">{item.question}</span>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base pl-20">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}
