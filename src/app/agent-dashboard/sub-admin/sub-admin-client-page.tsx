
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Plus, Trash2, UserCheck, UserX, User, Edit, Users, Ban } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';


const placeholderData = [
    { id: 1, name: 'wod', userName: 'dq', email: 'qd@gmail.com', userGroup: 'Support', createdDate: '28 Apr 2025' },
    { id: 2, name: 'pranshul', userName: 'dsa', email: 'sdsasd@mail.com', userGroup: 'Financial', createdDate: '10 Apr 2025' },
];

export function SubAdminClientPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Sub Admins</h1>
            <Breadcrumb className="mt-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Sub Admins</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">+ User Group</Button>
            <Button><Plus className="mr-2 h-4 w-4" />Sub Admin</Button>
        </div>
      </header>
       <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="active">
                <TabsList>
                    <TabsTrigger value="active" className="gap-2"><UserCheck className="h-4 w-4" />Active</TabsTrigger>
                    <TabsTrigger value="inactive" className="gap-2"><UserX className="h-4 w-4" />Inactive</TabsTrigger>
                    <TabsTrigger value="trashed" className="gap-2"><Trash2 className="h-4 w-4" />Trashed</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>User Group</TableHead>
                                <TableHead>Created Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {placeholderData.map((admin) => (
                                <TableRow key={admin.id}>
                                    <TableCell>{admin.id}</TableCell>
                                    <TableCell>{admin.name}</TableCell>
                                    <TableCell>{admin.userName}</TableCell>
                                    <TableCell>{admin.email}</TableCell>
                                    <TableCell>{admin.userGroup}</TableCell>
                                    <TableCell>{admin.createdDate}</TableCell>
                                    <TableCell>
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Users className="mr-2 h-4 w-4" />
                                                    <span>Impersonate</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Profile</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-yellow-600 focus:text-yellow-600">
                                                    <Ban className="mr-2 h-4 w-4" />
                                                    <span>Block</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="inactive">
                    <div className="text-center py-16 text-muted-foreground">No inactive sub-admins.</div>
                </TabsContent>
                <TabsContent value="trashed">
                    <div className="text-center py-16 text-muted-foreground">No trashed sub-admins.</div>
                </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
          </CardContent>
      </Card>
    </div>
  );
}
