import { ProductPageShell } from '@/components/product-page-shell';
import { ProductComingSoon } from '@/components/product-coming-soon';

export default function FlightsPage() {
  return (
    <ProductPageShell titleKey="search.flights" subtitleKey="search.flightsSubtitle">
      <ProductComingSoon product="flights" messageKey="search.flightsComingSoon" />
    </ProductPageShell>
  );
}