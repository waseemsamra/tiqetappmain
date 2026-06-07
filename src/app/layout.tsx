
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';

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
  return (
    <html lang="en" className="h-full">
       <head>
       </head>
      <body className={`${inter.variable} font-sans flex flex-col h-full antialiased bg-background`}>
        <Header />
        <main className="flex-grow pt-20">
            {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
