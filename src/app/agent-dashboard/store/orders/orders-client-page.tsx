
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DatePicker } from '@/app/agent-dashboard/financial/e-wallet/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/app/admin/data-table';
import { columns } from './columns';
import { Search } from 'lucide-react';

const NoDataAvailable = () => (
    <div className="text-center py-16">
        <div className="inline-block p-6 bg-muted rounded-full">
             <div className="p-4 bg-background rounded-full border-2 border-dashed flex items-center justify-center h-24 w-24">
                <div className="relative">
                    <Search className="h-12 w-12 text-muted-foreground" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">?</span>
                </div>
             </div>
        </div>
        <p className="mt-4 text-muted-foreground">No Data Available</p>
    </div>
);

export default function OrdersClientPage() {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>

       <Card>
        <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <DatePicker />
                <DatePicker />
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Username" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Add username options here */}
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Add payment type options here */}
                    </SelectContent>
                </Select>
                 <Input placeholder="Invoice Id" />
                <div className="lg:col-span-5 flex items-end">
                    <Button>Get Report</Button>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={[]}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            filterColumn="product"
            filterPlaceholder="Filter by product..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
