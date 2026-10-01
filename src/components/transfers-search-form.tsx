'use client';

/**
 * Airport-transfer search form, used on /transfers when the site is running in
 * `api` mode. Renders the results beneath the form, on the same page.
 *
 * Field set follows Intui's transfer API: an IATA airport code, a destination
 * (name plus address, or EAN id / GPS once those are available), a pick-up leg,
 * an optional return leg, and separate adult, child and infant counts.
 */

import { useEffect, useState } from 'react';
import { ArrowLeftRight, CalendarDays, Clock, MapPin, Search, Users } from 'lucide-react';
import { TransfersResults } from '@/components/transfers-results';
import { useT } from '@/components/language-provider';
import { cn } from '@/lib/utils';
import type { TransferQuery } from '@/lib/intui-transfers';

const IATA = /^[A-Z]{3}$/;

export function TransfersSearchForm() {
  const t = useT();
  const [query, setQuery] = useState<TransferQuery | null>(null);
  const [error, setError] = useState(false);

  const [airport, setAirport] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('10:00');
  const [pax, setPax] = useState('2-0-0');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(false);

    const code = airport.trim().toUpperCase();
    if (!IATA.test(code) || !pickupDate) {
      setError(true);
      return;
    }

    const [adults, children, infants] = pax.split('-').map(Number);
    const name = hotelName.trim();
    const address = hotelAddress.trim();

    setQuery({
      airportCode: code,
      arrivalDate: pickupDate,
      arrivalTime: pickupTime,
      adults,
      children,
      infants,
      ...(tripType === 'roundtrip' && returnDate
        ? { departureDate: returnDate, departureTime: returnTime }
        : {}),
      ...(name && address ? { hotelName: name, hotelAddress: address } : {}),
    });
  };

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-2.5">
        <div className="flex items-stretch gap-2.5 max-lg:flex-wrap">
          <TripTypeField
            value={tripType}
            onChange={setTripType}
            labels={{
              label: t('search.tripType'),
              oneway: t('search.oneWay'),
              roundtrip: t('search.roundTrip'),
            }}
          />
          <TextField
            icon={MapPin}
            label={t('search.airportCode')}
            value={airport}
            placeholder="DXB"
            onChange={(value) => setAirport(value.toUpperCase())}
            invalid={error}
            grow="flex-1-5"
          />
          <TextField
            icon={MapPin}
            label={t('search.hotelName')}
            value={hotelName}
            placeholder={t('search.hotelNamePlaceholder')}
            onChange={setHotelName}
            grow="flex-1-5"
          />
          <TextField
            icon={MapPin}
            label={t('search.hotelAddress')}
            value={hotelAddress}
            placeholder={t('search.hotelAddressPlaceholder')}
            onChange={setHotelAddress}
            grow="flex-1-5"
          />
        </div>

        <div className="flex items-stretch gap-2.5 max-lg:flex-wrap">
          <DateField label={t('search.pickupDate')} value={pickupDate} onChange={setPickupDate} invalid={error} />
          <TimeField label={t('search.pickupTime')} value={pickupTime} onChange={setPickupTime} />
          {tripType === 'roundtrip' && (
            <>
              <DateField label={t('search.returnDate')} value={returnDate} onChange={setReturnDate} />
              <TimeField label={t('search.returnTime')} value={returnTime} onChange={setReturnTime} />
            </>
          )}
          <SelectField
            value={pax}
            onChange={setPax}
            grow="flex-1"
            options={[
              { value: '1-0-0', label: t('search.pax1') },
              { value: '2-0-0', label: t('search.pax2') },
              { value: '2-1-0', label: t('search.pax21') },
              { value: '3-1-0', label: t('search.pax31') },
              { value: '4-0-0', label: t('search.pax4') },
              { value: '4-2-0', label: t('search.pax42') },
              { value: '5-1-1', label: t('search.pax511') },
            ]}
          />
          <button
            type="submit"
            className="flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-[10px] bg-primary px-7 text-[15px] font-bold tracking-[-0.2px] text-white transition-colors hover:bg-primary/90 max-lg:basis-full"
          >
            <Search className="h-[13px] w-[13px]" aria-hidden />
            {t('search.submit')}
          </button>
        </div>

        {error && (
          <p role="alert" className="text-[13px] text-red-600">
            {t('search.transfersFormInvalid')}
          </p>
        )}
      </form>

      {query && (
        <div className="mt-7">
          <TransfersResults query={query} onEditSearch={() => setQuery(null)} />
        </div>
      )}
    </div>
  );
}

