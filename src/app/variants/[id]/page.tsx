import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, MessageSquareText, Clock, Hourglass, Zap } from 'lucide-react';
import {
  fetchTiqetsProductById,
  fetchTiqetsProductDetail,
  fetchTiqetsProductReviews,
  fetchTiqetsAvailabilityCached,
  fetchTiqetsProductVariants,
} from '@/lib/tiqets-api';
import { formatPrice } from '@/lib/currency';
import { pickTiqetsImageUrls } from '@/lib/tiqets-image';
import { VariantGallery } from './variant-gallery';
import { VariantBookingCard } from './variant-booking-card';
import { ReviewSummary } from './variant-reviews';
import { RelatedProducts, type RelatedProduct } from './variant-related';
import { languageNames, normalizeReview } from './variant-review-data';
import {
  BulletSection,
  MeetingPoint,
  Paragraph,
  toBulletList,
} from './variant-content';
import {
  cancellationSummary,
  formatAdvanceArrival,
  formatDuration,
  openingHoursLabel,
} from './variant-availability-copy';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const dynamic = 'force-dynamic';

type Section = { key: string; title: string; content: React.ReactNode };

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-base">
      <Icon className="mt-0.5 h-4 w-4 w-[16px] shrink-0 text-center text-slate-900" />
      <span>
        <span className="mb-0.5 block text-sm font-normal text-slate-500">{label}</span>
        <span className="text-base font-semibold text-slate-900">{value}</span>
      </span>
    </div>
  );
}

