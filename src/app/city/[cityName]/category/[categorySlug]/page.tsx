import { notFound } from 'next/navigation';
import { fetchTiqetsCityProducts } from '@/lib/tiqets-api';
import { CITY_CATEGORIES } from '@/lib/city-categories';
import { COUNTRY_CITIES } from '@/lib/agoda-catalog';
import { CITY_SUBCATEGORIES } from '@/lib/city-subcategories';
import {
  CATEGORY_TYPE_IDS,
  categoryName,
  categorySlug,
  categorySlugByTypeId,
} from '@/lib/category-pages';
import { imageUrlFor } from '@/lib/tiqets-image';
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
  // The raw /products listing keeps variant products,
  // which is how Tiqets counts its own category pages.
  const cityProducts: Excursion[] = await fetchTiqetsCityProducts(cityName);

  const products = cityProducts.filter((ex) =>
    (ex.tag_ids || []).includes(typeId),
  );

  if (products.length === 0) {
    return notFound();
  }

  // Per-category product counts, for the pill row and
  // the "More Site & Attractions" tiles.
  const counts = new Map<string, number>();
  for (const ex of cityProducts) {
    for (const tag of ex.tag_ids || []) {
      const tagSlug = categorySlugByTypeId(tag);
      if (tagSlug) counts.set(tagSlug, (counts.get(tagSlug) || 0) + 1);
    }
  }

  const topLevelNames = [...cityData.categories, ...cityData.interests];
  const isTopLevel = topLevelNames.some((c) => categorySlug(c.name) === slug);

  // Subcategory pills Tiqets shows for this city+category
  // (extracted from tiqets.com — the set differs per city).
  const subcategories = CITY_SUBCATEGORIES[cityKey]?.[slug] || [];

  const related = topLevelNames
    .filter((c) => categorySlug(c.name) !== slug)
    .map((c) => ({
      name: c.name,
      image: c.image,
      slug: categorySlug(c.name),
      count: counts.get(categorySlug(c.name)) || 0,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  // Pills row: real subcategories when tiqets has them,
  // otherwise the sibling categories of a top-level page.
  const pills =
    subcategories.length > 0
      ? subcategories
      : isTopLevel
        ? related.slice(0, 6)
        : [];

  // City-specific picture for this exact category (either
  // its own tile or its pill on a parent category page).
  const subcategoryImage = Object.values(CITY_SUBCATEGORIES[cityKey] || {})
    .flat()
    .find((s) => s.slug === slug)?.image;

  // The hero spans the full page width, so ask the CDN
  // for a large rendition — pill pictures are extracted
  // as tiny thumbnails and would blur when upscaled.
  const heroImage = imageUrlFor(
    subcategoryImage ||
      topLevelNames.find((c) => categorySlug(c.name) === slug)?.image ||
      products[0]?.images?.[0] ||
      '',
    'hero',
  );

  const countryName = products[0]?.country || cityProducts[0]?.country || '';
  const cities = COUNTRY_CITIES[countryName.toLowerCase()] || [];

  return (
    <CategoryPageClient
      cityName={cityName}
      countryName={countryName}
      category={category}
      slug={slug}
      heroImage={heroImage}
      products={products}
      pills={pills}
      relatedCategories={related}
      cities={cities}
    />
  );
}
