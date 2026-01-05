'use client';

import { useVariantSelection } from '@/hooks/product-detail/useVariantSelection';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { useProductAddons } from '@/hooks/product-detail/useProductAddons';
import ProductAddons from './addons';
import useCartStore from '@/lib/store/cart';

export default function ProductInfo({ product }) {
  const { addToCart, openDrawer } = useCartStore();

  const {
    selectedOptions,
    quantity,
    availableStock,
    currentPrice,
    isAvailable,
    allOptionsSelected,
    canAddToCart,
    handleOptionSelect,
    incrementQuantity,
    decrementQuantity,
    isOptionDisabled,
    selectedVariant,
  } = useVariantSelection(product);

  // Determine if we should fetch addons
  const hasAddons = selectedVariant ? selectedVariant.hasAddons : product?.hasAddons;

  // Fetch addons based on product and selected variant
  const { data: addons, isLoading: isAddonsLoading } = useProductAddons(
    product?.id,
    selectedVariant?.id,
    !!hasAddons
  );

  // State for selected addons
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Reset selected addons when variant changes
  useEffect(() => {
    setSelectedAddons([]);
  }, [selectedVariant?.id]);

  // Auto-select default addons when addons load
  useEffect(() => {
    if (addons && addons.length > 0) {
      const defaultAddons = [];

      addons.forEach((addonGroup) => {
        const defaultOption = addonGroup.options.find((option) => option.isDefault);

        if (defaultOption) {
          defaultAddons.push({
            assignmentId: addonGroup.productAddonAssignmentId,
            optionId: defaultOption.id,
            name: defaultOption.name,
            price: defaultOption.price,
            salePrice: defaultOption.salePrice,
          });
        }
      });

      if (defaultAddons.length > 0) {
        setSelectedAddons(defaultAddons);
      }
    }
  }, [addons]);

  // Handle addon selection (single selection per addon group)
  const handleSelectAddon = (assignmentId, option) => {
    setSelectedAddons((prev) => {
      const existingIndex = prev.findIndex(
        (s) => s.assignmentId === assignmentId && s.optionId === option.id
      );

      if (existingIndex >= 0) {
        // Deselect if clicking the same option
        return prev.filter((s) => s.assignmentId !== assignmentId);
      }

      // Replace any existing selection for this addon group
      const filtered = prev.filter((s) => s.assignmentId !== assignmentId);
      return [
        ...filtered,
        {
          assignmentId,
          optionId: option.id,
          name: option.name,
          price: option.price,
          salePrice: option.salePrice,
        },
      ];
    });
  };

  // Handle add to cart with addons
  const handleAddToCart = () => {
    // Calculate total price including addons
    let totalPrice = parseFloat(currentPrice);
    const addonDetails = selectedAddons.map((addon) => {
      const addonPrice = addon.salePrice > 0 ? addon.salePrice : addon.price;
      totalPrice += parseFloat(addonPrice);
      return `${addon.name} (+AED ${addonPrice.toFixed(2)})`;
    });

    // Build variant display name
    let variantName = null;
    if (product.hasVariants && selectedVariant) {
      const optionValues = Object.entries(selectedOptions)
        .map(([key, value]) => value)
        .join(' / ');
      variantName = optionValues;
    }

    // Add to cart
    addToCart({
      id: product.id,
      variantId: selectedVariant?.id || 'no-variant',
      name: product.name,
      variant: variantName,
      price: parseFloat(currentPrice),
      salePrice: 0, // Price already reflects sale price if applicable
      quantity: quantity,
      image: product.images?.[0] || '/all/image-placeholder.svg',
      addons: selectedAddons,
      addonDetails: addonDetails.length > 0 ? addonDetails.join(', ') : null,
    });

    // Show success message
    message.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart!`);

    // Open cart drawer
    openDrawer();
  };

  if (!product) return null;

  // Render option buttons (text or color)
  const renderOption = (option) => {
    const hasColors = option.values.some((v) => v.colorHex);

    return (
      <div key={option.name}>
        <label className="mb-2 block font-medium text-gray-900">{option.name}:</label>
        <div className="flex flex-wrap gap-3">
          {option.values.map((optionValue, i) => {
            const isSelected = selectedOptions[option.name] === optionValue.value;
            const isDisabled = isOptionDisabled(option.name, optionValue.value);

            if (hasColors && optionValue.colorHex) {
              // Render color swatch
              return (
                <button
                  key={i}
                  disabled={isDisabled}
                  onClick={() => handleOptionSelect(option.name, optionValue.value)}
                  className={`group relative h-12 w-12 rounded-full border-2 transition-all ${isSelected
                    ? 'border-green-800 ring-2 ring-green-800 ring-offset-2'
                    : 'border-gray-200 hover:border-gray-300'
                    } ${isDisabled ? 'cursor-not-allowed opacity-40 grayscale' : ''} `}
                  title={`${optionValue.value}${isDisabled ? ' (Out of Stock)' : ''}`}
                >
                  <div
                    className="h-full w-full rounded-full"
                    style={{ backgroundColor: optionValue.colorHex }}
                  />
                  {isDisabled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-0.5 w-full rotate-45 transform bg-gray-500" />
                    </div>
                  )}
                  {isSelected && !isDisabled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-white drop-shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            }

            // Render text button
            return (
              <button
                key={i}
                disabled={isDisabled}
                onClick={() => handleOptionSelect(option.name, optionValue.value)}
                className={`rounded-lg border px-6 py-3 text-sm font-medium transition-all ${isSelected
                  ? 'border-green-800 bg-green-50 text-green-900'
                  : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                  } ${isDisabled ? 'cursor-not-allowed bg-gray-100 box-decoration-slice text-gray-400 line-through opacity-50' : ''} `}
              >
                {optionValue.value}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-medium text-gray-900">5.0 Reviews</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-5xl font-bold text-gray-900">{product.name}</h1>
      </div>

      {/* Description */}
      <p className="text-gray-600">{product.shortDescription}</p>

      {/* Price */}
      <div className="text-2xl font-bold text-gray-900">
        {product.hasVariants && allOptionsSelected ? (
          <>AED {currentPrice}</>
        ) : product.hasVariants ? (
          <span className="text-lg text-gray-500">Select options to see price</span>
        ) : (
          <>AED {currentPrice}</>
        )}
      </div>

      {/* Options - only show if product has variants */}
      {product.hasVariants && product.options && (
        <div className="space-y-6">{product.options.map((option) => renderOption(option))}</div>
      )}

      {/* Product Addons - show after variant selection */}
      <ProductAddons
        addons={addons}
        isLoading={isAddonsLoading}
        selectedAddons={selectedAddons}
        onSelectAddon={handleSelectAddon}
      />

      {/* Stock Status */}
      {allOptionsSelected && (
        <div className="text-sm">
          {isAvailable ? (
            <span className="font-medium text-green-600">
              In Stock ({availableStock} available)
            </span>
          ) : (
            <span className="font-medium text-red-600">Out of Stock</span>
          )}
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div>
        <label className="mb-2 block font-medium text-gray-900">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              icon={<MinusOutlined />}
              onClick={decrementQuantity}
              disabled={quantity <= 1 || !allOptionsSelected}
              className="flex h-12 w-12 items-center justify-center"
            />
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-100 bg-white text-xl font-bold text-gray-900 shadow-sm">
              {quantity}
            </div>
            <Button
              icon={<PlusOutlined />}
              onClick={incrementQuantity}
              disabled={quantity >= availableStock || !allOptionsSelected}
              className="flex h-12 w-12 items-center justify-center"
            />
          </div>
        </div>
      </div>

      <button
        disabled={!canAddToCart}
        onClick={handleAddToCart}
        className={`w-full rounded-full py-4 text-lg font-bold text-white transition-colors ${canAddToCart ? 'bg-green-800 hover:bg-green-900' : 'cursor-not-allowed bg-gray-300'
          }`}
      >
        {!allOptionsSelected ? 'Select Options' : !isAvailable ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}
