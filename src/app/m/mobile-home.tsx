'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building,
  CarTaxiFront,
  ChevronRight,
  Compass,
  Heart,
  Hotel,
  Menu,
  Plane,
  Ticket,
  User,
} from 'lucide-react';
import { LanguageProvider, useT } from '@/components/language-provider';
import { ActivitiesSearchForm } from '@/components/hero-search-widget';
import { StaysSearchBar } from '@/components/stays-search-bar';
import { FlightsSearchWidget } from '@/components/flights-search-widget';
import { AGODA_DESTINATIONS } from '@/lib/agoda-catalog';
import AttractionListingSection from '@/app/attraction-listing';
import Footer from '@/components/footer';
import type { Excursion } from '@/types';
import type { HomePageData } from '@/lib/home-data';

type TabKey = 'activities' | 'stays' | 'flights' | 'transfers';

const TABS: { key: TabKey; label: string; icon: typeof Hotel }[] = [
  { key: 'activities', label: 'Activities', icon: Ticket },
  { key: 'stays', label: 'Stays', icon: Hotel },
  { key: 'flights', label: 'Flights', icon: Plane },
  { key: 'transfers', label: 'Transfers', icon: CarTaxiFront },
];

const GIFT_CARDS = [
  {
    icon: Building,
    title: 'Up to 10% off (App)',
    subtitle: 'First hotel booking',
    action: 'Collect',
    arrow: false,
  },
  {
    icon: Plane,
    title: 'Up to 8% off Flights',
    subtitle: 'First flight booking',
    action: '',
    arrow: true,
  },
];

const BOTTOM_NAV = [
  { key: 'discover', label: 'Discover', icon: Compass },
  { key: 'tickets', label: 'Tickets', icon: Ticket },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'profile', label: 'Profile', icon: User },
] as const;

type NavKey = (typeof BOTTOM_NAV)[number]['key'];

const TARGET_CITIES = [
  'Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam',
  'Singapore', 'Kuala Lumpur', 'Bangkok',
];

const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
};

/** Desktop homepage sections, translated via the language provider. */
function DesktopSections({
  featuredExcursions,
  featuredTitle,
  featuredCities,
  cityImages,
  worldwideExcursions,
  topCityExcursions,
  topCityName,
  homePageData,
}: {
  featuredExcursions: Excursion[];
  featuredTitle: string;
  featuredCities: string[];
  cityImages: Map<string, string>;
  worldwideExcursions: Excursion[];
  topCityExcursions: Excursion[];
  topCityName: string;
  homePageData: Excursion[];
}) {
  const t = useT();

  return (
    <>
      {/* HeroSection is skipped on mobile — the teal
          tab/search hero above is the mobile hero. */}
      <AttractionListingSection
        title={featuredTitle}
        excursions={featuredExcursions}
        showTabs
        maxTabs={5}
        tabType="city"
        tabs={featuredCities}
        cityImages={cityImages}
        nativeScroll
        panel
      />
      <AttractionListingSection
        title={t('home.bestPlacesWorldwide')}
        excursions={worldwideExcursions}
        showTabs
        tabType="city"
        tabs={TARGET_CITIES}
        cityImages={cityImages}
        nativeScroll
        panel
      />
      <AttractionListingSection
        title={t('home.topThingsInCity', { city: topCityName })}
        excursions={topCityExcursions}
        layout="carousel"
        showViewAllButton={false}
        showTabs={false}
        nativeScroll
        panel
      />
      <AttractionListingSection
        title={t('home.mostPopular')}
        excursions={homePageData}
        layout="grid"
        showViewAllButton={false}
        showTabs={false}
        tabType="city"
        nativeScroll
        panel
      />
      {/* PopularPlacesSection is hidden on mobile. */}
    </>
  );
}

interface MobileHomeProps extends HomePageData {
  /** Show the bottom nav only for signed-in visitors. */
  isLoggedIn?: boolean;
}

