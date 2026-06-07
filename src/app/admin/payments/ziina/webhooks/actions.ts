
'use server';

const ZIINA_API_BASE = 'https://api-v2.ziina.com/api';

export interface ZiinaWebhook {
    id: string;
    url: string;
    status: 'active' | 'inactive';
    events: string[];
}

interface WebhookListResponse {
    data: ZiinaWebhook[];
}

export async function getZiinaWebhooks(): Promise<{ success: boolean; webhooks?: ZiinaWebhook[]; error?: string; }> {
    const apiKey = process.env.ZIINA_API_KEY;
    if (!apiKey || !apiKey.trim()) {
        return { success: false, error: "ZIINA API key is not configured. Please add it in your environment variables." };
    }

    try {
        const response = await fetch(`${ZIINA_API_BASE}/webhooks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey.trim()}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });
        
        if (response.status === 401) {
            return { success: false, error: 'Authentication failed. The provided API Key is invalid.' };
        }
        if (!response.ok) {
            const data = await response.json();
            return { success: false, error: data.message || `API request failed with status ${response.status}.` };
        }
        
        const data: WebhookListResponse = await response.json();
        return { success: true, webhooks: data.data };

    } catch (e) {
        const error = e instanceof Error ? e.message : 'An unknown error occurred.';
        console.error("ZIINA Fetch Webhooks Error:", error);
        return { success: false, error: `Network error: ${error}` };
    }
}


export async function createZiinaWebhook(url: string, events: string[]): Promise<{ success: boolean; error?: string; }> {
    const apiKey = process.env.ZIINA_API_KEY;
    if (!apiKey || !apiKey.trim()) {
        return { success: false, error: "ZIINA API key is not configured." };
    }

     try {
        const response = await fetch(`${ZIINA_API_BASE}/webhooks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey.trim()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, events })
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, error: data.message || `API request failed with status ${response.status}.` };
        }
        
        revalidatePath('/admin/payments/ziina/webhooks');
        return { success: true };

    } catch (e) {
        const error = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { success: false, error: `Network error: ${error}` };
    }
}


export async function deleteZiinaWebhook(webhookId: string): Promise<{ success: boolean; error?: string; }> {
    const apiKey = process.env.ZIINA_API_KEY;
    if (!apiKey || !apiKey.trim()) {
        return { success: false, error: "ZIINA API key is not configured." };
    }

     try {
        const response = await fetch(`${ZIINA_API_BASE}/webhooks/${webhookId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${apiKey.trim()}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, error: data.message || `API request failed with status ${response.status}.` };
        }
        
        revalidatePath('/admin/payments/ziina/webhooks');
        return { success: true };

    } catch (e) {
        const error = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { success: false, error: `Network error: ${error}` };
    }
}
