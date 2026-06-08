
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import type { Excursion, ExcursionType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        ))}
        <span className="text-sm font-bold text-gray-800">{rating.toFixed(1)}</span>
    </div>
);


export const ExcursionListCard = ({ excursion, wishlistButton }: { excursion: Excursion, wishlistButton?: React.ReactNode | null }) => {
    const typeName = excursion.excursionType?.name || 'Excursion';
    const cityName = excursion.city || 'Unknown City';
    const countryName = excursion.country || 'Unknown Country';
    
    return (
        <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group relative">
             {wishlistButton && (
                <div className="absolute top-3 right-3 z-10">
                    {wishlistButton}
                </div>
            )}
            <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3 aspect-video md:aspect-auto">
                    <Link href={`/excursions/${excursion.id}`} className="block h-full w-full">
                        <Image
                            src={excursion.images?.[0] || 'https://placehold.co/400x300.png'}
                            alt={excursion.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint="attraction"
                        />
                    </Link>
                </div>
                <div className="flex flex-col flex-grow p-4 md:w-2/3">
                    <Link href={`/excursions/${excursion.id}`} className="block flex-grow">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{typeName}</p>
                        <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors mt-1 line-clamp-2">{excursion.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {cityName}, {countryName}
                        </p>
                    </Link>
                    <div className="mt-auto pt-4 flex items-end justify-between">
                        <StarRating rating={excursion.rating} />
                        <div className="text-right">
                            <span className="text-xs text-gray-500">From</span>
                            <p className="font-bold text-2xl text-gray-900">${excursion.price.toFixed(2)}</p>
                            <Button asChild size="sm" className="mt-2">
                                <Link href={`/excursions/${excursion.id}`}>View Details</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
