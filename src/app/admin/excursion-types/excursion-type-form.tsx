
'use client';

import { useEffect, useTransition } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { ExcursionType, FormState } from '@/types';
import { Loader2 } from 'lucide-react';

interface ExcursionTypeFormProps {
  excursionType?: ExcursionType;
  onFormSubmit: (prevState: FormState, formData: FormData) => Promise<FormState>;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Type'}
        </Button>
    );
}

const initialState: FormState = {
  message: '',
  success: false,
};

export function ExcursionTypeForm({ excursionType, onFormSubmit }: ExcursionTypeFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const isEditing = !!excursionType;

  const [state, formAction] = useFormState(onFormSubmit, initialState);

  useEffect(() => {
    if (state.success && state.message) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      router.push('/admin/excursion-types');
    } else if (!state.success && state.message) {
      const description = state.errors?.name?.join(', ') || state.message;
      toast({
        variant: 'destructive',
        title: 'Error',
        description,
      });
    }
  }, [state, toast, router]);


  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Excursion Type' : 'New Excursion Type'}</CardTitle>
          <CardDescription>
            {isEditing ? `Update the name for "${excursionType.name}".` : 'Enter a name for the new excursion type.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="name">Excursion Type Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={excursionType?.name || ''}
              minLength={2}
              required
            />
            {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name.join(', ')}</p>}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <SubmitButton isEditing={isEditing} />
        </CardFooter>
      </Card>
    </form>
  );
}
