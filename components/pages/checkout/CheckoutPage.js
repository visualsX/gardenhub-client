'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Form, Input, Select, message, Spin, Skeleton } from 'antd';
import { useCart, useClearCart } from '@/hooks/cart/useCart';
import { usePaymentMethods, useShippingRates, usePlaceOrder } from '@/hooks/useOrder';
import { UAE_EMIRATES } from '@/lib/const/emirates';
import { Box } from '@/components/wrappers/box';
import { RadioCardGroup } from '@/components/ui/radio-card-group';
import { useCreateGuest } from '@/hooks/useGuestCheckout';
import { getCookie } from '@/lib/utils/cookie';

const { Option } = Select;

export default function CheckoutPage({ customerProfile }) {
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: cartData, isLoading: isCartLoading } = useCart();
  const { mutateAsync: clearCartApi } = useClearCart();
  const { data: paymentMethodsData, isLoading: isPaymentMethodsLoading } = usePaymentMethods();
  const { mutateAsync: placeOrderApi } = usePlaceOrder();
  const { mutateAsync: createGuestApi } = useCreateGuest();

  // Watch shipping emirate to fetch rates
  const shippingEmirate = Form.useWatch(['shippingAddress', 'emirate'], form);
  const { data: shippingRates, isLoading: isShippingRatesLoading } =
    useShippingRates(shippingEmirate);

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [selectedShippingRateId, setSelectedShippingRateId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const items = cartData?.items || [];
  const subtotal = cartData?.subtotal || 0;

  // Calculate Totals based on selected shipping rate
  const selectedShippingRate = shippingRates?.find((rate) => rate.id === selectedShippingRateId);

  // Logic: If subtotal > threshold, use 0, else use baseCost.
  const shippingCost = selectedShippingRate
    ? subtotal >= (selectedShippingRate.freeShippingThreshold || Infinity)
      ? 0
      : selectedShippingRate.baseCost
    : 0;

  const tax = subtotal * 0.05;
  const total = subtotal + shippingCost + tax;

  const totals = {
    subtotal: subtotal.toFixed(2),
    shipping: shippingCost.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
  };

  // Pre-fill form
  useEffect(() => {
    if (customerProfile) {
      const { addresses, email, firstName, lastName } = customerProfile;
      const defaultShipping = addresses?.find((a) => a.isDefaultShipping) || addresses?.[0];
      const realDefaultBilling = addresses?.find((a) => a.isDefaultBilling);
      // Fallback for billing: use real default billing, or default shipping, or first address
      const defaultBilling = realDefaultBilling || defaultShipping || addresses?.[0];

      form.setFieldsValue({
        email: email,
        shippingAddress: defaultShipping
          ? {
            addressId: defaultShipping.id,
            firstName: defaultShipping.firstName,
            lastName: defaultShipping.lastName,
            phone: defaultShipping.phone,
            address: defaultShipping.streetAddress,
            addressLine2: defaultShipping.addressLine2,
            city: defaultShipping.city,
            emirate: defaultShipping.emirate,
            postalCode: defaultShipping.postalCode,
            country: defaultShipping.country || 'United Arab Emirates',
          }
          : {
            firstName: firstName,
            lastName: lastName,
            country: 'United Arab Emirates',
          },
        billingAddress: defaultBilling
          ? {
            addressId: defaultBilling.id,
            firstName: defaultBilling.firstName,
            lastName: defaultBilling.lastName,
            phone: defaultBilling.phone,
            address: defaultBilling.streetAddress,
            addressLine2: defaultBilling.addressLine2,
            city: defaultBilling.city,
            emirate: defaultBilling.emirate,
            postalCode: defaultBilling.postalCode,
            country: defaultBilling.country || 'United Arab Emirates',
          }
          : {
            firstName: firstName,
            lastName: lastName,
            country: 'United Arab Emirates',
          },
      });

      // Only switch to "Different billing address" if we explicitly have a billing address that is different from shipping
      if (defaultShipping && realDefaultBilling && defaultShipping.id !== realDefaultBilling.id) {
        setBillingSameAsShipping(false);
      }
    } else {
      // If not logged in, check for guest email cookie
      const guestEmail = getCookie('guest_email');
      if (guestEmail) {
        form.setFieldsValue({ email: guestEmail });
      }
    }
  }, [customerProfile, form]);

  // Auto-select first shipping rate
  useEffect(() => {
    if (shippingRates?.length > 0 && !selectedShippingRateId) {
      // Prefer 'Standard' or first available
      const defaultRate = shippingRates.find((r) => r.rateName === 'Standard') || shippingRates[0];
      setSelectedShippingRateId(defaultRate.id);
    }
  }, [shippingRates]);

  // Auto-select first payment method
  useEffect(() => {
    if (paymentMethodsData?.length > 0 && !selectedPaymentMethodId) {
      setSelectedPaymentMethodId(paymentMethodsData[0].id);
    }
  }, [paymentMethodsData]);

  const handlePlaceOrder = async (values) => {
    if (!selectedShippingRateId) {
      message.error('Please select a shipping method');
      return;
    }
    if (!selectedPaymentMethodId) {
      message.error('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    try {
      let customerId = customerProfile?.id;

      // If not logged in, check for existing guest or create new
      if (!customerId) {
        // Check if we already have a guest session
        const existingGuestId = getCookie('guest_customer_id');

        if (existingGuestId) {
          customerId = existingGuestId;
        } else {
          const guestData = {
            email: values.email,
            firstName: values.shippingAddress.firstName,
            lastName: values.shippingAddress.lastName,
            phone: values.shippingAddress.phone,
          };

          const guestResponse = await createGuestApi(guestData);
          customerId = guestResponse.customerId;
          // Cookies are now set in the hook's onSuccess
        }
      }

      const shippingAddressObj = {
        firstName: values.shippingAddress.firstName,
        lastName: values.shippingAddress.lastName,
        phone: values.shippingAddress.phone,
        country: values.shippingAddress.country || 'United Arab Emirates',
        emirate: values.shippingAddress.emirate || 'NotSpecified',
        city: values.shippingAddress.city,
        streetAddress: values.shippingAddress.address,
        addressLine2: values.shippingAddress.addressLine2 || '',
        postalCode: values.shippingAddress.postalCode,
      };

      const billingAddressObj = billingSameAsShipping
        ? { ...shippingAddressObj }
        : {
          firstName: values.billingAddress.firstName,
          lastName: values.billingAddress.lastName,
          phone: values.billingAddress.phone,
          country: values.billingAddress.country || 'United Arab Emirates',
          emirate: values.billingAddress.emirate || 'NotSpecified',
          city: values.billingAddress.city,
          streetAddress: values.billingAddress.address,
          addressLine2: values.billingAddress.addressLine2 || '',
          postalCode: values.billingAddress.postalCode,
        };

      const payload = {
        idempotencyKey: crypto.randomUUID(),
        customerId: customerId,
        shippingAddressId: values.shippingAddress?.addressId || 0,
        billingAddressId: billingSameAsShipping
          ? values.shippingAddress?.addressId || 0
          : values.billingAddress?.addressId || 0,
        shippingAddress: shippingAddressObj,
        billingAddress: billingAddressObj,
        shippingRateId: selectedShippingRateId,
        couponCode: '',
        paymentToken: 'string', // Placeholder
        paymentMethodId: selectedPaymentMethodId,
        items: items.map((item) => ({
          productId: item.productId || item.id,
          productVariantId: item.productVariantId || item.variantId || null,
          quantity: item.quantity,
          addons:
            item.addons?.map((addon) => ({
              globalAddonOptionId: addon.globalAddonOptionId || addon.id || null,
              quantity: addon.quantity || 1,
            })) || [],
        })),
      };

      console.log('Order Payload:', payload);

      await placeOrderApi(payload);

      message.success('Order placed successfully!');
      await clearCartApi();
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Order failed', error);
      message.error('Failed to place order: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsProcessing(false);
    }
  };

  const renderAddressFields = (prefix, title) => (
    <Box loading={isCartLoading || !cartData} header title={title} padding="p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Form.Item
          label="First Name"
          name={[prefix, 'firstName']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name={[prefix, 'lastName']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
      </div>

      <Form.Item
        label="Phone Number"
        name={[prefix, 'phone']}
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input placeholder="+971 50 123 4567" />
      </Form.Item>

      <Form.Item
        label="Address"
        name={[prefix, 'address']}
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input.TextArea rows={2} placeholder="Street address" />
      </Form.Item>

      <Form.Item label="Apartment, suite, etc. (optional)" name={[prefix, 'addressLine2']}>
        <Input placeholder="Apt 4B" />
      </Form.Item>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Form.Item
          label="City"
          name={[prefix, 'city']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item
          label="Emirate"
          name={[prefix, 'emirate']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Select className="h-10!" placeholder="Select emirate">
            {UAE_EMIRATES.map((emirate) => (
              <Option key={emirate.value} value={emirate.value}>
                {emirate.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Postal Code"
          name={[prefix, 'postalCode']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input placeholder="00000" />
        </Form.Item>
      </div>
      <Form.Item name={[prefix, 'country']} hidden initialValue="United Arab Emirates">
        <Input />
      </Form.Item>
      <Form.Item name={[prefix, 'addressId']} hidden>
        <Input />
      </Form.Item>
    </Box>
  );

  return (
    <div className="max-layout min-h-screen py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Form form={form} layout="vertical" onFinish={handlePlaceOrder}>
            {/* Contact Information */}
            <Box loading={isCartLoading || !cartData} header title="Contact" padding="p-5 mb-6">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="email@example.com" />
              </Form.Item>
            </Box>

            {/* Shipping Address */}
            {renderAddressFields('shippingAddress', 'Shipping Address')}

            {/* Shipping Method Selection */}
            <Box
              loading={isCartLoading || !cartData}
              header
              title="Shipping Method"
              padding="p-5 mt-6"
            >
              <Skeleton loading={isShippingRatesLoading}>
                <RadioCardGroup
                  value={selectedShippingRateId}
                  onChange={(e) => setSelectedShippingRateId(e.target.value)}
                  options={shippingRates?.map((rate) => {
                    const cost =
                      subtotal >= (rate.freeShippingThreshold || Infinity) ? 0 : rate.baseCost;
                    return {
                      value: rate.id,
                      content: rate.rateName,
                      rightContent: cost === 0 ? 'Free' : `AED ${cost.toFixed(2)}`,
                    };
                  })}
                />
              </Skeleton>
            </Box>

            {/* Payment Method */}
            <Box
              loading={isCartLoading || !cartData}
              header
              title="Payment Method"
              padding="p-5 mt-6"
            >
              {isPaymentMethodsLoading ? (
                <div className="py-4 text-center">
                  <Spin />
                </div>
              ) : (
                <RadioCardGroup
                  value={selectedPaymentMethodId}
                  onChange={(e) => setSelectedPaymentMethodId(e.target.value)}
                  options={paymentMethodsData?.map((method) => ({
                    value: method.id,
                    content: (
                      <div className="flex items-center gap-3">
                        <span className="text-2xl leading-none">
                          {method.code === 'COD' ? '💵' : '💳'}
                        </span>
                        <span className="font-medium text-black">{method.name}</span>
                      </div>
                    ),
                  }))}
                />
              )}

              {/* Dummy Card Inputs just for visuals if Card payment selected (assuming not COD) */}
              {selectedPaymentMethodId &&
                paymentMethodsData?.find(
                  (m) => m.id === selectedPaymentMethodId && m.code !== 'COD'
                ) && (
                  <div className="mt-6 space-y-4 rounded-xl bg-gray-50 p-4">
                    <div className="grid grid-cols-1 gap-4">
                      <Input
                        placeholder="Card number"
                        prefix={<span className="text-gray-400">💳</span>}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="MM / YY" />
                        <Input placeholder="CVC" />
                      </div>
                    </div>
                  </div>
                )}
            </Box>

            {/* Billing Address Toggle and Form */}
            <Box
              loading={isCartLoading || !cartData}
              header
              title="Billing Address"
              padding="p-5 mt-6"
            >
              <Form.Item>
                <RadioCardGroup
                  value={billingSameAsShipping}
                  onChange={(e) => setBillingSameAsShipping(e.target.value)}
                  options={[
                    { value: true, content: 'Same as shipping address' },
                    { value: false, content: 'Use a different billing address' },
                  ]}
                />
              </Form.Item>

              {!billingSameAsShipping && (
                <div className="mt-6 border-t border-gray-100 pt-6">
                  {renderAddressFields('billingAddress', 'Billing Address Details')}
                </div>
              )}
            </Box>

            {/* Mobile Place Order */}
            <div className="mt-6 lg:hidden">
              <button
                type="submit"
                disabled={isProcessing}
                className="bg-primary hover:bg-primary-dark w-full rounded-full py-4 font-bold text-white transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : `Place Order - AED ${totals.total}`}
              </button>
            </div>
          </Form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-10 space-y-6">
            <Box loading={isCartLoading || !cartData} header title="Order Summary" padding="p-5">
              <div className="max-h-64 space-y-3 overflow-y-auto py-4">
                {items.map((item) => {
                  const name = item.productName || item.name;
                  const imageUrl = item.imageUrl || item.image || '/all/image-placeholder.svg';
                  const variantLabel = item.variantAttributes || item.variant;
                  const unitPrice = item.salePrice > 0 ? item.salePrice : item.price;
                  const total = item.itemTotal
                    ? parseFloat(item.itemTotal).toFixed(2)
                    : (unitPrice * item.quantity).toFixed(2);

                  return (
                    <div
                      key={`${item.id || item.productId}-${item.variantId || item.productVariantId || 'default'}`}
                      className="flex gap-2"
                    >
                      <div className="relative h-16 w-16 rounded-xl">
                        <img
                          src={imageUrl}
                          alt={name}
                          className="h-full w-full rounded-xl object-cover"
                        />
                        <span className="bg-primary absolute -top-2 -right-1 z-30 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="line-clamp-1 text-sm font-semibold text-gray-900">{name}</h4>
                        {variantLabel && <p className="text-xs text-gray-500">{variantLabel}</p>}
                        <p className="text-primary mt-1 text-sm font-bold">AED {total}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-semibold text-gray-900">AED {totals.subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {parseFloat(totals.shipping) === 0 ? 'FREE' : `AED ${totals.shipping}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tax (5%)</span>
                  <span className="text-sm font-semibold text-gray-900">AED {totals.tax}</span>
                </div>
                <div className="flex items-center justify-between border-t-2 border-gray-200 pt-3">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-primary text-2xl font-bold">AED {totals.total}</span>
                </div>
              </div>
            </Box>

            <div className="hidden lg:block">
              <button
                onClick={() => form.submit()}
                disabled={isProcessing}
                className="bg-primary hover:bg-primary-dark w-full rounded-full py-4 font-bold text-white transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : `Place Order - AED ${totals.total}`}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
