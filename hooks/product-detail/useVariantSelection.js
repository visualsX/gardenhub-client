import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export const useVariantSelection = (product) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize state from URL params OR default to first available variant
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initialOptions = {};
    let hasUrlOptions = false;

    // 1. Try to get from URL
    if (product?.options) {
      product.options.forEach((option) => {
        const paramValue = searchParams.get(option.name);
        if (paramValue && option.values.some((v) => v.value === paramValue)) {
          initialOptions[option.name] = paramValue;
          hasUrlOptions = true;
        }
      });
    }

    // 2. If no URL options, find default variant
    if (!hasUrlOptions && product?.variants?.length > 0) {
      // Find first in-stock and available variant
      const inStockVariant = product.variants.find(
        (v) => v.stockQuantity > 0 && v.isAvailable !== false
      );
      // Fallback to first variant if all are OOS
      const targetVariant = inStockVariant || product.variants[0];

      if (targetVariant?.attributes) {
        targetVariant.attributes.forEach((attr) => {
          initialOptions[attr.key] = attr.value.value;
        });
      }
    }

    return initialOptions;
  });

  const [quantity, setQuantity] = useState(1);

  // Update URL when options change
  const updateUrl = useCallback(
    (newOptions) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newOptions).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // Sync URL on mount if we established a default selection but URL was empty
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    let needsUpdate = false;

    Object.entries(selectedOptions).forEach(([key, value]) => {
      if (!currentParams.has(key)) {
        needsUpdate = true;
      }
    });

    if (needsUpdate && Object.keys(selectedOptions).length > 0) {
      updateUrl(selectedOptions);
    }
  }, []); // Run once on mount to sync defaults

  const handleOptionSelect = (optionName, value) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);
    setQuantity(1); // Reset quantity on variant change
    updateUrl(newOptions);
  };

  // Helper to check if an option value should be disabled based on current selection
  const isOptionDisabled = useCallback(
    (optionName, value) => {
      if (!product?.variants) return false;

      // Create a candidate selection with the proposed value
      // We keep other selected options, but override/set the current one
      const candidateSelection = { ...selectedOptions, [optionName]: value };

      // Find if there is ANY variant that:
      // 1. Matches this candidate selection (subset match)
      // 2. Has stock > 0
      const hasMatchingInStockVariant = product.variants.some((variant) => {
        const attributes = variant.attributes || [];

        // Check if variant matches all specific keys in candidateSelection
        const matchesSelection = Object.entries(candidateSelection).every(([key, val]) => {
          const attr = attributes.find((a) => a.key === key);
          return attr && attr.value.value === val;
        });

        if (!matchesSelection) return false;

        // Check stock
        return variant.stockQuantity > 0;
      });

      return !hasMatchingInStockVariant;
    },
    [product, selectedOptions]
  );

  const getSelectedVariant = () => {
    if (!product?.hasVariants || !product?.variants) return null;

    return product.variants.find((variant) => {
      const attributes = variant.attributes || [];
      return Object.entries(selectedOptions).every(([key, value]) => {
        const attribute = attributes.find((attr) => attr.key === key);
        return attribute?.value?.value === value;
      });
    });
  };

  const selectedVariant = getSelectedVariant();

  // Check if all required options are selected
  const allOptionsSelected = product?.options
    ? product.options.every((opt) => selectedOptions[opt.name])
    : true;

  // Calculate display values
  const availableStock = selectedVariant
    ? selectedVariant.stockQuantity
    : product?.stockQuantity || 0;

  const currentPrice = selectedVariant
    ? selectedVariant.salePrice > 0
      ? selectedVariant.salePrice
      : variantPrice(selectedVariant)
    : product?.salePrice > 0
      ? product.salePrice
      : product?.price || 0;

  const originalPrice = selectedVariant
    ? selectedVariant.salePrice > 0
      ? selectedVariant.price
      : null
    : product?.salePrice > 0
      ? product.price
      : null;

  // Helper to handle potentially missing price on variant
  function variantPrice(v) {
    return v.price || 0;
  }

  const isAvailable = selectedVariant
    ? selectedVariant.isAvailable && availableStock > 0
    : product?.stockQuantity > 0;

  const canAddToCart =
    allOptionsSelected && isAvailable && quantity > 0 && quantity <= availableStock;

  const incrementQuantity = () => {
    if (quantity < availableStock) setQuantity((q) => q + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  return {
    selectedOptions,
    quantity,
    availableStock,
    currentPrice,
    isAvailable,
    allOptionsSelected,
    canAddToCart,
    selectedVariant,
    handleOptionSelect,
    incrementQuantity,
    decrementQuantity,
    isOptionDisabled,
    originalPrice
  };
};
