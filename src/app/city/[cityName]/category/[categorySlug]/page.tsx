import { notFound } from 'next/navigation';
import { fetchTiqetsCityProducts } from '@/lib/tiqets-api';
import { fetchTiqetsTagsByTypeId } from '@/lib/tiqets-api';
import { COUNTRY_CITIES } from '@/lib/agoda-catalog';
import { CITY_TO_COUNTRY_ID } from '@/lib/tiqets-api';
import {
  CATEGORY_TYPE_IDS,
  SUBCATEGORY_TAG_TYPE_IDS,
  MAIN_CATEGORY_SLUGS,
  categoryName,
  categorySlug,
  categorySlugByTypeId,
} from '@/lib/category-pages';
import { imageUrlFor } from '@/lib/tiqets-image';
import { CATEGORY_IMAGES } from '@/lib/category-images';
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
  
  // Get country_id for this city from static map or auto-discovery cache
  const normalizedCityName = cityName.toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const countryId = CITY_TO_COUNTRY_ID[normalizedCityName];

  if (!typeId) {
    return notFound();
  }

  const category = categoryName(slug);

  // A category page is the city's products filtered by
  // the type id every product carries in its tag_ids.
  // The raw /products listing keeps variant products,
  // which is how Tiqets counts its own category pages.
  const cityProducts: Excursion[] = await fetchTiqetsCityProducts(cityName, countryId);

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

  // Subcategories (pills) from API - fetch tags with this category's type_id
  // Map product category type_id to tag subcategory type_id
  const tagTypeId = SUBCATEGORY_TAG_TYPE_IDS[typeId] || typeId;
  const subTags = await fetchTiqetsTagsByTypeId(tagTypeId);

  // Build subcategory counts from products
  // Products have tag_ids that include the subcategory tag ids
  const subCategoryCounts = new Map<string, number>();
  for (const ex of products) {
    for (const tag of ex.tag_ids || []) {
      // Check if this tag_id is a subcategory tag (exists in subTags)
      const subTag = subTags.find(st => st.id === String(tag));
      if (subTag) {
        subCategoryCounts.set(subTag.name, (subCategoryCounts.get(subTag.name) || 0) + 1);
      }
    }
  }

  // Deduplicate subTags by name (API may return duplicates with different IDs)
  const uniqueSubTags = new Map<string, typeof subTags[0]>();
  for (const tag of subTags) {
    if (!uniqueSubTags.has(tag.name)) {
      uniqueSubTags.set(tag.name, tag);
    }
  }
  const deduplicatedSubTags = Array.from(uniqueSubTags.values());

  // For Museums category, only show Art Museums and History Museums
  const allowedMuseumSubcategories = new Set(['Art Museums', 'History Museums']);
  const filteredSubTags = (slug === 'museums')
    ? deduplicatedSubTags.filter(tag => allowedMuseumSubcategories.has(tag.name))
    : deduplicatedSubTags;

  const pills = filteredSubTags
    .map((tag) => ({
      name: tag.name,
      image: CATEGORY_IMAGES[tag.name.toLowerCase()] || '',
      slug: tag.slug,
      count: subCategoryCounts.get(tag.name) || 0,
    }))
    .filter(p => p.count > 0) // Only show pills with experiences
    .slice(0, 10);

  // Related categories from API data - only main categories
  const mainCategorySlugs = new Set(MAIN_CATEGORY_SLUGS);
  const related = Array.from(counts.entries())
    .filter(([tagSlug]) => tagSlug !== slug && mainCategorySlugs.has(tagSlug))
    .map(([tagSlug, count]) => {
      const name = categoryName(tagSlug);
      const image = CATEGORY_IMAGES[name.toLowerCase()] || 
                    CATEGORY_IMAGES[tagSlug] || 
                    '';
      return {
        name,
        image,
        slug: tagSlug,
        count,
      };
    })
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Hero image from first product in category
  const heroImage = imageUrlFor(
    products[0]?.images?.[0] || '',
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
