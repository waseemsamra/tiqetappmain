import { notFound } from 'next/navigation';
import { fetchTiqetsProducts } from '@/lib/tiqets-api';
import { CITY_CATEGORIES, COUNTRY_CITIES } from '@/lib/city-categories';
import {
  CATEGORY_TYPE_IDS,
  categoryName,
  categorySlug,
  categorySlugByTypeId,
} from '@/lib/category-pages';
import CategoryPageClient from './category-page-client';
import type { Excursion } from '@/types';

export const revalidate = 3600;

export default async function CategoryPage({
  params,
}: {
  params: { cityName: string; categorySlug: string };
}) {
  const cityName = decodeURIComponent(params.cityName);
  const slug = decodeURIComponent(params.categorySlug);
  const typeId = CATEGORY_TYPE_IDS[slug];
  const cityKey = cityName.toLowerCase();
  const cityData = CITY_CATEGORIES[cityKey];

  if (!typeId || !cityData) {
    return notFound();
  }

  const category = categoryName(slug);

  // A category page is the city's products filtered by
  // the type id every product carries in its tag_ids.
  const cityExcursions: Excursion[] = await fetchTiqetsProducts({
    city_name: cityName,
  });

  const products = cityExcursions.filter((ex) =>
    (ex.tag_ids || []).includes(typeId),
  );

  if (products.length === 0) {
    return notFound();
  }

  // Per-category product counts, for the pills row and
  // the "More Site & Attractions" tiles.
  const counts = new Map<string, number>();
  for (const ex of cityExcursions) {
    for (const tag of ex.tag_ids || []) {
      const tagSlug = categorySlugByTypeId(tag);
      if (tagSlug) counts.set(tagSlug, (counts.get(tagSlug) || 0) + 1);
    }
  }

  const heroImage =
    cityData.categories.find((c) => categorySlug(c.name) === slug)?.image ||
    cityData.categories[0]?.image ||
    products[0]?.images?.[0] ||
    '';

  const related = [
    ...cityData.categories,
    ...cityData.interests,
  ]
    .filter((c) => categorySlug(c.name) !== slug)
    .map((c) => ({
      name: c.name,
      image: c.image,
      slug: categorySlug(c.name),
      count: counts.get(categorySlug(c.name)) || 0,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  const countryName =
    products[0]?.country || cityExcursions[0]?.country || '';
  const cities = COUNTRY_CITIES[countryName.toLowerCase()] || [];

  return (
    <CategoryPageClient
      cityName={cityName}
      countryName={countryName}
      category={category}
      slug={slug}
      heroImage={heroImage}
      products={products}
      relatedCategories={related}
      cities={cities}
    />
  );
}
