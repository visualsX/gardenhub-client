'use client';

import { useState, useEffect, useRef } from 'react';
import { Input, Tabs, Empty, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';
import SearchIcon from '@/public/shared/search.svg';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const inputRef = useRef(null);

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setDebouncedQuery('');
    }
  }, [open]);

  const { data, isLoading } = useSearchSuggestions(debouncedQuery);

  const renderProductItem = (product) => (
    <Link
      key={product.id}
      href={`/products/${product.slug}`}
      onClick={onClose}
      className="flex items-center gap-4 border-b border-gray-100 p-4 transition-colors hover:bg-gray-50"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.mainImageUrl || '/all/image-placeholder.svg'}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-primary-dark text-sm font-semibold">{product.name}</h4>
        <p className="text-xs text-gray-500">AED {product.price}</p>
      </div>
    </Link>
  );

  const renderCollectionItem = (collection) => (
    <Link
      key={collection.id}
      href={`/collections/${collection.slug}`}
      onClick={onClose}
      className="flex items-center gap-4 border-b border-gray-100 p-4 transition-colors hover:bg-gray-50"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={collection.imageUrl || '/all/image-placeholder.svg'}
          alt={collection.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-primary-dark text-sm font-semibold">{collection.name}</h4>
        <p className="text-xs text-gray-500">{collection.productCount} products</p>
      </div>
    </Link>
  );

  return (
    <Modal open={open} onCancel={onClose} closable={false} placement="top" footer={null}>
      <div className="flex h-full flex-col">
        {/* Floating Search Card */}
        {/* Search Header */}
        <div className="flex items-center gap-2 border-b border-gray-200 px-6">
          <SearchIcon />
          <Input
            allowClear
            ref={inputRef}
            placeholder="Search for..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-lg font-medium text-[#425d48] placeholder:text-gray-400"
            variant="borderless"
          />
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close search"
          >
            <CloseOutlined className="text-xl" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4" style={{ height: '100%' }}>
          {debouncedQuery && (
            <div>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                className="custom-search-tabs"
                items={[
                  {
                    key: 'products',
                    label: `Products`,
                    children: isLoading ? (
                      <div className="text-primary-dark py-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative h-12 w-12">
                            <div className="border-primary/20 absolute inset-0 rounded-full border-2"></div>
                            <div className="border-primary absolute inset-0 animate-spin rounded-full border-t-2"></div>
                          </div>
                          <span className="animate-pulse text-sm font-medium">
                            Searching products...
                          </span>
                        </div>
                      </div>
                    ) : data?.products.length > 0 ? (
                      <div className="flex flex-col">{data.products.map(renderProductItem)}</div>
                    ) : (
                      <Empty description="No products found" className="py-12" />
                    ),
                  },
                  {
                    key: 'collections',
                    label: `Collections`,
                    children: isLoading ? (
                      <div className="text-primary-dark py-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative h-12 w-12">
                            <div className="border-primary/20 absolute inset-0 rounded-full border-2"></div>
                            <div className="border-primary absolute inset-0 animate-spin rounded-full border-t-2"></div>
                          </div>
                          <span className="animate-pulse text-sm font-medium">
                            Searching collections...
                          </span>
                        </div>
                      </div>
                    ) : data?.collections.length > 0 ? (
                      <div className="flex flex-col">
                        {data.collections.map(renderCollectionItem)}
                      </div>
                    ) : (
                      <Empty description="No collections found" className="py-12" />
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
