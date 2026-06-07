
"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteUnusedImagesAction } from "@/app/actions";

export function CleanupButton() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleCleanup = async () => {
        if (!confirm("Are you sure you want to delete all unused images? This action cannot be undone.")) {
            return;
        }

        startTransition(async () => {
            const result = await deleteUnusedImagesAction();
            if (result.success) {
                toast({
                    title: "Success",
                    description: result.message,
                });
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
        <Button variant="outline" onClick={handleCleanup} disabled={isPending}>
            <Trash className="mr-2 h-4 w-4" />
            {isPending ? "Cleaning up..." : "Clean Up Images"}
        </Button>
    );
}
