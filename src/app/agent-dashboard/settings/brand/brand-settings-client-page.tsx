
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

const ImageUploader = ({ title, allowedFiles }: { title: string, allowedFiles: string }) => (
    <div className="space-y-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
            <div className="w-24 h-24 relative mb-2">
                <Image src="https://placehold.co/100x100/EEE/31343C?text=LOGO" alt="Logo placeholder" layout="fill" className="rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground">{allowedFiles}</p>
        </div>
    </div>
);


export default function BrandSettingsClientPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Change Logo</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <ImageUploader title="Change Your Logo" allowedFiles="Allowed *.jpeg, *.jpg, *.png, *.gif max size of 1.1 MB" />
                   <ImageUploader title="Change Your Fav Icon" allowedFiles="Allowed *.jpeg, *.jpg, *.png, *.gif max size of 1.1 MB" />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" defaultValue="CloudMLM software" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="company-address">Company Address</Label>
                        <Textarea id="company-address" defaultValue="Unit 1A, 4th floor, KSITIL, Special Economic Zone, Cyberpark Campus, Sahya building, Nillikkode P.O, Kerala 673016" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="info@cloudlumen.com" />
                    </div>
                    <div className="flex justify-end">
                        <Button>Save</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
