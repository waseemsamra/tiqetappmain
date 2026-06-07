
"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { approveAllPendingExcursionsAction } from "@/app/actions";
import { useRouter } from "next/navigation";

export function ApproveAllButton() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const router = useRouter();

    const handleApproveAll = async () => {
        if (!confirm("Are you sure you want to approve all pending excursions?")) {
            return;
        }

        startTransition(async () => {
            const result = await approveAllPendingExcursionsAction();
            if (result.success) {
                toast({
                    title: "Success",
                    description: result.message,
                });
                router.refresh();
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.message,
                });
            }
        });
    };

    return (
        <Button variant="outline" onClick={handleApproveAll} disabled={isPending}>
            <CheckCheck className="mr-2 h-4 w-4" />
            {isPending ? "Approving..." : "Approve All Pending"}
        </Button>
    );
}
