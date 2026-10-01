import { ProductPageShell } from '@/components/product-page-shell';
import { ProductComingSoon } from '@/components/product-coming-soon';

export default function StaysPage() {
  return (
    <ProductPageShell titleKey="search.stays" subtitleKey="search.staysSubtitle">
      <ProductComingSoon product="stays" messageKey="search.staysComingSoon" />
    </ProductPageShell>
  );
}