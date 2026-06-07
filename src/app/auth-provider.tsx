'use client';

import { createContext, useContext } from 'react';

type Session = { user: { id: string; email?: string } } | null;

interface AuthContextType {
  session: Session | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
});

export function AuthProvider({ children, session }: { children: React.ReactNode; session?: Session }) {
  return <AuthContext.Provider value={{ session: session || null }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
