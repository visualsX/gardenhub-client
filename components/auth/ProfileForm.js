'use client';

import { useEffect, useState } from 'react';
import { useCustomerProfile } from '@/hooks/useCustomerProfile';
import { useUpdateProfile, useDeleteAccount } from '@/hooks/useCustomerMutations';
import { Input, Button, Form, Modal, Spin } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

export default function ProfileForm({ initialProfile }) {
  const [form] = Form.useForm();

  // Use custom hook seeded with initial SSR data
  const { data: profileData, isLoading } = useCustomerProfile(initialProfile);
  const customerProfile = profileData?.customerProfile;

  // Mutations
  const updateProfile = useUpdateProfile();
  const deleteAccount = useDeleteAccount();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

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
      customerId: customerProfile?.id || 'string',
      firstName,
      lastName,
      email,
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
          onClick={() => setIsDeleteModalOpen(true)}
          loading={deleteAccount.isPending}
        >
          Delete Account
        </Button>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2 text-red-600">
            <ExclamationCircleFilled /> Delete Account
          </div>
        }
        open={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeleteConfirmationText('');
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setDeleteConfirmationText('');
            }}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            danger
            type="primary"
            loading={deleteAccount.isPending}
            disabled={deleteConfirmationText !== customerProfile?.email}
            onClick={() => deleteAccount.mutate()}
          >
            I understand, delete my account
          </Button>,
        ]}
      >
        <div className="space-y-4 pt-2">
          <div className="rounded-md border border-red-100 bg-red-50 p-4 text-red-800">
            <p className="font-medium">Unexpected bad things will happen if you don’t read this!</p>
            <ul className="ml-5 list-disc text-sm">
              <li>
                This will permanently delete your <span className="font-semibold">GardenHub</span>{' '}
                account.
              </li>
              <li>
                All your data, including orders and saved addresses, will be wiped immediately.
              </li>
              <li>This action cannot be undone.</li>
            </ul>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-600">
              To confirm, type{' '}
              <span className="font-mono font-bold text-gray-900">{customerProfile?.email}</span> in
              the box below
            </p>
            <Input
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              placeholder={customerProfile?.email}
              className="w-full"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
