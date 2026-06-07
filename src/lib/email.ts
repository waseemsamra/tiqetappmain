

'use server';

import { Resend } from 'resend';
import { BookingConfirmationEmail } from '@/components/emails/booking-confirmation';
import { AgentInvitationEmail } from '@/components/emails/agent-invitation';

function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return null;
    }
    return new Resend(apiKey);
}

interface BookingDetails {
    bookingId: string;
    bookingReference: string;
    bookingDate: Date;
    excursionName: string;
    excursionImage: string;
}

export async function sendBookingConfirmationEmail({ to, bookingDetails }: { to: string, bookingDetails: BookingDetails }) {
    const resend = getResendClient();
    if (!resend) {
        console.warn("Resend API key is not configured. Skipping email sending. The app will continue to function, but no confirmation emails will be sent until the key is provided.");
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'RoamReady <onboarding@resend.dev>', // You might want to use a custom domain here
            to: [to],
            subject: `Your RoamReady Booking Confirmation for ${bookingDetails.excursionName}`,
            react: BookingConfirmationEmail({ 
                customerEmail: to,
                ...bookingDetails
            }),
        });

        if (error) {
            // Log the detailed error from Resend without stopping the process
            console.error('Failed to send booking confirmation email. Please check your Resend integration and API key.', error);
        } else {
            console.log(`Booking confirmation sent successfully to ${to}. Email ID: ${data?.id}`);
        }

    } catch (error) {
        // Catch any other unexpected errors during the API call
        console.error('An unexpected error occurred while trying to send the booking confirmation email:', error);
    }
}


export async function sendAgentInvitationEmail({ to, newMemberName, agentName, magicLink }: { to: string, newMemberName: string, agentName: string, magicLink: string }) {
    const resend = getResendClient();
    if (!resend) {
        console.warn("Resend API key is not configured. Skipping invitation email.");
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'RoamReady <onboarding@resend.dev>',
            to: [to],
            subject: `You've been invited to join ${agentName}'s team on RoamReady!`,
            react: AgentInvitationEmail({
                newMemberName,
                agentName,
                magicLink,
            }),
        });

        if (error) {
             console.error('Failed to send agent invitation email:', error);
        } else {
            console.log(`Agent invitation sent successfully to ${to}.`);
        }
    } catch (error) {
        console.error('An unexpected error occurred while sending the agent invitation email:', error);
    }
}
