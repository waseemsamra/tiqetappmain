
'use client';

import type { Package } from '@/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MoreHorizontal, Info, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function PackageListItem({ packageItem }: { packageItem: Package }) {
    return (
        <Card>
            <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Image 
                        src={packageItem.image}
                        alt={packageItem.name}
                        width={120}
                        height={75}
                        className="rounded-md object-cover hidden sm:block"
                    />
                    <div>
                        <h3 className="font-bold text-lg">{packageItem.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{packageItem.tier}</p>
                        <p className="text-sm text-muted-foreground mt-1">Category Name: {packageItem.categoryName}</p>
                        <p className="font-semibold text-lg mt-2">${packageItem.price.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
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
                </div>
            </CardContent>
        </Card>
    )
}
