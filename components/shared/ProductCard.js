import { memo, useState } from 'react';
import Link from 'next/link';
import { useAddToCart } from '@/hooks/cart/useCart';
import QuickBuyModal from './QuickBuyModal';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useCartStore from '@/lib/store/cart';

function ProductCard({ product }) {
  const { name, rating, mainImageUrl, slug, hasVariants } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openDrawer } = useCartStore();
  const addToCartMutation = useAddToCart();

  // Handle cases where product might be from old storage or missing price
  const price = product.price || 0;
  const salePrice = product.salePrice || 0;
  const isOnSale = product.isOnSale || (salePrice > 0 && salePrice < price);
  const actualPrice = isOnSale ? salePrice : price;

  const handleQuickBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasVariants) {
      setIsModalOpen(true);
      return;
    }

    // Direct add to cart for simple products
    addToCartMutation.mutate(
      {
        productId: product.id,
        productVariantId: null,
        quantity: 1,
        addons: [],
        productInfo: {
          productId: product.id,
          productVariantId: null,
          name: name,
          price: parseFloat(actualPrice),
          salePrice: 0,
          quantity: 1,
          image: mainImageUrl || '/all/image-placeholder.svg',
        },
      },
      {
        onSuccess: () => {
          openDrawer();
        },
      }
    );
  };

  return (
    <div className="group relative flex h-full flex-col rounded-3xl bg-white p-3 transition-shadow hover:shadow-xl">
      <Link
        href={`/products/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${name}`}
      />

      {/* Product Image */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        {product.isOnSale && (
          <div className="absolute top-3 right-3 z-20 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
            On Sale
          </div>
        )}
        <img
          src={mainImageUrl || '/all/image-placeholder.svg'}
          alt={name}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${product.hoverImage ? 'transition-opacity duration-300 group-hover:opacity-0' : ''}`}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${name} hover`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:scale-110 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 flex grow flex-col px-2">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">{name}</h3>

        {/* Rating */}
        {/* <div className="mt-auto mb-3 flex items-center gap-1">
          <span className="text-sm font-medium text-gray-500">5{rating}</span>
          <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div> */}

        {/* Price and Add to Cart */}
        <div className="relative z-20 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">
            {actualPrice > 0 ? `AED ${actualPrice}` : 'Price TBD'}
          </span>
          <button
            onClick={handleQuickBuy}
            disabled={addToCartMutation.isPending}
            className="group/btn text-primary hover:bg-primary flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#d0e6d6] transition-all duration-300 hover:w-32 hover:text-white disabled:opacity-50"
            aria-label="Quick Buy"
          >
            {addToCartMutation.isPending ? (
              <LoadingOutlined className="text-xl" />
            ) : (
              <svg
                className="h-6 w-6 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            )}
            <span className="ml-0 max-w-0 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/btn:ml-2 group-hover/btn:max-w-[100px] group-hover/btn:opacity-100">
              {addToCartMutation.isPending ? 'Adding...' : 'Quick Buy'}
            </span>
          </button>
        </div>
      </div>

      {hasVariants && (
        <QuickBuyModal slug={slug} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default memo(ProductCard);
