
'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { createZiinaWebhook, deleteZiinaWebhook, type ZiinaWebhook } from './actions';
import { PlusCircle, Trash2, Globe, AlertTriangle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const availableEvents = [
  'payment_intent.succeeded',
  'payment_intent.failed',
  'payment_intent.canceled',
  'transfer.succeeded',
  'transfer.failed',
];

interface WebhookManagerProps {
    initialWebhooks?: ZiinaWebhook[];
    initialError?: string;
}

export default function WebhookManager({ initialWebhooks, initialError }: WebhookManagerProps) {
    const { toast } = useToast();
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [isCreating, startCreateTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();

    const webhookUrl = `${window.location.origin}/api/webhooks/ziina`;

    const handleCreate = () => {
        if (selectedEvents.length === 0) {
            toast({
                variant: 'destructive',
                title: 'No events selected',
                description: 'Please select at least one event type to create a webhook.'
            });
            return;
        }

        startCreateTransition(async () => {
            const result = await createZiinaWebhook(webhookUrl, selectedEvents);
            if (result.success) {
                toast({ title: 'Success', description: 'Webhook created successfully.' });
                setSelectedEvents([]);
            } else {
                toast({ variant: 'destructive', title: 'Error', description: result.error });
            }
        });
    };

    const handleDelete = (webhookId: string) => {
        startDeleteTransition(async () => {
            const result = await deleteZiinaWebhook(webhookId);
            if (result.success) {
                toast({ title: 'Success', description: 'Webhook deleted successfully.' });
            } else {
                toast({ variant: 'destructive', title: 'Error', description: result.error });
            }
        });
    }

    const handleEventChange = (event: string) => {
        setSelectedEvents(prev => 
            prev.includes(event) ? prev.filter(e => e !== event) : [...prev, event]
        );
    }
    
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Webhook</CardTitle>
                    <CardDescription>Select events to be notified about. The webhook will be created for the following URL:</CardDescription>
                     <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                        <Globe className="h-4 w-4" />
                        <span className="font-mono text-sm">{webhookUrl}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Label>Select Events</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {availableEvents.map(event => (
                                <div key={event} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={event}
                                        checked={selectedEvents.includes(event)}
                                        onCheckedChange={() => handleEventChange(event)}
                                    />
                                    <label htmlFor={event} className="text-sm font-mono cursor-pointer">{event}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCreate} disabled={isCreating}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {isCreating ? 'Creating...' : 'Create Webhook'}
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Existing Webhooks</CardTitle>
                    <CardDescription>The list of webhooks currently configured on your ZIINA account.</CardDescription>
                </CardHeader>
                <CardContent>
                    {initialError && (
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-8 text-center text-destructive">
                             <AlertTriangle className="h-10 w-10 mb-4" />
                            <h3 className="text-xl font-semibold">Could not fetch webhooks</h3>
                            <p className="mt-2 text-sm">{initialError}</p>
                        </div>
                    )}
                    
                    {!initialError && (
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>URL</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Events</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {initialWebhooks && initialWebhooks.length > 0 ? (
                                        initialWebhooks.map(webhook => (
                                            <TableRow key={webhook.id}>
                                                <TableCell className="font-mono text-xs">{webhook.url}</TableCell>
                                                <TableCell>
                                                    <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'}>{webhook.status}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {webhook.events.map(event => <Badge key={event} variant="outline" className="font-mono text-xs">{event}</Badge>)}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                          <Button variant="destructive" size="icon" disabled={isDeleting}>
                                                              <Trash2 className="h-4 w-4" />
                                                          </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This will permanently delete the webhook for <span className="font-mono">{webhook.url}</span>. This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(webhook.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">No webhooks found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
