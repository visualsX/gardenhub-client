'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Form, Input, Select, message, Spin, Skeleton, InputNumber, Space, Tooltip, Button } from 'antd';
import { useCart, useClearCart } from '@/hooks/cart/useCart';
import BagIcon from '@/public/shared/bag.svg';
import {
  usePaymentMethods,
  useShippingRates,
  usePlaceOrder,
  useValidateCoupon,
} from '@/hooks/useOrder';
import { UAE_EMIRATES } from '@/lib/const/emirates';
import { RadioCardGroup } from '@/components/ui/radio-card-group';
import { useCreateGuest } from '@/hooks/useGuestCheckout';
import {
  GUEST_CUSTOMER_ID,
  GUEST_EMAIL,
  TAX_RATE,
  USER_TOKEN,
} from '@/lib/const/global.variables';
import CheckoutSummary from '@/components/shared/checkout/CheckoutSummary';
import { CheckoutBox } from '@/components/wrappers/checkout-box';
import Link from 'next/link';
import { useStripe, useElements, CardNumberElement } from '@stripe/react-stripe-js';
import StripeCardForm from '@/components/shared/checkout/StripeCardForm';

const { Option } = Select;

export default function CheckoutPage({ customerProfile }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: cartData, isLoading: isCartLoading } = useCart();
  const { mutateAsync: clearCartApi } = useClearCart();
  const { data: paymentMethodsData, isLoading: isPaymentMethodsLoading } = usePaymentMethods();
  const { mutateAsync: placeOrderApi } = usePlaceOrder();
  const { mutateAsync: createGuestApi } = useCreateGuest();
  const { mutateAsync: validateCouponApi, isPending: isValidatingCoupon } = useValidateCoupon();
  // Watch shipping emirate to fetch rates
  const shippingEmirate = Form.useWatch(['shippingAddress', 'emirate'], form);
  const { data: shippingRates, isLoading: isShippingRatesLoading } =
    useShippingRates(shippingEmirate);

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [selectedShippingRateId, setSelectedShippingRateId] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponResponse, setCouponResponse] = useState(null);
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

  const discountAmount = couponResponse?.isValid ? couponResponse.discountAmount : 0;

  // New Tax Logic: Tax is added after shipping and discount
  const taxableAmount = subtotal + shippingCost - discountAmount;
  const tax = taxableAmount * TAX_RATE;
  const total = taxableAmount + tax;

  const totals = {
    subtotal: subtotal.toFixed(2),
    shipping: shippingCost.toFixed(2),
    tax: tax.toFixed(2),
    discount: discountAmount.toFixed(2),
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
            emirate: defaultShipping.emirate || 'Dubai',
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
            emirate: defaultBilling.emirate || 'Dubai',
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
      if (GUEST_EMAIL) {
        form.setFieldsValue({
          email: GUEST_EMAIL,
        });
      }
      form.setFieldsValue({
        shippingAddress: {
          emirate: 'Dubai',
        },
        billingAddress: {
          emirate: 'Dubai',
        },
      });
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

        if (GUEST_CUSTOMER_ID) {
          customerId = GUEST_CUSTOMER_ID;
        } else {
          const guestData = {
            email: values.email,
            firstName: values.shippingAddress.firstName,
            lastName: values.shippingAddress.lastName,
            phone: String(values.shippingAddress.phone),
          };

          const guestResponse = await createGuestApi(guestData);
          customerId = guestResponse.customerId;
          // Cookies are now set in the hook's onSuccess
        }
      }

      const shippingAddressObj = {
        firstName: values.shippingAddress.firstName,
        lastName: values.shippingAddress.lastName,
        phone: String(values.shippingAddress.phone),
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
          phone: String(values.billingAddress.phone),
          country: values.billingAddress.country || 'United Arab Emirates',
          emirate: values.billingAddress.emirate || 'NotSpecified',
          city: values.billingAddress.city,
          streetAddress: values.billingAddress.address,
          addressLine2: values.billingAddress.addressLine2 || '',
          postalCode: values.billingAddress.postalCode,
        };

      const selectedMethod = paymentMethodsData?.find((m) => m.id === selectedPaymentMethodId);
      let paymentToken = 'string'; // Default placeholder

      if (selectedMethod?.code === 'COD') {
        paymentToken = 'COD_TOKEN';
      } else {
        // Stripe Payment Logic
        if (!stripe || !elements) {
          message.error('Secure payment system is still loading. Please wait a moment.');
          return;
        }

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
          message.error('Please enter your card details');
          return;
        }

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (stripeError) {
          console.error('[Stripe Error]', stripeError);
          message.error(stripeError.message || 'Payment method validation failed');
          return;
        }

        paymentToken = paymentMethod.id;
      }

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
        couponCode: couponResponse?.isValid ? couponResponse.couponCode : '',
        paymentToken: paymentToken,
        paymentMethodId: selectedPaymentMethodId,
        note: values.note || '',
        items: items.map((item) => ({
          productId: item.productId || null,
          productBundleId: item.productBundleId || null,
          productVariantId: item.productVariantId || null,
          quantity: item.quantity,
          addons:
            item.addons?.map((addon) => ({
              globalAddonOptionId: addon.globalAddonOptionId || addon.id || null,
              quantity: addon.quantity || 1,
            })) || [],
        })),
      };

      // console.log('Order Payload:', payload);

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

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      message.warning('Please enter a coupon code');
      return;
    }

    try {
      const cartItems = items.map((item) => ({
        productId: item.productId || item.id,
        // productVariantId: item.productVariantId || item.variantId || null,
        quantity: item.quantity,
      }));

      const response = await validateCouponApi({
        couponCode,
        cartItems,
        orderSubtotal: subtotal,
        customerId: customerProfile?.id || GUEST_CUSTOMER_ID || null,
      });

      setCouponResponse(response);
      if (response.isValid) {
        message.success(response.message || 'Coupon applied successfully!');
      } else {
        message.error(response.message || 'Invalid coupon code');
      }
    } catch (error) {
      console.error('Coupon validation failed', error);
      message.error('Failed to validate coupon');
    }
  };

  const renderAddressFields = (prefix, title, dividers = 'py-4') => (
    <CheckoutBox loading={isCartLoading || !cartData} header title={title} dividers={dividers}>
      <main className="flex flex-col gap-y-3">
        <Form.Item
          className="mb-0!"
          label="Region/Emirate"
          name={[prefix, 'emirate']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Select className="h-9!" placeholder="Select emirate">
            {UAE_EMIRATES.map((emirate) => (
              <Option key={emirate.value} value={emirate.value}>
                {emirate.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item
            className="mb-0!"
            label="First Name"
            name={[prefix, 'firstName']}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input className="h-9!" placeholder="First Name" />
          </Form.Item>
          <Form.Item
            className="mb-0!"
            label="Last Name"
            name={[prefix, 'lastName']}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input className="h-9!" placeholder="Last Name" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item
            className="mb-0!"
            label="City"
            name={[prefix, 'city']}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input className="h-9!" placeholder="City" />
          </Form.Item>

          <Form.Item className="mb-0!" label="Postal Code (optional)" name={[prefix, 'postalCode']}>
            <Input className="h-9!" placeholder="00000" />
          </Form.Item>
        </div>

        <div className="relative">
          <Form.Item
            className="mb-0!"
            label="Phone Number"
            name={[prefix, 'phone']}
            rules={[{ required: true, message: 'Required' }]}
          >
            <InputNumber
              type={'number'}
              className="w-full! h-9!"
              placeholder="+971 50 123 4567"

            />

          </Form.Item>
          <div className="absolute top-0 right-0">
            <Tooltip placement="top" title={'In case we need to contact you about your order'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </Tooltip>
          </div>
        </div>

        <Form.Item
          className="mb-0!"
          label="Address"
          name={[prefix, 'address']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input.TextArea rows={2} placeholder="Street address" />
        </Form.Item>

        <Form.Item
          className="mb-0!"
          label="Apartment, suite, etc. (optional)"
          name={[prefix, 'addressLine2']}
        >
          <Input className="h-9!" placeholder="Apt 4B" />
        </Form.Item>

        <Form.Item
          className="mb-0!"
          name={[prefix, 'country']}
          hidden
          initialValue="United Arab Emirates"
        >
          <Input />
        </Form.Item>
        <Form.Item className="mb-0!" name={[prefix, 'addressId']} hidden>
          <Input />
        </Form.Item>
      </main>
    </CheckoutBox>
  );

  return (
    <main className="bg-white">
      <div className="min-h-screen">
        <Form requiredMark={false} form={form} layout="vertical" onFinish={handlePlaceOrder}>
          <div className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            <section className="flex flex-col items-center px-4 py-5 lg:items-end lg:justify-end lg:pr-10">
              <div className="w-full max-w-[500px]">
                <div className="flex items-end justify-between pb-6">
                  <Link
                    href={'/'}
                    className="text-primary! cursor-pointer text-3xl font-bold md:text-5xl"
                  >
                    Gardenhub
                  </Link>
                  <Link href={'/cart'} className="flex items-center gap-2">
                    <BagIcon className="h-8 w-8 text-primary" />
                  </Link>
                </div>
                <CheckoutBox
                  className="relative pb-4"
                  dividers={null}
                  loading={isCartLoading || !cartData}
                >
                  {!USER_TOKEN && (
                    <Tooltip placement="top" title="We recommend logging in to continue">
                      <Link
                        className="text-primary! absolute top-0 right-0 z-10 cursor-pointer! underline!"
                        href="/auth/login"
                      >
                        Login
                      </Link>
                    </Tooltip>
                  )}
                  <p className="pb-2! text-xl font-semibold">Contact</p>
                  <Form.Item
                    // label="Email"
                    name="email"
                    className="mb-0!"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input className="h-9!" placeholder="email@example.com" />
                  </Form.Item>
                </CheckoutBox>

                {/* Shipping Address */}
                {renderAddressFields('shippingAddress', 'Shipping Address')}

                {/* Shipping Method Selection */}
                <CheckoutBox loading={isCartLoading || !cartData} header title="Shipping Method">
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
                </CheckoutBox>
                {/* Payment Method */}
                <CheckoutBox loading={isCartLoading || !cartData} header title="Payment Method">
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
                          <span className="font-medium text-gray-900">{method.name}</span>
                        ),
                        rightContent: method.code !== 'COD' && (
                          <div className="flex items-center gap-1.5">
                            <img src="/visa.svg" alt="Visa" className="h-6 w-auto" />
                            <img src="/mastercard.svg" alt="Mastercard" className="h-6 w-auto" />
                            <img src="/unionpay.svg" alt="UnionPay" className="h-6 w-auto" />
                          </div>
                        ),
                        expandableContent: method.code === 'COD' ? (
                          <div className="text-sm leading-relaxed text-gray-500">
                            Cash on Delivery (COD) is a payment option that allows the buyer to pay when the product is delivered to customer. Once the courier has received the money, only then will he give the parcel to the customer.
                          </div>
                        ) : (
                          <StripeCardForm />
                        )
                      }))}
                    />
                  )}
                </CheckoutBox>

                {/* Billing Address Toggle and Form */}
                <CheckoutBox
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
                        {
                          value: false,
                          content: 'Use a different billing address',
                          expandableContent: (
                            <div className="pt-2">
                              {renderAddressFields('billingAddress', 'Billing Address Details', 'py-0')}
                            </div>
                          )
                        },
                      ]}
                    />
                  </Form.Item>
                </CheckoutBox>

                {/* Mobile Place Order */}
                <div className="">
                  <Button
                    htmlType='submit'
                    loading={isProcessing}
                    disabled={isProcessing}
                    className="bg-primary! hover:bg-primary-dark! w-full rounded-full! h-12! py-4! font-bold! text-white! transition-all! hover:shadow-xl! disabled:cursor-not-allowed! disabled:opacity-50!"
                  >
                    {isProcessing ? 'Processing...' : `Place Order - AED ${totals.total}`}
                  </Button>
                </div>
              </div>
            </section>

            {/* Sidebar */}
            <section className="bg-gray-100 px-4 py-5 lg:pl-10">
              <div className="sticky top-5 max-w-[500px] space-y-6">
                <CheckoutSummary
                  items={items}
                  totals={totals}
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  couponResponse={couponResponse}
                  setCouponResponse={setCouponResponse}
                  isValidatingCoupon={isValidatingCoupon}
                  handleApplyCoupon={handleApplyCoupon}
                  isCartLoading={isCartLoading}
                  cartData={cartData}
                />

                {/* <div className="hidden lg:block">
                  <Button
                    htmlType='submit'
                    loading={isProcessing}
                    disabled={isProcessing}
                    className="bg-primary! hover:bg-primary-dark! w-full rounded-full! h-12! py-4! font-bold! text-white! transition-all! hover:shadow-xl! disabled:cursor-not-allowed! disabled:opacity-50!"
                  >
                    {isProcessing ? 'Processing...' : `Place Order - AED ${totals.total}`}
                  </Button>
                </div> */}

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
            </section>
          </div>
        </Form>
      </div >
    </main >
  );
}
