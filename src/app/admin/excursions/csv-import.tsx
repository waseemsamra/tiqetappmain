
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { importExcursionsFromCsvAction } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import type { FormState } from '@/types';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            <Upload className="mr-2 h-4 w-4" />
            {pending ? 'Importing...' : 'Import CSV'}
        </Button>
    );
}

const initialState: FormState = {
    message: "",
    success: false,
};

export function CsvImport() {
    const { toast } = useToast();
    const router = useRouter();
    const [state, formAction] = useFormState(importExcursionsFromCsvAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state && state.message) {
            if (state.success) {
                toast({ title: 'Success', description: state.message });
                formRef.current?.reset();
                router.refresh();
            } else {
                toast({ variant: 'destructive', title: 'Import Failed', description: state.message, duration: 8000 });
            }
        }
    }, [state, toast, router]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Import Excursions</CardTitle>
                <CardDescription className="space-y-2">
                    <p>
                        Bulk upload excursions from a CSV file. The file must contain the headers (in any order): 
                        <code className="bg-muted px-1 py-0.5 rounded-sm text-xs font-mono mx-1">country</code>, 
                        <code className="bg-muted px-1 py-0.5 rounded-sm text-xs font-mono mx-1">city</code>,
                        <code className="bg-muted px-1 py-0.5 rounded-sm text-xs font-mono mx-1">activity_name</code>,
                        <code className="bg-muted px-1 py-0.5 rounded-sm text-xs font-mono mx-1">rating</code>,
                        <code className="bg-muted px-1 py-0.5 rounded-sm text-xs font-mono mx-1">activity_type</code>, and
                        <code className="bg-muted px-1 py-0.5 rounded-sm text-xs font-mono mx-1">price</code>.
                    </p>
                    <p>If an `activity_type` does not exist, it will be automatically created.</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} ref={formRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Input type="file" name="csvfile" accept=".csv" required className="flex-grow" />
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button asChild variant="outline" className="w-1/2 sm:w-auto">
                           <Link href="/sample-excursions.csv" download>
                             <Download className="mr-2 h-4 w-4" />
                             Sample
                           </Link>
                        </Button>
                        <SubmitButton />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
