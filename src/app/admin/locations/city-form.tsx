
"use client";

import { useEffect, useRef } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createOrUpdateCityAction, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create City'}</Button>;
}

const initialState: FormState = {
    message: "",
    success: false,
};

interface CityFormProps {
    countryCode: string;
    city?: { name: string };
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onFormSubmitSuccess: () => void;
}

export function CityForm({ countryCode, city, open, onOpenChange, onFormSubmitSuccess }: CityFormProps) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(createOrUpdateCityAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const isEditing = !!city;

  useEffect(() => {
    if(open) {
      formRef.current?.reset();
    }
  }, [open]);

  useEffect(() => {
    if (state.message) {
        if (state.success) {
            toast({ title: 'Success', description: state.message });
            onFormSubmitSuccess();
        } else {
            const description = state.errors ? Object.values(state.errors).flat().join('\n') : state.message;
            toast({ variant: 'destructive', title: 'Error', description });
        }
    }
  }, [state, toast, onFormSubmitSuccess]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? `Edit City: ${city?.name}` : 'Create New City'}</DialogTitle>
        </DialogHeader>
        <form action={formAction} ref={formRef} className="space-y-4">
            <input type="hidden" name="countryCode" value={countryCode} />
            {isEditing && <input type="hidden" name="originalName" value={city?.name} />}
            
            <div>
              <Label htmlFor="name">City Name</Label>
              <Input id="name" name="name" defaultValue={city?.name || ''} className="mt-1" required />
              {state?.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name.join(', ')}</p>}
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <SubmitButton isEditing={isEditing} />
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
