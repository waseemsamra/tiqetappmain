
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Inbox, Send, RefreshCw, Search, PlusCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const NoDataAvailable = () => (
    <div className="text-center py-16 flex flex-col items-center justify-center h-full">
        <div className="inline-block p-6 bg-muted rounded-full">
             <div className="p-4 bg-background rounded-full border-2 border-dashed">
                <Search className="h-12 w-12 text-muted-foreground" />
             </div>
        </div>
        <p className="mt-4 font-semibold">No Data Available</p>
    </div>
);


export default function EmailsClientPage() {
    return (
        <Card className="h-full">
            <CardContent className="pt-6 grid grid-cols-[250px_1fr] h-full">
                <div className="border-r pr-6 space-y-4">
                    <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Compose
                    </Button>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-2 bg-primary/10 text-primary">
                            <Inbox className="h-4 w-4" />
                            Inbox
                        </Button>
                         <Button variant="ghost" className="w-full justify-start gap-2">
                            <Send className="h-4 w-4" />
                            Sent
                        </Button>
                    </div>
                </div>
                <div className="pl-6 flex flex-col">
                    <div className="flex items-center gap-4 pb-4 border-b">
                        <Checkbox />
                        <Button variant="ghost" size="icon">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex-grow">
                        <NoDataAvailable />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
