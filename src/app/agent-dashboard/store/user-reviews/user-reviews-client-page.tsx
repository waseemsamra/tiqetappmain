
'use client';

import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/app/admin/data-table';
import { columns } from './columns';

type Review = {
  no: number;
  product: string;
  totalReview: number;
  rating: string;
};

export default function UserReviewsClientPage({ initialReviews }: { initialReviews: Review[] }) {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Reviews</h1>
        <Button asChild>
          <Link href="#">
            <Plus className="mr-2 h-4 w-4" />
            Review
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={initialReviews}
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
