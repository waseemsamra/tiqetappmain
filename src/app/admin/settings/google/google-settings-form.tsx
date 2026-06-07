
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { FormState } from '@/types';
import { updateSettingAction } from './actions';

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save Settings'}</Button>;
}

const initialState: FormState = { success: false, message: "" };

export function GoogleSettingsForm({ initialGaId }: { initialGaId: string | null }) {
    const { toast } = useToast();
    const googleAction = updateSettingAction.bind(null, 'google_analytics_id');

    const [gaState, gaFormAction] = useFormState(googleAction, initialState);

    useEffect(() => {
        if (gaState.message) {
            if (gaState.success) {
                toast({ title: "Success!", description: gaState.message });
            } else {
                toast({ variant: 'destructive', title: "Error", description: gaState.message });
            }
        }
    }, [gaState, toast]);

    return (
        <div className="space-y-8">
            <form action={gaFormAction}>
                <Card>
                    <CardHeader>
                        <CardTitle>Google Analytics</CardTitle>
                        <CardDescription>
                            Enter your Measurement ID to enable Google Analytics and Ads conversion tracking across your site.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="max-w-md space-y-2">
                            <Label htmlFor="ga-id">Measurement ID (G-)</Label>
                            <Input 
                                id="ga-id"
                                name="value"
                                defaultValue={initialGaId || ''}
                                placeholder="G-XXXXXXXXXX"
                            />
                            {gaState?.errors?.value && <p className="text-sm text-destructive mt-1">{gaState.errors.value.join(', ')}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <SubmitButton />
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