export default async function VariantDetailPage({ params }: { params: { id: string } }) {
  const [variant, detail] = await Promise.all([
    fetchTiqetsProductById(params.id),
    fetchTiqetsProductDetail(params.id),
  ]);

  if (!variant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-2 text-base text-muted-foreground">Booking</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          This option is currently unavailable
        </h1>
        <p className="text-gray-600">Please go back and choose another ticket option.</p>
      </div>
    );
  }

  const product = detail?.product || {};
  const experience = detail?.experience || null;

  const [availability, reviews, siblings] = await Promise.all([
    fetchTiqetsAvailabilityCached(params.id),
    fetchTiqetsProductReviews(params.id, 10),
    experience?.product_ids?.length
      ? fetchTiqetsProductVariants(
          (experience.product_ids as unknown[])
            .map(String)
            .filter((id) => id !== String(params.id))
            .slice(0, 12),
        )
      : Promise.resolve([]),
  ]);

  const allImages: string[] = Array.isArray(variant.images) ? variant.images : [];

  const tagline = product.tagline || variant.excursionType?.name || '';
  const description = product.description || product.summary || variant.description || '';
  const included = toBulletList(product.whats_included ?? variant.whatsincluded);
  const excluded = toBulletList(product.whats_excluded ?? variant.whatsnotincluded);
  const instructions = product.how_to_use || product.usage || product.checkout_information?.usage || '';
  const additionalInfo =
    product.checkout_information?.good_to_know || product.good_to_know || product.must_know || '';
  const safetyMeasures = product.safety_measures || '';

  const guideLanguages = languageNames(
    product.live_guide_languages || product.language_selection || [],
  );
  const advanceArrival = formatAdvanceArrival(product.advance_arrival_time);
  const meetingAddress =
    product.starting_point?.address || product.venue?.address || experience?.address?.street || '';
  const lat = product.starting_point?.lat ?? product.geolocation?.lat ?? experience?.address?.latitude ?? null;
  const lng = product.starting_point?.lng ?? product.geolocation?.lng ?? experience?.address?.longitude ?? null;

  const normalReviews = reviews.map(normalizeReview);
  const rating = typeof product.ratings?.average === 'number' ? product.ratings.average : variant.rating;
  const reviewsTotal = product.ratings?.total ?? variant.reviewsTotal ?? 0;

  const durationLabel = formatDuration(product.duration);
  const durationMinutes = (() => {
    const match = /^(\d{1,2}):(\d{2})/.exec(String(product.duration || ''));
    return match ? Number(match[1]) * 60 + Number(match[2]) : 0;
  })();
  const guideLanguageSummary =
    guideLanguages.length === 0
      ? ''
      : guideLanguages.length <= 2
        ? guideLanguages.join(' and ')
        : `${guideLanguages.slice(0, 2).join(', ')} and ${guideLanguages.length - 2} other language${
            guideLanguages.length - 2 === 1 ? '' : 's'
          }`;
  const openingHours = openingHoursLabel(availability, durationMinutes);

  const sections: Section[] = [];

  if (included.length > 0 || excluded.length > 0) {
    sections.push({
      key: 'included',
      title: "What's included",
      content: (
        <>
          <BulletSection heading="Included" items={included} kind="check" />
          <BulletSection heading="Not included" items={excluded} kind="cross" />
        </>
      ),
    });
  }

  if (meetingAddress || lat != null) {
    sections.push({
      key: 'meeting',
      title: 'Meeting point',
      content: <MeetingPoint address={meetingAddress} lat={lat} lng={lng} />,
    });
  }

  if (description) {
    sections.push({ key: 'description', title: 'Description', content: <Paragraph>{description}</Paragraph> });
  }
  if (instructions) {
    sections.push({ key: 'instructions', title: 'Instructions', content: <Paragraph>{instructions}</Paragraph> });
  }
  if (additionalInfo || safetyMeasures) {
    sections.push({
      key: 'additional',
      title: 'Additional info',
      content: (
        <>
          {additionalInfo && <Paragraph>{additionalInfo}</Paragraph>}
          {safetyMeasures && <Paragraph>{safetyMeasures}</Paragraph>}
        </>
      ),
    });
  }

  const cancellation = product.cancellation || null;  const cancellationText = product.cancellation_policy || cancellationSummary(cancellation);
  if (cancellationText) {
    sections.push({
      key: 'cancellation',
      title: 'Reschedule and cancellation policy',
      content: <Paragraph>{cancellationText}</Paragraph>,
    });
  }

  const importantInfo =
    [
      advanceArrival ? `Please arrive ${advanceArrival} before the start time.` : '',
      guideLanguages.length > 0 ? `Live guide available in ${guideLanguages.join(', ')}.` : '',
      product.smartphone_ticket ? 'A smartphone is needed to show the ticket.' : '',
      product.wheelchair_access ? 'The experience is wheelchair accessible.' : '',
      product.instant_ticket_delivery ? 'Your ticket is delivered instantly after booking.' : '',
    ]
      .filter(Boolean)
      .join(' ') || 'See the supplier website for further details.';

  const related: RelatedProduct[] = siblings
    .filter((sibling: any) => sibling && (sibling.title || sibling.name))
    .slice(0, 6)
    .map((sibling: any) => {
      const images = pickTiqetsImageUrls(sibling.images);
      const ratingValue = sibling.ratings?.average ?? sibling.rating;
      return {
        id: String(sibling.id),
        title: sibling.title || sibling.name || '',
        summary: sibling.tagline || sibling.summary || '',
        image: images[0] || allImages[0] || '',
        rating: typeof ratingValue === 'number' ? ratingValue : null,
        reviewsTotal:
          typeof sibling.ratings?.total === 'number' ? sibling.ratings.total : sibling.reviewsTotal ?? null,
        price: formatPrice(
          Number(sibling.from_price ?? sibling.price ?? 0),
          sibling.currency || variant.currency,
        ),
        promoLabel: typeof sibling.promo_label === 'string' ? sibling.promo_label : null,
      };
    });

  const experienceTitle = experience?.title || variant.name;
  const cityName = product.city_name || experience?.address?.city_name || variant.city;
  const countryName = product.country_name || experience?.address?.country_name || variant.country;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 pb-16">
      <nav className="flex flex-wrap items-center gap-2 py-3.5 text-sm text-slate-500">
        {countryName && (
          <>
            <Link href={`/destinations?country=${encodeURIComponent(countryName)}`} className="hover:text-[#00B4D8]">
              {countryName}
            </Link>
            <span className="text-slate-300">&rsaquo;</span>
          </>
        )}
        {cityName && (
          <>
            <Link href={`/destinations?city=${encodeURIComponent(cityName)}`} className="hover:text-[#00B4D8]">
              {cityName}
            </Link>
            <span className="text-slate-300">&rsaquo;</span>
          </>
        )}
        {experience && (
          <>
            <Link
              href={`/excursions/${experience.id}`}
              className="hover:text-[#00B4D8]"
            >
              {experienceTitle}
            </Link>
            <span className="text-slate-300">&rsaquo;</span>
          </>
        )}
        <span className="text-slate-700">{variant.name}</span>
      </nav>

      <VariantGallery images={allImages} name={variant.name} />

      <div className="mt-6 grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          {typeof rating === 'number' && rating > 0 && (
            <div className="mb-2 flex items-center gap-1.5 text-base font-semibold text-slate-700">
              <Star className="h-3 w-3 fill-[#F6B93B] text-[#F6B93B]" />
              {rating.toFixed(1)} · {reviewsTotal.toLocaleString()} review{reviewsTotal === 1 ? '' : 's'}
            </div>
          )}

          <h1 className="mb-2 text-3xl font-bold leading-[1.25] tracking-[-0.3px] text-slate-900 md:text-4xl">
            {variant.name}
          </h1>
          {tagline && <p className="mb-6 text-base leading-relaxed text-slate-600">{tagline}</p>}

          <div className="mb-6 flex flex-wrap gap-x-9 gap-y-4">
            {openingHours && (
              <Fact icon={Clock} label="Opening hours" value={openingHours} />
            )}
            {durationLabel && (
              <Fact icon={Hourglass} label="Duration" value={durationLabel} />
            )}
            {guideLanguages.length > 0 && (
              <Fact
                icon={MessageSquareText}
                label="Live guide"
                value={guideLanguageSummary}
              />
            )}
            {product.skip_line === true && (
              <Fact icon={Zap} label="Skip the line" value="Skip the queue" />
            )}
          </div>

          {sections.length > 0 && (
            <Accordion type="multiple" defaultValue={[sections[0].key]} className="w-full">
              {sections.map((section) => (
                <AccordionItem key={section.key} value={section.key} className="border-b border-slate-200">
                  <AccordionTrigger className="py-5 text-base font-bold text-slate-900 hover:text-[#00B4D8]">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">{section.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        <VariantBookingCard
          productId={variant.id}
          price={variant.price}
          currency={variant.currency}
          hasDates={(availability?.dates.length ?? 0) > 0}
          cancellationSummary={cancellationSummary(cancellation)}
          importantInfo={importantInfo}
        />
      </div>

      <ReviewSummary rating={rating} reviewsTotal={reviewsTotal} reviews={normalReviews} />

      <RelatedProducts
        title={`More ways to experience ${experienceTitle}`}
        products={related}
      />
    </div>
  );
}
