
'use client';

import { useState, useTransition, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { Message, ConciergeInput, ConciergeOutput } from '@/types';

function Concierge() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm Proto, your AI travel concierge. How can I help you plan your next adventure today?" }
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      // If there's an initial query, simulate a user message and trigger a response
      const userMessage: Message = { role: 'user', content: initialQuery };
      setMessages(prev => [...prev, userMessage]);
      
      startTransition(async () => {
          try {
              const response = await fetch('/api/concierge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: messages, message: initialQuery } as ConciergeInput),
              });
              if (!response.ok) throw new Error(await response.text());
              const result: ConciergeOutput = await response.json();
              setMessages(prev => [...prev, { role: 'model', content: result.response }]);
          } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
              toast({ variant: 'destructive', title: 'Error', description: errorMessage });
              setMessages(prev => prev.slice(0, -1)); // Remove the user's message on failure
          }
      });
    }
  }, [initialQuery]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    const currentInput = input;
    setInput('');

    startTransition(async () => {
      try {
        const response = await fetch('/api/concierge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            history: messages,
            message: currentInput,
          } as ConciergeInput),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get response from the concierge.');
        }

        const result: ConciergeOutput = await response.json();

        setMessages(prev => [...prev, { role: 'model', content: result.response }]);
      
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        toast({
            variant: 'destructive',
            title: 'Error',
            description: errorMessage
        });
        setMessages(prev => prev.slice(0, -1));
      }
    });
  };

  return (
    <div className="flex h-[calc(100vh-80px)] justify-center items-center bg-muted/20">
      <Card className="w-full max-w-2xl h-[90vh] flex flex-col shadow-2xl">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-3">
            <BrainCircuit className="text-primary h-6 w-6" />
            AI Digital Concierge
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role === 'model' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                 <Avatar className="h-8 w-8 border">
                  <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isPending && (
                <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot className="h-5 w-5 animate-pulse" /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-2 text-sm">
                        <span className="animate-pulse">Thinking...</span>
                    </div>
                </div>
            )}
          <div ref={scrollRef} />
        </CardContent>
        <CardFooter className="border-t pt-6">
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Input
              id="message"
              placeholder="Ask for travel ideas, restaurant recommendations, etc..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isPending}
            />
            <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function ConciergePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Concierge />
        </Suspense>
    )
}
