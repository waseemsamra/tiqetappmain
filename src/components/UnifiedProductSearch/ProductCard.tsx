'use client';

import { useEffect, useRef, useState } from 'react';
import type { Product } from './types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [_, setIsTiqetsReady] = useState(false);
  const buttonId = `cta_${product.tiqetsProductId}`;
  const initialized = useRef(false);

  // Load Tiqets script when card is in viewport (lazy loading)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !initialized.current) {
          // Check if script already exists
          if (!document.querySelector('script[src*="10716.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
            script.defer = true;
            script.onload = () => setIsTiqetsReady(true);
            document.body.appendChild(script);
          } else {
            setIsTiqetsReady(true);
          }
          initialized.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const cardElement = document.getElementById(`card_${product.tiqetsProductId}`);
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => observer.disconnect();
  }, [product.tiqetsProductId]);

  return (
    <div id={`card_${product.tiqetsProductId}`} className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-meta">
          <span className="product-location">
            📍 {product.location.city}, {product.location.country}
          </span>
          <span className="product-duration">⏱️ {product.duration}</span>
          <span className="product-rating">
            ⭐ {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
        
        <div className="product-price">
          <span className="price">{product.currency} {product.price}</span>
          <span className="price-unit">per person</span>
        </div>
        
        {/* Tiqets Widget Configuration */}
        <div
          data-tiqets-widget="booking"
          data-product-id={product.tiqetsProductId}
          data-trigger-selector={`#${buttonId}`}
          data-distributor-id="68970"
          data-sitebrand-id="71438"
        />
        
        <button id={buttonId} className="book-now-button">
          Book Now - {product.category === 'excursion' ? 'Excursion' : 'Tickets'}
        </button>
      </div>
    </div>
  );
}