// Stub for API-only mode - user service disabled
import type { Excursion, Booking, Review, Referral, Payout } from '@/types';

export async function getAgentPublicProfile(agentName: string): Promise<any> {
  return null;
}

export async function getFeaturedExcursions(agentId: string): Promise<Excursion[]> {
  return [];
}

export async function getAgentStats(agentId: string): Promise<{totalReferrals: number; totalEarnings: number;}> {
  return { totalReferrals: 0, totalEarnings: 0 };
}

export async function getAgentRank(referralCount: number): Promise<string> {
  return 'Bronze';
}

export async function getAgentReferrals(agentId: string, limit: number = 5): Promise<Referral[]> {
  return [];
}

export async function getAgentPayouts(agentId: string): Promise<Payout[]> {
  return [];
}

export async function addOrRemoveFromFeatured(agentId: string, excursionId: string): Promise<{success: boolean; message: string}> {
  return { success: false, message: 'Not available in API-only mode' };
}

export async function getUsersCount(): Promise<number> {
  return 0;
}

export async function getActiveUsersCount(): Promise<number> {
  return 0;
}

export async function getUsers(): Promise<any[]> {
  return [];
}

export async function getUserById(id: string): Promise<any> {
  return null;
}

export async function getFeaturedExcursionIds(agentId: string): Promise<string[]> {
  return [];
}

export async function getDirectDownline(agentId: string): Promise<any[]> {
  return [];
}

export async function getAgentProfile(agentId: string): Promise<any> {
  return null;
}

export async function getPartnerProfile(partnerId: string): Promise<any> {
  return null;
}

export async function getDocuments(userId: string): Promise<any[]> {
  return [];
}

export async function uploadDocument(userId: string, document: any): Promise<any> {
  return null;
}

export async function deleteDocument(documentId: string): Promise<void> {
  // Stub
}