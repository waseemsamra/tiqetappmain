
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { addMemberAction } from '@/app/actions';
import type { FormState } from '@/types';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? 'Adding Member...' : 'Add Member'}
        </Button>
    );
}

const initialState: FormState = { success: false, message: '' };

export default function AddMemberPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [state, formAction] = useFormState(addMemberAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    
    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast({ title: "Success!", description: state.message });
                formRef.current?.reset();
                router.push('/agent-dashboard/downline');
            } else {
                const description = state.errors ? Object.values(state.errors).flat().join(', ') : state.message;
                toast({ variant: 'destructive', title: 'Error', description });
            }
        }
    }, [state, toast, router]);

  return (
    <div className="space-y-6">
       <header>
        <Button variant="outline" asChild>
          <Link href="/agent-dashboard/downline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Network Members
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mt-4">Add New Member</h1>
        <p className="text-muted-foreground">
          Manually add a new member to your downline. They will be placed in your holding tank for you to assign a position.
        </p>
      </header>
       <form action={formAction} ref={formRef}>
            <Card>
                <CardHeader>
                <CardTitle>Member Details</CardTitle>
                <CardDescription>
                    Enter the details for the new member. They will receive an email to set their password.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" placeholder="John Doe" />
                     {state.errors?.fullName && <p className="text-sm text-destructive mt-1">{state.errors.fullName.join(', ')}</p>}
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john.doe@example.com" />
                    {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email.join(', ')}</p>}
                    </div>
                </div>
                </CardContent>
                <CardFooter>
                  <SubmitButton />
                </CardFooter>
            </Card>
       </form>
    </div>
  );
}
    
