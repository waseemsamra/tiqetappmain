'use client';

import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
  image: string;
}

interface FaqSectionProps {
  items?: FaqItem[];
}

export default function FaqSection({ items = [] }: FaqSectionProps) {
  // If no items or not an array, render nothing
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-lg hover:no-underline">
            <div className="flex items-center gap-4">
              <Image                                 
                src={item.image}                                   
                alt={item.question}                                   
                width={60}                                   
                height={60}                                   
                className="rounded-lg object-cover unoptimized"                                    
                data-ai-hint="attraction"                                 
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
  );
}
