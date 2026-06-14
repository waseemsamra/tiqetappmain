export const PopularAttractionCard = ({ excursion, user, isInitialWishlisted }: { excursion: Excursion, user: User | null, isInitialWishlisted?: boolean }) => (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group h-full">
        <Link href={`/excursions/${excursion.id}`} className="block h-full flex flex-col">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl">
                {excursion.images?.[0] && excursion.images?.[0].length > 0 && (
                    <Image 
                      src={excursion.images?.[0]} 
                      alt={excursion.name} 
                      fill 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
                      data-ai-hint="attraction"
                      unoptimized
                    />
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{excursion.city}</p>
                <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">{excursion.name}</h3>
                <p className="mt-1 text-sm text-gray-600 flex-grow line-clamp-2">{excursion.description}</p>
                 
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <StarRating rating={excursion.rating} />
                    <div className="text-right">
                        <span className="text-xs text-gray-500">From</span>
                        <p className="font-bold text-lg text-gray-900">\${excursion.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </Link>
    </div>
);
