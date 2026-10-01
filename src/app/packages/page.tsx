import { ProductPageShell } from '@/components/product-page-shell';
import { ProductComingSoon } from '@/components/product-coming-soon';

export default function PackagesPage() {
  return (
    <ProductPageShell titleKey="search.packages" subtitleKey="search.packagesSubtitle">
      <ProductComingSoon product="packages" messageKey="search.packagesComingSoon" />
    </ProductPageShell>
  );
}