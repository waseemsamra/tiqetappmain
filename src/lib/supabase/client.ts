// Stub for API-only mode - Supabase disabled
export const createClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null } }),
  },
});

export const createBrowserClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null } }),
  },
});