function Shell({
  children,
  grow,
}: {
  children: React.ReactNode;
  grow?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-[46px] items-center gap-2.5 rounded-[8px] bg-slate-50 px-3',
        grow ?? 'flex-1',
      )}
    >
      {children}
    </div>
  );
}

function TextField({
  icon: Icon,
  label,
  value,
  placeholder,
  onChange,
  grow,
  invalid,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  grow?: string;
  invalid?: boolean;
}) {
  return (
    <Shell grow={grow}>
      <Icon className="h-[17px] w-5 shrink-0 text-slate-800" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-slate-500">
          {label}
        </span>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          aria-invalid={invalid || undefined}
          className="w-full truncate bg-transparent p-0 text-[15px] font-semibold leading-tight tracking-[-0.2px] text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
        />
      </div>
    </Shell>
  );
}

function DateField({
  label,
  value,
  onChange,
  invalid,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  return (
    <Shell>
      <CalendarDays className="h-[17px] w-5 shrink-0 text-slate-800" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-slate-500">
          {label}
        </span>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          aria-invalid={invalid || undefined}
          className="w-full truncate bg-transparent p-0 text-[15px] font-semibold leading-tight tracking-[-0.2px] text-slate-900 outline-none"
        />
      </div>
    </Shell>
  );
}

function TimeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Shell grow="w-[104px] shrink-0">
      <Clock className="h-[17px] w-5 shrink-0 text-slate-800" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-slate-500">
          {label}
        </span>
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="w-full truncate bg-transparent p-0 text-[15px] font-semibold leading-tight tracking-[-0.2px] text-slate-900 outline-none"
        />
      </div>
    </Shell>
  );
}

function SelectField({
  value,
  onChange,
  options,
  grow,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  grow?: string;
}) {
  const t = useT();
  return (
    <Shell grow={grow}>
      <Users className="h-[17px] w-5 shrink-0 text-slate-800" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-slate-500">
          {t('search.travelers')}
        </span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={t('search.travelers')}
          className="w-full cursor-pointer truncate appearance-none bg-transparent p-0 text-[15px] font-semibold leading-tight tracking-[-0.2px] text-slate-900 outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </Shell>
  );
}

function TripTypeField({
  value,
  onChange,
  labels,
}: {
  value: 'oneway' | 'roundtrip';
  onChange: (value: 'oneway' | 'roundtrip') => void;
  labels: { oneway: string; roundtrip: string; label: string };
}) {
  return (
    <div className="flex min-h-[46px] shrink-0 items-center gap-2.5 rounded-[8px] bg-slate-50 px-3">
      <ArrowLeftRight className="h-[17px] w-5 shrink-0 text-slate-800" aria-hidden />
      <div className="flex min-w-0 flex-col">
        <span className="mb-1 text-[11px] font-medium leading-tight tracking-[0.2px] text-slate-500">
          {labels.label}
        </span>
        <div role="radiogroup" aria-label={labels.label} className="flex items-center gap-1">
          {(['oneway', 'roundtrip'] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={value === option}
              onClick={() => onChange(option)}
              className={cn(
                'rounded-full px-2.5 py-0.5 text-[13px] font-semibold transition',
                value === option
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-white',
              )}
            >
              {labels[option]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
