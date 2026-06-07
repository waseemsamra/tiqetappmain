
'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { UserForAdmin, FormState } from '@/types';
import { updateUserAction } from '@/app/actions';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Saving...' : 'Save Changes'}
        </Button>
    );
}

const initialState: FormState = {
    message: '',
    success: false,
    errors: {},
};

export function UserForm({ user }: { user: UserForAdmin }) {
    const { toast } = useToast();
    const router = useRouter();
    const [state, formAction] = useFormState(updateUserAction, initialState);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast({
                    title: 'Success!',
                    description: state.message,
                });
                router.push('/admin/users');
            } else {
                const description = state.errors ? Object.values(state.errors).flat().join(', ') : state.message;
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: description || 'An unknown error occurred.',
                });
            }
        }
    }, [state, toast, router]);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={user.id} />
            <Card>
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                    <CardDescription>
                        Editing user: <span className="font-semibold text-foreground">{user.email}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            defaultValue={user.full_name || ''}
                        />
                        {state?.errors?.fullName && <p className="text-sm text-destructive mt-1">{state.errors.fullName.join(', ')}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" defaultValue={user.role}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="customer">Customer</SelectItem>
                                <SelectItem value="agent">Agent</SelectItem>
                                <SelectItem value="partner">Partner</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                         {state?.errors?.role && <p className="text-sm text-destructive mt-1">{state.errors.role.join(', ')}</p>}
                    </div>
                </CardContent>
                <CardFooter className="justify-end">
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
    );
}
