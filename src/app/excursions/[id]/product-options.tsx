                             {Number(variant.price || 0) > 0 ? `\${variant.currency === "EUR" ? "â¬" : variant.currency === "USD" ? "\$" : variant.currency === "GBP" ? "£" : variant.currency}\${Number(variant.price || 0).toFixed(2)}` : 'Select'}
             {Number(selectedVariant.price || 0) > 0 ? `Reserve - \${selectedVariant.currency === "EUR" ? "â¬" : selectedVariant.currency === "USD" ? "\$" : selectedVariant.currency === "GBP" ? "£" : selectedVariant.currency}\${Number(selectedVariant.price || 0).toFixed(2)}` : 'Reserve'}
                             {Number(variant.price || 0) > 0 ? (
  {variant.currency === "EUR" ? "â¬" : variant.currency === "USD" ? "$" : variant.currency === "GBP" ? "£" : variant.currency}
  {Number(variant.price || 0).toFixed(2)}
) : 'Select'}
             {Number(selectedVariant.price || 0) > 0 ? `Reserve - (
  {selectedVariant.currency === "EUR" ? "â¬" : selectedVariant.currency === "USD" ? "$" : selectedVariant.currency === "GBP" ? "£" : selectedVariant.currency}
  {Number(selectedVariant.price || 0).toFixed(2)}
)` : 'Reserve'}
                             {Number(variant.price || 0) > 0 ? `\${variant.currency === "EUR" ? "â¬" : variant.currency === "USD" ? "\$" : variant.currency === "GBP" ? "£" : variant.currency}\${Number(variant.price || 0).toFixed(2)}` : 'Select'}
             {Number(selectedVariant.price || 0) > 0 ? `Reserve - \${selectedVariant.currency === "EUR" ? "â¬" : selectedVariant.currency === "USD" ? "\$" : selectedVariant.currency === "GBP" ? "£" : selectedVariant.currency}\${Number(selectedVariant.price || 0).toFixed(2)}` : 'Reserve'}
