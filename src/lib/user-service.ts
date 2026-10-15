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

export async function getUsers({ page, perPage, search, role }: { page: number; perPage: number; search: string; role?: string }): Promise<{ users: any[]; totalCount: number }> {
  // In API-only mode, we return mock data with roles
  const allUsers = [
    {
      id: '1',
      email: 'waseemsamra@gmail.com',
      full_name: 'Waseem Samra',
      role: 'admin',
      status: 'Active',
      last_sign_in_at: new Date().toISOString(),
      groups: ['admin', 'management']
    },
    {
      id: '2',
      email: 'agent@example.com',
      full_name: 'John Agent',
      role: 'agent',
      status: 'Active',
      last_sign_in_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // yesterday
      groups: ['agents']
    },
    {
      id: '3',
      email: 'partner@example.com',
      full_name: 'Jane Partner',
      role: 'partner',
      status: 'Active',
      last_sign_in_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // a week ago
      groups: ['partners']
    },
    {
      id: '4',
      email: 'staff@example.com',
      full_name: 'Bob Staff',
      role: 'staff',
      status: 'Active',
      last_sign_in_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      groups: ['staff']
    },
    {
      id: '5',
      email: 'customer@example.com',
      full_name: 'Alice Customer',
      role: 'customer',
      status: 'Active',
      last_sign_in_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      groups: ['customers']
    }
  ];

  // Filter by role if provided
  let filteredByRole = allUsers;
  if (role) {
    filteredByRole = allUsers.filter(user => user.role === role);
  }

  // Filter by search term if provided
  const filteredUsers = search 
    ? filteredByRole.filter(user => 
        user.email.toLowerCase().includes(search.toLowerCase()) || 
        user.full_name.toLowerCase().includes(search.toLowerCase())
      )
    : filteredByRole;

  // Apply pagination
  const start = (page - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(start, start + perPage);

  return { 
    users: paginatedUsers, 
    totalCount: filteredUsers.length 
  };
}

export async function getUserById(id: string): Promise<any> {
  // Mock implementation
  const mockUsers = [
    { id: '1', email: 'waseemsamra@gmail.com', full_name: 'Waseem Samra', role: 'admin', status: 'Active', last_sign_in_at: new Date().toISOString(), groups: ['admin', 'management'] },
    { id: '2', email: 'agent@example.com', full_name: 'John Agent', role: 'agent', status: 'Active', last_sign_in_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), groups: ['agents'] },
    { id: '3', email: 'partner@example.com', full_name: 'Jane Partner', role: 'partner', status: 'Active', last_sign_in_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), groups: ['partners'] },
    { id: '4', email: 'staff@example.com', full_name: 'Bob Staff', role: 'staff', status: 'Active', last_sign_in_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), groups: ['staff'] },
    { id: '5', email: 'customer@example.com', full_name: 'Alice Customer', role: 'customer', status: 'Active', last_sign_in_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), groups: ['customers'], passport_number: 'P12345678', passport_expiry: '2028-06-15', date_of_birth: '1990-03-22', loyalty_tier: 'silver', loyalty_points: 1500, miles_points: 2500, wallet_balance: 75.50 },
    { id: '6', email: 'alice@example.com', full_name: 'Alice Wonder', role: 'customer', status: 'Active', last_sign_in_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), groups: ['customers'], passport_number: 'P87654321', passport_expiry: '2029-01-10', date_of_birth: '1985-07-14', loyalty_tier: 'gold', loyalty_points: 3200, miles_points: 1800, wallet_balance: 150.00 },
  ];

  return mockUsers.find(user => user.id === id) || null;
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

// Group functions
export async function getGroupsCount(): Promise<number> {
  return 5; // mock count
}

export async function getActiveGroupsCount(): Promise<number> {
  return 5; // mock count
}

export async function getGroups({ page, perPage, search }: { page: number; perPage: number; search: string }): Promise<{ groups: any[]; totalCount: number }> {
  // Mock groups data
  const allGroups = [
    {
      id: '1',
      name: 'admin',
      description: 'System administrators with full access',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      name: 'management',
      description: 'Management team with access to reports and settings',
      created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      name: 'agents',
      description: 'Travel agents who can manage their own bookings and clients',
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      name: 'partners',
      description: 'Business partners and affiliate marketers',
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      name: 'staff',
      description: 'Customer support and operational staff',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '6',
      name: 'customers',
      description: 'Regular customers and end users',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Filter by search term if provided
  const filteredGroups = search 
    ? allGroups.filter(group => 
        group.name.toLowerCase().includes(search.toLowerCase()) || 
        (group.description || '').toLowerCase().includes(search.toLowerCase())
      )
    : allGroups;

  // Apply pagination
  const start = (page - 1) * perPage;
  const paginatedGroups = filteredGroups.slice(start, start + perPage);

  return { 
    groups: paginatedGroups, 
    totalCount: filteredGroups.length 
  };
}

export async function getGroupById(id: string): Promise<any> {
  // Mock implementation
  const mockGroups = [
    { id: '1', name: 'admin', description: 'System administrators with full access', created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '2', name: 'management', description: 'Management team with access to reports and settings', created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '3', name: 'agents', description: 'Travel agents who can manage their own bookings and clients', created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '4', name: 'partners', description: 'Business partners and affiliate marketers', created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '5', name: 'staff', description: 'Customer support and operational staff', created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '6', name: 'customers', description: 'Regular customers and end users', created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() }
  ];
  
  return mockGroups.find(group => group.id === id) || null;
}

export async function createGroupAction(formData: FormData): Promise<{success: boolean; message: string}> {
  // Mock implementation
  return { success: true, message: 'Group created successfully' };
}

export async function updateGroupAction(id: string, formData: FormData): Promise<{success: boolean; message: string}> {
  // Mock implementation
  return { success: true, message: 'Group updated successfully' };
}

export async function deleteGroupAction(id: string): Promise<{success: boolean; message: string}> {
  // Mock implementation
  return { success: true, message: 'Group deleted successfully' };
}