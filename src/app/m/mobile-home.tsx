'use client';

import { useState } from 'react';
import {
  Building,
  Calendar,
  Car,
  CarTaxiFront,
  ChevronRight,
  Hotel,
  Menu,
  Plane,
  PlaneTakeoff,
  Search,
  Smartphone,
  Star,
  Tag,
  Ticket,
  User,
  X,
} from 'lucide-react';

const LOGO_DOTS = ['#F5A623', '#E23F3F', '#7B68EE', '#2E9C6C', '#5392F9'];

type TabKey = 'hotels' | 'flightHotel' | 'flights' | 'activities';

const TABS: { key: TabKey; label: string; icon: typeof Hotel }[] = [
  { key: 'hotels', label: 'Hotels', icon: Hotel },
  { key: 'flightHotel', label: 'Flight + Hotel', icon: PlaneTakeoff },
  { key: 'flights', label: 'Flights', icon: Plane },
  { key: 'activities', label: 'Activities', icon: Ticket },
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

const EXPLORE_ITEMS = [
  { icon: Smartphone, label: 'eSIM' },
  { icon: CarTaxiFront, label: 'Airport Transfer' },
  { icon: Car, label: 'Car Rental' },
];

export default function MobileHome() {
  const [activeTab, setActiveTab] = useState<TabKey>('hotels');
  const [destination, setDestination] = useState('');
  const [couponVisible, setCouponVisible] = useState(true);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Top header */}
      <header className="flex items-center justify-between border-b border-[#F0F2F5] bg-white px-[18px] py-3.5">
        <div className="w-8" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[20px] font-extrabold leading-none tracking-[-0.5px] text-[#1A2B49]">
            AAFare
          </span>
          <div className="flex gap-[3px]">
            {LOGO_DOTS.map((color) => (
              <span
                key={color}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <button className="p-1" aria-label="Menu">
          <Menu className="h-6 w-6 text-[#1A2B49]" />
        </button>
      </header>

      {/* Teal hero with tabs + search */}
      <section className="bg-gradient-to-b from-[#0FA0C4] to-[#0D94B5] px-3.5 pb-10 pt-5 text-white">
        {/* VIP / Platinum badge */}
        <div className="mb-[18px] flex justify-center">
          <div className="flex overflow-hidden rounded text-xs font-bold uppercase tracking-[0.5px] shadow-md">
            <div className="flex items-center gap-[5px] bg-[#0F172A] px-2.5 py-[5px] text-white">
              <Star className="h-[11px] w-[11px]" fill="#FFD700" strokeWidth={0} />
              VIP
            </div>
            <div className="bg-[#7B68EE] px-3 py-[5px] font-semibold text-white">
              Platinum
            </div>
          </div>
        </div>

        {/* Tab cards */}
        <div className="mb-3.5 grid grid-cols-4 gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
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

        {/* Search card */}
        <div className="rounded-[14px] bg-white p-3.5 text-[#1A2B49] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          <div className="mb-2.5 flex items-center gap-3 rounded-[10px] border-[1.5px] border-[#5392F9] px-4 py-4">
            <Search className="h-[17px] w-[17px] shrink-0 text-[#5C6B85]" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where would you like to go?"
              className="min-w-0 flex-1 text-[15px] text-[#1A2B49] outline-none placeholder:text-[#8B96A8]"
            />
          </div>

          <div className="mb-2.5 grid grid-cols-2 overflow-hidden rounded-[10px] border-[1.5px] border-[#E4E9F2] bg-white">
            <button className="flex items-center gap-2.5 px-3.5 py-3 hover:bg-[#FAFCFF]">
              <Calendar className="h-[18px] w-[18px] shrink-0 text-[#1A2B49]" />
              <div className="min-w-0 flex-1 text-left">
                <div className="text-xs leading-tight text-[#5C6B85]">Check-in</div>
                <div className="text-base font-bold leading-tight text-[#5392F9]">
                  Sun, Oct 4
                </div>
              </div>
            </button>
            <button className="flex items-center gap-2.5 border-l border-[#E4E9F2] px-3.5 py-3 hover:bg-[#FAFCFF]">
              <Calendar className="h-[18px] w-[18px] shrink-0 text-[#1A2B49]" />
              <div className="min-w-0 flex-1 text-left">
                <div className="text-xs leading-tight text-[#5C6B85]">Check-out</div>
                <div className="text-base font-bold leading-tight text-[#5392F9]">
                  Mon, Oct 5
                </div>
              </div>
            </button>
          </div>

          <button className="mb-3.5 flex items-center gap-3 rounded-[10px] border-[1.5px] border-[#E4E9F2] px-4 py-3.5 text-left hover:border-[#CBD5E0]">
            <User className="h-[18px] w-[18px] shrink-0 text-[#1A2B49]" />
            <span className="min-w-0 flex-1 text-[15px] font-medium text-[#1A2B49]">
              <span className="font-bold text-[#5392F9]">1</span> Room,{' '}
              <span className="font-bold text-[#5392F9]">2</span> Adults,{' '}
              <span className="font-bold text-[#5392F9]">0</span> Children
            </span>
          </button>

          <button className="w-full rounded-[10px] bg-[#5392F9] py-4 text-center text-base font-bold uppercase tracking-[0.6px] text-white shadow-[0_4px_12px_rgba(83,146,249,0.3)] transition-colors hover:bg-[#3B78E0] active:scale-[0.99]">
            Search
          </button>
        </div>
      </section>

      {/* Welcome gift pack */}
      <section className="bg-[#0E8FB0] px-3.5 pb-24 pt-6">
        <div className="mb-4 flex items-center gap-2.5">
          <h2 className="text-[22px] font-extrabold leading-tight text-white">
            Welcome gift pack!
          </h2>
          <span className="rounded bg-[#E23F3F] px-2 py-[3px] text-[11px] font-bold uppercase tracking-[0.3px] text-white">
            New
          </span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GIFT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                className="flex min-w-[280px] shrink-0 items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-left transition-transform hover:-translate-y-0.5"
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
      </section>

      {/* Explore more */}
      <section className="bg-[#0E8FB0] px-3.5 pb-10 pt-4">
        <h3 className="mb-3.5 text-center text-[15px] font-semibold text-white">
          Explore more
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {EXPLORE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-[10px] bg-black/25 px-1.5 py-3.5 transition-colors hover:bg-black/35"
              >
                <Icon className="h-[22px] w-[22px] text-white" />
                <span className="text-center text-xs font-semibold leading-tight text-white">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <a href="/?desktop=1" className="text-xs font-semibold text-white/80 underline">
            View desktop site
          </a>
        </div>
      </section>

      {/* Fixed bottom coupon bar */}
      {couponVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex items-center gap-3 border-t border-[#E4E9F2] bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)]">
          <button className="shrink-0 p-1" onClick={() => setCouponVisible(false)} aria-label="Close">
            <X className="h-[18px] w-[18px] text-[#5C6B85]" />
          </button>
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#E23F3F] text-white">
            <Tag className="h-[15px] w-[15px]" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#E23F3F]" />
          </div>
          <span className="min-w-0 flex-1 text-sm font-bold leading-snug text-[#1A2B49]">
            Find Coupons &amp; Deals
          </span>
          <button className="shrink-0 rounded-full border-[1.5px] border-[#E4E9F2] bg-white px-4 py-2 text-[13px] font-bold text-[#5392F9] transition-colors hover:border-[#5392F9] hover:bg-[#F0F4FF]">
            View all
          </button>
        </div>
      )}
    </div>
  );
}
