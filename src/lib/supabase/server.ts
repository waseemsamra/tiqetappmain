// Stub for API-only mode - Supabase disabled
export const createClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null } }),
  },
});

export const createServerClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null } }),
  },
});

export const createSupabaseAdminClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null } }),
  },
});