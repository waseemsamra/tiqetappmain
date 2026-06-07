
'use server';

import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function approveOrderAction(orderId: string): Promise<{ success: boolean; message: string; }> {
    if (!orderId) {
        return { success: false, message: 'Order ID is missing.' };
    }
    try {
        // In a real app, you'd update the order status in your database.
        // For this demo, we'll simulate a successful update.
        console.log(`Simulating approval for order: ${orderId}`);
        revalidatePath('/agent-dashboard/store/order-approval');
        return { success: true, message: 'Order has been approved successfully.' };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, message: errorMessage };
    }
}

export async function rejectOrderAction(orderId: string): Promise<{ success: boolean; message: string; }> {
     if (!orderId) {
        return { success: false, message: 'Order ID is missing.' };
    }
    try {
        // In a real app, you'd update the order status in your database.
        console.log(`Simulating rejection for order: ${orderId}`);
        revalidatePath('/agent-dashboard/store/order-approval');
        return { success: true, message: 'Order has been rejected.' };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, message: errorMessage };
    }
}
