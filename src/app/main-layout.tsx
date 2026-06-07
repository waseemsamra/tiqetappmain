
'use client';

import { AuthProvider } from './auth-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';

type Session = { user: { id: string; email?: string } } | null;

export default function MainLayout({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    return (
        <AuthProvider session={session}>
            <Header />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </AuthProvider>
    );
}
