// Dummy cart data for testing
export const DUMMY_CART_ITEMS = [
  {
    id: 'prod-001',
    variantId: 'var-001',
    name: 'Monstera Deliciosa',
    variant: 'Large - 12" Pot',
    price: 149.99,
    salePrice: 0,
    quantity: 1,
    image: '/products/monstera.jpg',
  },
  {
    id: 'prod-002',
    variantId: 'var-002',
    name: 'Snake Plant',
    variant: 'Medium - 8" Pot',
    price: 89.99,
    salePrice: 69.99,
    quantity: 2,
    image: '/products/snake-plant.jpg',
  },
  {
    id: 'prod-003',
    variantId: 'var-003',
    name: 'Fiddle Leaf Fig',
    variant: 'Large - 14" Pot',
    price: 199.99,
    salePrice: 0,
    quantity: 1,
    image: '/products/fiddle-leaf.jpg',
  },
  {
    id: 'prod-004',
    variantId: 'var-004',
    name: 'Peace Lily',
    variant: 'Small - 6" Pot',
    price: 49.99,
    salePrice: 39.99,
    quantity: 1,
    image: '/products/peace-lily.jpg',
  },
];

// Helper function to populate cart with dummy data
export const populateDummyCart = (cartStore) => {
  DUMMY_CART_ITEMS.forEach((item) => {
    cartStore.getState().addToCart(item);
  });
};
