
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Review = {
    no: number;
    product: string;
    totalReview: number;
    rating: string;
};

export const columns: ColumnDef<Review>[] = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'product', header: 'Product' },
  { accessorKey: 'totalReview', header: 'Total Review' },
  { accessorKey: 'rating', header: 'Rating' },
  {
    id: 'view',
    header: 'View',
    cell: () => (
      <Button variant="ghost" size="icon">
        <Eye className="h-5 w-5" />
      </Button>
    ),
  },
];
