'use client';

export function VariantBookingClient({ productId }: { productId: string }) {
  return (
    <a
      href={`https://www.tiqets.com/en/tickets/product-${productId}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
    >
      Book Now
    </a>
  );
}
