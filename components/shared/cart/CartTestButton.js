'use client';

import useCartStore from '@/lib/store/cart';

export default function CartTestButton() {
    const { addToCart } = useCartStore();

    const addDummyData = () => {
        // Add dummy products to cart
        const dummyProducts = [
            {
                id: 'prod-001',
                variantId: 'var-001',
                name: 'Monstera Deliciosa',
                variant: 'Large - 12" Pot',
                price: 149.99,
                salePrice: 0,
                quantity: 1,
                image: '/all/image-placeholder.svg',
            },
            {
                id: 'prod-002',
                variantId: 'var-002',
                name: 'Snake Plant',
                variant: 'Medium - 8" Pot',
                price: 89.99,
                salePrice: 69.99,
                quantity: 2,
                image: '/all/image-placeholder.svg',
            },
            {
                id: 'prod-003',
                variantId: 'var-003',
                name: 'Fiddle Leaf Fig',
                variant: 'Large - 14" Pot',
                price: 199.99,
                salePrice: 0,
                quantity: 1,
                image: '/all/image-placeholder.svg',
            },
        ];

        dummyProducts.forEach((product) => {
            addToCart(product);
        });
    };

    return (
        <button
            onClick={addDummyData}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-xl transition-all hover:bg-primary-dark hover:shadow-2xl"
        >
            Add Test Cart Items
        </button>
    );
}
