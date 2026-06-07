
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const headersList = headers();

        // It's good practice to verify the webhook signature if ZIINA provides one.
        // For now, we'll log the payload and headers for inspection.
        console.log("ZIINA Webhook Received:", {
            headers: Object.fromEntries(headersList.entries()),
            body: payload
        });
        
        // You can add your logic here to handle different event types
        // switch (payload.type) {
        //     case 'payment_intent.succeeded':
        //         // Fulfill the order, update booking status, etc.
        //         break;
        //     case 'payment_intent.failed':
        //         // Notify user, cancel booking, etc.
        //         break;
        //     default:
        //         console.log(`Unhandled event type: ${payload.type}`);
        // }


        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error) {
        console.error('Error processing ZIINA webhook:', error);
        return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 400 });
    }
}
