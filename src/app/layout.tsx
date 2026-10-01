
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PreferencesProvider } from '@/components/preferences-provider';
import { getDisplayCurrency, getDisplayLanguage } from '@/lib/tiqets-api';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: {
    default: 'AAFare - Your Ticket to Better Experiences',
    template: '%s | AAFare',
  },
  description: 'Your ticket to better experiences.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = getDisplayLanguage();

  return (
    <html lang={language} className="h-full">
      <body className={`${inter.variable} font-sans flex flex-col h-full antialiased bg-background`}>
        <PreferencesProvider
          initialPreferences={{
            language,
            currency: getDisplayCurrency(),
          }}
        >
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </PreferencesProvider>
        <Toaster />
      </body>
    </html>
  );
}
