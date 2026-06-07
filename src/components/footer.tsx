
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsModal } from './settings-modal';

const AppStoreButton = () => (
    <a href="#" className="inline-block bg-black text-white rounded-lg px-3 py-2 transition-transform hover:scale-105 w-full">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.25C6.075 2.25 2.25 6.075 2.25 12c0 5.925 3.825 9.75 9.75 9.75 5.925 0 9.75-3.825 9.75-9.75 0-5.925-3.825-9.75-9.75-9.75z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.442 8.528a2.52 2.52 0 00-1.74-1.12c-.596-.182-1.23.06-1.68.513-.45.451-.735 1.085-.63 1.745.105.659.54 1.205 1.11 1.446.57.24 1.23.045 1.68-.42.45-.465.675-1.08.26-1.713zm-3.03 5.484c-.405.015-.81.015-1.215 0-.765-.03-1.44-.33-1.92-.81-.48-.48-.75-1.11-.75-1.785 0-1.395 1.14-2.535 2.535-2.535.405 0 .81.06 1.215.18.705.195 1.29.69 1.62 1.335h.09c.015-.36.015-.72.015-1.08 0-1.875-1.515-3.39-3.39-3.39-1.875 0-3.39 1.515-3.39 3.39 0 1.53 1.02 2.82 2.4 3.255v.015c-1.68.48-2.85 2.025-2.85 3.825 0 .615.15 1.2.42 1.71.555 1.05 1.665 1.74 2.94 1.74.72 0 1.44-.225 2.04-.645.54-.375.96-.9 1.2-1.545a3.13 3.13 0 00.075-.48h-.12c-.3.63-.84 1.065-1.5 1.155z" />
            </svg>
            <div>
                <p className="text-xs">Download on the</p>
                <p className="text-base font-semibold">App Store</p>
            </div>
        </div>
    </a>
);

const GooglePlayButton = () => (
    <a href="#" className="inline-block bg-black text-white rounded-lg px-3 py-2 transition-transform hover:scale-105 w-full">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 2.992l9.84-5.682a.6.6 0 01.91 0l9.84 5.682a.6.6 0 01.305.52v11.376a.6.6 0 01-.305.52l-9.84 5.682a.6.6 0 01-.91 0L3.055 20.94a.6.6 0 01-.305-.52V3.512a.6.6 0 01.305-.52z" stroke="none" fill="currentColor" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 4.5l6 3.465 6-3.465" stroke="#000" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 7.965v8.07" stroke="#000" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12l6 3.465 6-3.465" stroke="#000" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 15.465l-6-3.465" stroke="#000" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12l-6 3.465" stroke="#000" />
            </svg>
            <div>
                <p className="text-xs">GET IT ON</p>
                <p className="text-base font-semibold">Google Play</p>
            </div>
        </div>
    </a>
);

const FooterLink = ({ href, children, isHardLink = false }: { href: string; children: React.ReactNode, isHardLink?: boolean }) => {
    const linkContent = <span className="hover:text-primary transition-colors text-sm">{children}</span>;
    return (
        <li>
            {isHardLink ? (
                <a href={href}>{linkContent}</a>
            ) : (
                <Link href={href}>{linkContent}</Link>
            )}
        </li>
    );
};

const Footer = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {/* Explore */}
              <div className="space-y-4">
                  <h3 className="font-bold text-white text-base">Explore</h3>
                  <ul className="space-y-2">
                      <FooterLink href="/destinations" isHardLink={true}>Destinations</FooterLink>
                      <FooterLink href="/search">Experiences</FooterLink>
                      <FooterLink href="/excursions/top-searched">Top Experiences</FooterLink>
                      <FooterLink href="#">Hotels</FooterLink>
                      <FooterLink href="#">Flights</FooterLink>
                      <FooterLink href="#">Travel Deals</FooterLink>
                  </ul>
              </div>
              {/* Company */}
              <div className="space-y-4">
                  <h3 className="font-bold text-white text-base">Company</h3>
                  <ul className="space-y-2">
                      <FooterLink href="#">About Us</FooterLink>
                      <FooterLink href="#">Careers</FooterLink>
                      <FooterLink href="#">Press</FooterLink>
                      <FooterLink href="#">Blog</FooterLink>
                  </ul>
              </div>
              {/* Support */}
              <div className="space-y-4">
                  <h3 className="font-bold text-white text-base">Support</h3>
                  <ul className="space-y-2">
                      <FooterLink href="#">Help Center</FooterLink>
                      <FooterLink href="#">Contact Us</FooterLink>
                      <FooterLink href="#">FAQs</FooterLink>
                      <FooterLink href="/booking/lookup">Find My Booking</FooterLink>
                      <FooterLink href="/admin">Admin</FooterLink>
                  </ul>
              </div>
              {/* Partnerships */}
              <div className="space-y-4">
                  <h3 className="font-bold text-white text-base">Partnerships</h3>
                  <ul className="space-y-2">
                      <FooterLink href="#">Become a Partner</FooterLink>
                      <FooterLink href="#">Affiliates</FooterLink>
                      <FooterLink href="#">Advertise</FooterLink>
                  </ul>
              </div>

              {/* App & Language */}
              <div className="col-span-2 space-y-6">
                  <div>
                      <h3 className="font-bold text-white text-base mb-4">Get the App</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <AppStoreButton />
                        <GooglePlayButton />
                      </div>
                  </div>

                  <div>
                      <Button 
                          variant="outline"
                          onClick={() => setIsSettingsModalOpen(true)}
                          className="bg-gray-700 border-gray-600 text-white w-full max-w-xs hover:bg-gray-600 hover:text-white"
                      >
                           <Globe className="mr-2 h-4 w-4" />
                           <span>Language & Currency</span>
                      </Button>
                  </div>
              </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                  <Link href="/" className="flex items-center justify-center md:justify-start gap-2 text-2xl font-bold text-white mb-2">
                      AAFare
                  </Link>
                  <p className="text-sm">&copy; {new Date().getFullYear()} AAFare. All rights reserved.</p>
              </div>
              <div className="flex items-center space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white"><Facebook className="h-5 w-5" /></Link>
                  <Link href="#" className="text-gray-400 hover:text-white"><Twitter className="h-5 w-5" /></Link>
                  <Link href="#" className="text-gray-400 hover:text-white"><Instagram className="h-5 w-5" /></Link>
                  <Link href="#" className="text-gray-400 hover:text-white"><Linkedin className="h-5 w-5" /></Link>
                  <Link href="#" className="text-gray-400 hover:text-white"><Youtube className="h-5 w-5" /></Link>
              </div>
          </div>
        </div>
      </footer>
      <SettingsModal isOpen={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen} />
    </>
  );
};

export default Footer;
