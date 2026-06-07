
'use server';

import { getPaymentSettingsAction, type PaymentSettings } from '../actions';

const ZIINA_API_BASE = 'https://api-v2.ziina.com/api';

export async function verifyZiinaConnectionAction(): Promise<{ success: boolean; error?: string }> {
    const settings = await getPaymentSettingsAction();
    if (!settings.ziinaApiKey || !settings.ziinaApiKey.trim()) {
        return { success: false, error: "ZIINA API key is not configured. Please save your key below." };
    }

    try {
        const response = await fetch(`${ZIINA_API_BASE}/webhooks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${settings.ziinaApiKey.trim()}`,
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
        
        return { success: true };

    } catch (e) {
        const error = e instanceof Error ? e.message : 'An unknown error occurred.';
        console.error("ZIINA Connection Verification Error:", error);
        return { success: false, error: `Network error: ${error}` };
    }
}
