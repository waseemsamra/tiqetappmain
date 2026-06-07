
'use client';

import { useTransition } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { approveOrderAction, rejectOrderAction } from './actions';
import { useRouter } from 'next/navigation';

type Order = {
  no: number;
  username: string;
  email: string;
  product: string;
  transactionRef: string;
  totalPrice: number;
  status: string;
  date: string;
};

function ActionButtons({ order }: { order: any }) {
    const { toast } = useToast();
    const router = useRouter();
    const [isApproving, startApproveTransition] = useTransition();
    const [isRejecting, startRejectTransition] = useTransition();

    const handleApprove = () => {
        startApproveTransition(async () => {
            const result = await approveOrderAction(order.transactionRef);
            if (result.success) {
                toast({ title: 'Success', description: result.message });
                router.refresh();
            } else {
                toast({ variant: 'destructive', title: 'Error', description: result.message });
            }
        });
    };

    const handleReject = () => {
        startRejectTransition(async () => {
            const result = await rejectOrderAction(order.transactionRef);
             if (result.success) {
                toast({ title: 'Success', description: result.message });
                router.refresh();
            } else {
                toast({ variant: 'destructive', title: 'Error', description: result.message });
            }
        });
    };
    
    return (
        <div className="flex gap-2">
            <Button size="sm" onClick={handleApprove} disabled={isApproving || isRejecting}>
                {isApproving ? 'Approving...' : 'Approve'}
            </Button>
            <Button variant="destructive" size="sm" onClick={handleReject} disabled={isApproving || isRejecting}>
                 {isRejecting ? 'Rejecting...' : 'Reject'}
            </Button>
        </div>
    );
}


export const columns: ColumnDef<Order>[] = [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'username', header: 'Username' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'product', header: 'Product' },
  { accessorKey: 'transactionRef', header: 'Transaction Reference Number', cell: ({ row }) => <span className="truncate max-w-xs block">{row.original.transactionRef}</span> },
  { accessorKey: 'totalPrice', header: 'Total Price', cell: ({ row }) => `$${row.original.totalPrice}` },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'date', header: 'Date' },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => <ActionButtons order={row.original} />,
  },
];
