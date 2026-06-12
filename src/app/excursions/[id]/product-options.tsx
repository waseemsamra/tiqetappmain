'use client';
                             {Number(variant.price || 0) > 0 ? `\$${Number(variant.price || 0).toFixed(2)}` : 'Select'}
             {Number(selectedVariant.price || 0) > 0 ? `Reserve - \$${Number(selectedVariant.price || 0).toFixed(2)}` : 'Reserve'}
