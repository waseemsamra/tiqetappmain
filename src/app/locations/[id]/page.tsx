import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Star } from 'lucide-react';

async function getLocation(id: string) {
  const res = await fetch(`https://api.tiqets.com/v2/locations/${id}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'my user agent',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  const data = await res.json();
  if (!data.success || !data.location) return null;
  return data.location;
}

async function getLocationExperiences(locationId: string) {
  const res = await fetch(`https://api.tiqets.com/v2/experiences?location_id=${locationId}&page_size=20`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'my user agent',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.experiences || data.products || data.items || [];
}

interface LocationPageProps {
  params: { id: string };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const [location, experiences] = await Promise.all([
    getLocation(params.id),
    getLocationExperiences(params.id),
  ]);

  if (!location) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {location.images && location.images[0] && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={location.images[0]}
                alt={location.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {location.name}
            </h1>

            {location.description && (
              <p className="text-lg text-gray-600 mb-6">
                {location.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              {location.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {location.city}, {location.country || ''}
                </span>
              )}
              {location.rating && (
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  {location.rating} ({location.reviewsTotal || 0} reviews)
                </span>
              )}
            </div>

            {experiences.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Experiences at this location
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experiences.slice(0, 12).map((exp: any) => (
                    <Link
                      key={exp.id}
                      href={`/excursions/${exp.id}`}
                      className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {exp.images && exp.images[0] && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={exp.images[0]}
                            alt={exp.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">
                          {exp.name}
                        </h3>
                        {exp.price && (
                          <p className="text-primary font-semibold">
                            €{Number(exp.price).toFixed(2)}
                          </p>
                        )}
                        {exp.rating && (
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{exp.rating}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
