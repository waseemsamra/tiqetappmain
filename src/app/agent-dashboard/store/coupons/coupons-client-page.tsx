
'use client';

import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/app/admin/data-table';
import { columns } from './columns';

type Coupon = {
    no: number;
    couponName: string;
    code: string;
    type: string;
    usedAvailable: string;
    discount: number;
    startDate: string;
    endDate: string;
    active: string;
    createdAt: string;
};


export default function CouponsClientPage({ initialCoupons }: { initialCoupons: Coupon[] }) {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
        <Button asChild>
          <Link href="#">
            <Plus className="mr-2 h-4 w-4" />
            Add Coupon
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={initialCoupons}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            filterColumn="couponName"
            filterPlaceholder="Filter by coupon name..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
