'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const POIS = [
  {
    id: '245524',
    name: 'Dubai Marina',
    description: 'Waterfront dining, yacht rides and canal walks.',
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 36,
    url: '/locations/245524',
  },
  {
    id: '145633',
    name: 'Jumeirah Mosque in Dubai',
    description: 'Iconic mosque and cultural landmark.',
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 8,
    url: '/locations/145633',
  },
  {
    id: '245524',
    name: 'Jumeirah Beach (JBR Beach) in Dubai',
    description: 'Public beach with water sports and beachfront dining.',
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 8,
    url: '/locations/245524',
  },
  {
    id: '250293',
    name: 'AURA SKYPOOL in Dubai',
    description: "World's highest infinity pool with panoramic views.",
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 6,
    url: '/locations/250293',
  },
  {
    id: '233588',
    name: 'Mall of the Emirates in Dubai',
    description: 'Award-winning mall with Ski Dubai and entertainment.',
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 5,
    url: '/locations/233588',
  },
  {
    id: '168349',
    name: 'Riverland Dubai in Dubai',
    description: 'Dining and entertainment district at the heart of Dubai Parks and Resorts.',
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 4,
    url: '/locations/168349',
  },
  {
    id: '245525',
    name: 'Kite Beach',
    description: 'Popular beach with kite surfing, food trucks and art.',
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 4,
    url: '/locations/245525',
  },
  {
    id: '233613',
    name: 'Souk Madinat Jumeirah in Dubai',
    description: 'Traditional souk with canals, dining and views of Burj Al Arab.',
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 3,
    url: '/locations/233613',
  },
  {
    id: '',
    name: 'Wafi City',
    description: 'Luxury mall with nightlife and wellness.',
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 3,
    url: '#',
  },
  {
    id: '245525',
    name: 'Marina Beach in Dubai',
    description: 'Beachfront promenade with dining and water sports.',
    image: 'https://cdn.tiqets.com/images/placeholder-location.jpg',
    experienceCount: 3,
    url: '/locations/245525',
  },
];

const Card = ({ poi }: { poi: typeof POIS[number] }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={poi.url} className="block">
      <div className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group h-full bg-white relative border border-gray-200/80 flex flex-col">
        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
          {!imgError ? (
            <Image
              src={poi.image}
              alt={poi.name}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="location"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-white font-bold text-sm text-center px-2">{poi.name}</span>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-base font-bold text-gray-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">{poi.name}</h3>
          {poi.experienceCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">{poi.experienceCount} experiences</p>
          )}
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{poi.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default function PointOfInterestSection() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-8">Point of Interest in Dubai</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {POIS.map((poi) => (
          <div key={poi.id} className="h-full">
            <Card poi={poi} />
          </div>
        ))}
      </div>
    </section>
  );
}
