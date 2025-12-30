'use client';

import { useEffect } from 'react';
import { useCustomerProfile } from '@/hooks/useCustomerProfile';
import { useUpdateProfile, useDeleteAccount } from '@/hooks/useCustomerMutations';
import { Input, Button, Form, Modal, Spin } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

export default function ProfileForm({ initialProfile }) {
    const [form] = Form.useForm();

    // Use custom hook seeded with initial SSR data
    const { data: profileData, isLoading } = useCustomerProfile(initialProfile);
    const customerProfile = profileData?.customerProfile;

    // Mutations
    const updateProfile = useUpdateProfile();
    const deleteAccount = useDeleteAccount();

    useEffect(() => {
        if (customerProfile) {
            form.setFieldsValue({
                firstName: customerProfile.firstName,
                lastName: customerProfile.lastName,
                email: customerProfile.email,
            });
        }
    }, [customerProfile, form]);

    const onFinish = (values) => {
        const { firstName, lastName, email } = values;
        updateProfile.mutate({
            customerId: customerProfile?.id || "string",
            firstName,
            lastName,
            email,
        });
    };

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure you want to delete your account?',
            icon: <ExclamationCircleFilled />,
            content: 'This action cannot be undone. All your data will be permanently removed.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteAccount.mutate();
            },
        });
    };

    // If loading initially without cache (should rarely happen if SSR worked), show spinner
    if (isLoading && !customerProfile) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-500">Manage your personal information</p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                        <Input size="large" placeholder="John" />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                        <Input size="large" placeholder="Doe" />
                    </Form.Item>
                </div>

                <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input size="large" placeholder="john@example.com" disabled />
                </Form.Item>

                <div className="pt-4">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={updateProfile.isPending}
                        className="bg-primary hover:bg-primary-dark w-full md:w-auto"
                    >
                        Save Changes
                    </Button>
                </div>
            </Form>

            <div className="mt-12 border-t border-gray-100 pt-8">
                <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                    danger
                    size="large"
                    className="mt-4"
                    onClick={showDeleteConfirm}
                    loading={deleteAccount.isPending}
                >
                    Delete Account
                </Button>
            </div>
        </div>
    );
}
