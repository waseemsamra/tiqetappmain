'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DatePicker } from '@/app/agent-dashboard/financial/e-wallet/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/app/admin/data-table';
import { columns } from './columns';

const placeholderData = [
  { no: 1, username: 'oliviaparker', email: 'oliviaparker', product: 'Dragon\'s Reign +2', transactionRef: 'TXN20250613550059', totalPrice: 3000, status: 'Pending', date: '17 Jun 2025' },
  { no: 2, username: 'demouser', email: 'demouser', product: 'Chaos Unleashed +2', transactionRef: '12345678890', totalPrice: 4500, status: 'Pending', date: '03 Jul 2025' },
  { no: 3, username: 'demouser', email: 'demouser', product: 'Platinum Supreme', transactionRef: 'Wwe4er5edfxSDfr546', totalPrice: 2500, status: 'Pending', date: '05 Aug 2025' },
  { no: 4, username: 'demouser', email: 'demouser', product: 'Echoes of Destiny', transactionRef: '0x4a8503ca289e497981fe85196a9c2f7e08a53efc30ebe75bb26e8a2a758fc92b', totalPrice: 1500, status: 'Pending', date: '05 Aug 2025' },
  { no: 5, username: 'demouser', email: 'demouser', product: 'Legends of Lumina +3', transactionRef: '0xa97e9d48c835cd771a4612a634ec9ed656e054c7a99222c65c680c1b6fc8d67a', totalPrice: 6000, status: 'Pending', date: '05 Aug 2025' },
  { no: 6, username: 'demouser', email: 'demouser', product: 'Titanium Triumph', transactionRef: '0xfbea3f9e832e0c8f012e1ed2e6d1ea85dff78d0a0fd9b37460687a5957b2fa8e', totalPrice: 3000, status: 'Pending', date: '05 Aug 2025' },
];

export default function OrderApprovalClientPage() {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Order Approval</h1>
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
                        <SelectItem value="oliviaparker">oliviaparker</SelectItem>
                        <SelectItem value="demouser">demouser</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                <Button>Get Report</Button>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={placeholderData}
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
