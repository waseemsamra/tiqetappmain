
'use client';

import type { Package } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MoreHorizontal, Info, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function PackageGridItem({ packageItem }: { packageItem: Package }) {
    return (
        <Card className="overflow-hidden flex flex-col">
            <CardHeader className="p-0">
                 <div className="relative aspect-video">
                    <Image 
                        src={packageItem.image}
                        alt={packageItem.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg">{packageItem.name}</CardTitle>
                <p className="text-sm text-muted-foreground capitalize">{packageItem.tier}</p>
                 <p className="font-bold text-xl mt-4">${packageItem.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center bg-muted/50">
                 <Switch defaultChecked />
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Info className="mr-2 h-4 w-4" />
                            <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    )
}