export default function MobileHome({
  allExcursions,
  topRatedExcursions,
  featuredExcursions,
  featuredTitle,
  featuredCities,
  cityImages,
  worldwideExcursions,
  topCityExcursions,
  topCityName,
  language,
  isLoggedIn = false,
}: MobileHomeProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>('activities');
  const [activeNav, setActiveNav] = useState<NavKey>('discover');
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFading, setSplashFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFading(true), 1200);
    const hideTimer = setTimeout(() => setSplashVisible(false), 1700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const homePageData = useMemo(() => {
    const shuffledExcursions = [...allExcursions].sort(
      (a, b) => simpleHash(a.id) - simpleHash(b.id),
    );
    return shuffledExcursions.slice(0, 10);
  }, [allExcursions]);

  return (
    <div className={`min-h-screen bg-[#F4F6FA] ${isLoggedIn ? 'pb-24' : 'pb-6'}`}>
      {/* Splash screen — logo centred, fades out on load */}
      {splashVisible && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center bg-white transition-opacity duration-500 ${
            splashFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img src="/aafare-logo.png" alt="AAFare" className="h-32 w-32" />
        </div>
      )}

      {/* Top header */}
      <header className="flex items-center justify-between border-b border-[#F0F2F5] bg-white px-[18px] py-3.5">
        <div className="flex items-center gap-2">
          <img src="/aafare-logo.png" alt="AAFare" className="h-9 w-auto" />
          <span className="flex flex-col justify-center leading-none">
            <span className="text-lg font-bold text-[#5392F9]">AAFare</span>
            <span className="-mt-[2px] text-lg font-bold text-[#5C6B85]">
              International
            </span>
          </span>
        </div>
        <button className="p-1" aria-label="Menu">
          <Menu className="h-6 w-6 text-[#1A2B49]" />
        </button>
      </header>

      {/* Teal hero with tabs + search */}
      <section className="bg-gradient-to-b from-[#0FA0C4] to-[#0D94B5] px-3.5 pb-10 pt-5 text-white">
        {/* Tab cards */}
        <div className="mb-3.5 grid grid-cols-4 gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  // Transfers gets its own full page, same as desktop.
                  if (tab.key === 'transfers') {
                    router.push('/transfers');
                    return;
                  }
                  setActiveTab(tab.key);
                }}
                className={`flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-[10px] px-1.5 py-3.5 text-center transition-colors ${
                  active
                    ? 'bg-white text-[#5392F9] shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Icon className="h-[26px] w-[26px]" strokeWidth={active ? 2.4 : 2} />
                <span
                  className={`text-[13px] leading-tight ${
                    active ? 'font-bold' : 'font-semibold'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search card — the desktop form per tab */}
        <div className="rounded-[14px] bg-[#F5F6F8] p-3 text-[#1A2B49] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          {activeTab === 'activities' && <ActivitiesSearchForm compact />}

          {activeTab === 'stays' && (
            <StaysSearchBar
              destinations={AGODA_DESTINATIONS}
              defaultDestination=""
              defaultCheckIn={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
              defaultCheckOut={new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10)}
              defaultAdults={2}
              defaultChildren={0}
            />
          )}

          {activeTab === 'flights' && <FlightsSearchWidget />}
        </div>
      </section>

      {/* Welcome gift pack — separate panel below the hero */}
      <section className="px-3.5 pt-8">
        <div className="rounded-2xl bg-[#0E8FB0] px-4 py-5">
          <div className="mb-4 flex items-center gap-2.5">
            <h2 className="text-[22px] font-extrabold leading-tight text-white">
              Welcome gift pack!
            </h2>
            <span className="rounded bg-[#E23F3F] px-2 py-[3px] text-[11px] font-bold uppercase tracking-[0.3px] text-white">
              New
            </span>
          </div>
          <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GIFT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                className="flex min-w-[280px] shrink-0 snap-start items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-left transition-transform hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F4FF] text-[#5392F9]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold leading-snug text-[#1A2B49]">
                    {card.title}
                  </div>
                  <div className="text-xs leading-snug text-[#5C6B85]">{card.subtitle}</div>
                </div>
                {card.action && (
                  <span className="shrink-0 py-1.5 text-[13px] font-bold text-[#5392F9]">
                    {card.action}
                  </span>
                )}
                {card.arrow && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F0F4FF] text-[#5392F9]">
                    <ChevronRight className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        </div>
      </section>

      {/* All desktop homepage sections */}
      <LanguageProvider language={language}>
        <DesktopSections
          featuredExcursions={featuredExcursions}
          featuredTitle={featuredTitle}
          featuredCities={featuredCities}
          cityImages={cityImages}
          worldwideExcursions={worldwideExcursions}
          topCityExcursions={topCityExcursions}
          topCityName={topCityName}
          homePageData={homePageData}
        />
      </LanguageProvider>

      {/* Footer — desktop footer in a rounded panel */}
      <section className="px-3.5 pt-5">
        <div className="overflow-hidden rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
          <Footer />
        </div>
      </section>

      {/* Fixed bottom navigation — signed-in visitors only */}
      {isLoggedIn && (
      <nav className="fixed bottom-0 left-0 right-0 z-[110] flex border-t border-[#E4E9F2] bg-white">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          const active = item.key === activeNav;
          return (
            <button
              key={item.key}
              onClick={() => setActiveNav(item.key)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 ${
                active ? 'text-[#5392F9]' : 'text-[#8B96A8]'
              }`}
            >
              <Icon
                className="h-6 w-6"
                fill={item.key === 'wishlist' && active ? '#5392F9' : 'none'}
                strokeWidth={active ? 2.4 : 2}
              />
              <span
                className={`text-[10px] leading-tight ${
                  active ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
      )}
    </div>
  );
}
