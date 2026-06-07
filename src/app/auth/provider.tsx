
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

type AuthContextType = {
  supabase: { auth: { getSession: () => Promise<{ data: { session: null } }>, onAuthStateChange: () => { data: { subscription: { unsubscribe: () => void } } } } };
  session: Session | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  session: initialSession,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const supabase = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } }
      })
    }
  };
  const [session, setSession] = useState<Session | null>(initialSession);

  useEffect(() => {
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ supabase: supabase as any, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
