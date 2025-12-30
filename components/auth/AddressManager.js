'use client';

import { useState } from 'react';
import { useCustomerProfile } from '@/hooks/useCustomerProfile';
import {
    useAddAddress,
    useUpdateAddress,
    useDeleteAddress,
    useSetDefaultBillingAddress,
    useSetDefaultShippingAddress,
} from '@/hooks/useCustomerMutations';
import { Button, Modal, Form, Input, Checkbox, Tag, Space, Card, Spin, Tooltip, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { UAE_EMIRATES } from '@/lib/const/emirates';

export default function AddressManager({ initialData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [form] = Form.useForm();

    const { data: profileData, isLoading } = useCustomerProfile(initialData);

    const addresses = profileData?.customerProfile?.addresses || [];
    const customerId = profileData?.customerProfile?.id;

    // Mutations
    const addAddress = useAddAddress();
    const updateAddress = useUpdateAddress();
    const deleteAddress = useDeleteAddress();
    const setDefaultBillingAddress = useSetDefaultBillingAddress();
    const setDefaultShippingAddress = useSetDefaultShippingAddress();

    const handleEdit = (address) => {
        setEditingAddress(address);
        form.setFieldsValue(address);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingAddress(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Delete Address',
            content: 'Are you sure you want to delete this address?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => deleteAddress.mutate(id),
        });
    };

    const handleSetDefaultBillingAddress = (id) => {
        setDefaultBillingAddress.mutate(id);
    };
    const handleSetDefaultShippingAddress = (id) => {
        setDefaultShippingAddress.mutate(id);
    };

    const onFinish = (values) => {
        const payload = {
            ...values,
            customerId: customerId || "string",
            isDefaultShipping: values.isDefaultBilling || false,
            isDefaultBilling: values.isDefaultShipping || false,
        };

        if (editingAddress) {
            updateAddress.mutate(
                { id: editingAddress.id, data: { ...payload, id: editingAddress.id } },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        form.resetFields();
                    },
                }
            );
        } else {
            addAddress.mutate(payload, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.resetFields();
                },
            });
        }
    };

    if (isLoading && !profileData) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Address Book</h1>
                    <p className="text-gray-500">Manage your shipping and billing addresses</p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    className="bg-primary hover:bg-primary-dark"
                >
                    Add New Address
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {addresses.map((addr) => (
                    <Card
                        key={addr.id}
                        className="border-with-radius shadow-sm transition-shadow hover:shadow-md"
                        // Added badges for default status
                        title={
                            <div className="flex flex-wrap gap-2 pt-4">
                                {addr.isDefaultBilling && <Tag color="gold" icon={<StarFilled />}>Default Billing</Tag>}
                                {addr.isDefaultShipping && <Tag color="blue" icon={<StarFilled />}>Default Shipping</Tag>}
                            </div>
                        }
                        headStyle={{ borderBottom: 'none', paddingBottom: 0, minHeight: 'auto' }}
                        actions={[
                            <Tooltip title="Set as Default Billing" key="billing">
                                <Button
                                    type="text"
                                    icon={addr.isDefaultBilling ? <StarFilled className="text-yellow-500" /> : <StarOutlined />}
                                    onClick={() => !addr.isDefaultBilling && handleSetDefaultBillingAddress(addr.id)}
                                    disabled={addr.isDefaultBilling}
                                />
                            </Tooltip>,
                            <Tooltip title="Set as Default Shipping" key="shipping">
                                <Button
                                    type="text"
                                    icon={addr.isDefaultShipping ? <StarFilled className="text-blue-500" /> : <StarOutlined />}
                                    onClick={() => !addr.isDefaultShipping && handleSetDefaultShippingAddress(addr.id)}
                                    disabled={addr.isDefaultShipping}
                                />
                            </Tooltip>,
                            <Tooltip title="Edit Address" key="edit">
                                <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(addr)} />
                            </Tooltip>,
                            <Tooltip title="Delete Address" key="delete">
                                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(addr.id)} />
                            </Tooltip>,
                        ]}
                    >
                        <div className="space-y-1 text-sm text-gray-600 -mt-2">
                            <div className="mb-2 text-lg font-bold text-gray-900">
                                {addr.firstName} {addr.lastName}
                            </div>
                            <p>{addr.streetAddress}</p>
                            {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                            <p>
                                {addr.city}, {addr.postalCode}
                            </p>
                            <p>{addr.country}</p>
                            <p className="mt-2 text-gray-400">{addr.phone}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {addresses.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-200 p-12 text-center text-gray-500">
                    No addresses found. Add one to get started.
                </div>
            )}

            {/* Address Modal */}
            <Modal
                title={editingAddress ? 'Edit Address' : 'Add New Address'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="mt-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input placeholder="+1 234 567 890" />
                    </Form.Item>

                    <Form.Item
                        name="streetAddress"
                        label="Street Address"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input placeholder="123 Main St" />
                    </Form.Item>

                    <Form.Item
                        name="addressLine2"
                        label="Apartment, suite, etc. (optional)"
                    >
                        <Input placeholder="Apt 4B" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="city"
                            label="City"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="City" />
                        </Form.Item>
                        <Form.Item
                            name="postalCode"
                            label="Postal Code"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="10001" />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="country"
                            label="Country"
                            initialValue="United Arab Emirates"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Select placeholder="Select Country">
                                <Select.Option value="United-Arab-Emirates">United Arab Emirates</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="emirate"
                            label="State/Emirate"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Select placeholder="Select Emirate" options={UAE_EMIRATES} />
                        </Form.Item>
                    </div>

                    <Form.Item name="isDefaultBilling" valuePropName="checked">
                        <Checkbox>Set as default billing address</Checkbox>
                    </Form.Item>
                    <Form.Item name="isDefaultShipping" valuePropName="checked">
                        <Checkbox>Set as default shipping address</Checkbox>
                    </Form.Item>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={addAddress.isPending || updateAddress.isPending}
                            className="bg-primary hover:bg-primary-dark"
                        >
                            {editingAddress ? 'Update Address' : 'Save Address'}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
