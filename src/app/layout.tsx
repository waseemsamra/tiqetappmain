
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PreferencesProvider } from '@/components/preferences-provider';
import { getDisplayCurrency, getDisplayLanguage } from '@/lib/tiqets-api';
import { RouteLoadingBar } from '@/components/route-loading-bar';

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
  // Set by src/middleware.ts so chrome-less routes (the /m
  // mobile page) can render without the desktop header/footer.
  const pathname = (await headers()).get('x-pathname') ?? '';
  const isMobilePage = pathname === '/m' || pathname.startsWith('/m/');

  return (
    <html lang={language} className="h-full">
      <body className={`${inter.variable} font-sans flex flex-col h-full antialiased bg-background`}>
        <PreferencesProvider
          initialPreferences={{
            language,
            currency: getDisplayCurrency(),
          }}
        >
          {!isMobilePage && <Header />}
          <main className={`flex-grow ${isMobilePage ? '' : 'pt-14'}`}>{children}</main>
          {!isMobilePage && <Footer />}
        </PreferencesProvider>
        <Toaster />
        <RouteLoadingBar />
      </body>
    </html>
  );
}
