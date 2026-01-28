'use client';

import { Modal, Button, Spin, message } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useProductBySlug } from '@/hooks/product-detail/useProductBySlug';
import { useVariantSelection } from '@/hooks/product-detail/useVariantSelection';
import { useAddToCart } from '@/hooks/cart/useCart';
import { CURRENCY } from '@/lib/const/global.variables';
import useCartStore from '@/lib/store/cart';

export default function QuickBuyModal({ slug, isOpen, onClose }) {
  const { openDrawer } = useCartStore();
  const { data: product, isLoading: isProductLoading } = useProductBySlug(slug);
  const addToCartMutation = useAddToCart();

  // We only initialize variant selection once product is loaded
  const vs = useVariantSelection(product, { syncWithUrl: false });

  const handleAddToCart = () => {
    if (!vs.canAddToCart) return;

    let variantName = null;
    if (product.hasVariants && vs.selectedVariant) {
      variantName = Object.values(vs.selectedOptions).join(' / ');
    }

    addToCartMutation.mutate(
      {
        productId: product.id,
        productVariantId: vs.selectedVariant?.id || null,
        quantity: vs.quantity,
        addons: [], // Minimal modal typically skips addons unless requested
        productInfo: {
          productId: product.id,
          productVariantId: vs.selectedVariant?.id || null,
          name: product.name,
          variant: variantName,
          price: parseFloat(vs.currentPrice),
          salePrice: 0,
          quantity: vs.quantity,
          image: product.images?.[0] || product.mainImageUrl || '/all/image-placeholder.svg',
        },
      },
      {
        onSuccess: () => {
          onClose();
          openDrawer();
        },
      }
    );
  };

  const renderOption = (option) => {
    const hasColors = option.values.some((v) => v.colorHex);

    return (
      <div key={option.name} className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">{option.name}</label>
        <div className="flex flex-wrap gap-2">
          {option.values.map((optionValue, i) => {
            const isSelected = vs.selectedOptions[option.name] === optionValue.value;
            const isDisabled = vs.isOptionDisabled(option.name, optionValue.value);

            if (hasColors && optionValue.colorHex) {
              return (
                <button
                  key={i}
                  disabled={isDisabled}
                  onClick={() => vs.handleOptionSelect(option.name, optionValue.value)}
                  className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                    isSelected
                      ? 'border-green-800 ring-2 ring-green-800 ring-offset-2'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${isDisabled ? 'cursor-not-allowed opacity-40 grayscale' : ''}`}
                  title={optionValue.value}
                >
                  <div
                    className="h-full w-full rounded-full"
                    style={{ backgroundColor: optionValue.colorHex }}
                  />
                </button>
              );
            }

            return (
              <button
                key={i}
                disabled={isDisabled}
                onClick={() => vs.handleOptionSelect(option.name, optionValue.value)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  isSelected
                    ? 'border-green-800 bg-green-50 text-green-900'
                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                } ${isDisabled ? 'cursor-not-allowed line-through opacity-50' : ''}`}
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
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      width={450}
      className="quick-buy-modal"
    >
      {isProductLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Spin size="large" />
        </div>
      ) : product ? (
        <div className="p-2">
          <div className="mb-6 flex gap-4">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
              <img
                src={product.images?.[0] || product.mainImageUrl || '/all/image-placeholder.svg'}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="line-clamp-2 text-xl font-bold text-gray-900">{product.name}</h3>
              <div className="mt-1 text-lg font-bold text-green-700">
                {CURRENCY} {vs.currentPrice}
                {vs.originalPrice && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    {CURRENCY} {vs.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="custom-scrollbar mb-6 max-h-[300px] overflow-y-auto pr-2">
            {product.hasVariants && product.options?.map((option) => renderOption(option))}
          </div>

          <div className="flex items-center justify-between gap-4 border-t pt-6">
            <div className="flex items-center gap-3">
              <Button
                icon={<MinusOutlined />}
                onClick={vs.decrementQuantity}
                disabled={vs.quantity <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-full"
              />
              <span className="w-8 text-center text-lg font-bold">{vs.quantity}</span>
              <Button
                icon={<PlusOutlined />}
                onClick={vs.incrementQuantity}
                disabled={vs.quantity >= vs.availableStock}
                className="flex h-10 w-10 items-center justify-center rounded-full"
              />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!vs.canAddToCart || addToCartMutation.isPending}
              className={`flex-1 rounded-full px-6 py-3 font-bold text-white shadow-lg transition-all active:scale-95 ${
                vs.canAddToCart && !addToCartMutation.isPending
                  ? 'bg-green-800 hover:bg-green-900'
                  : 'cursor-not-allowed bg-gray-300 shadow-none'
              }`}
            >
              {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">Product not found</div>
      )}
    </Modal>
  );
}
