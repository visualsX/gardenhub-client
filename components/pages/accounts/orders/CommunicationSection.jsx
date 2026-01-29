'use client';

import React, { useRef, useEffect } from 'react';
import { Button, Input, Form } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Box } from '@/components/wrappers/box';
import { useAddOrderNote } from '@/hooks/useOrder';

const CommunicationSection = ({ order, isLoading, refetch }) => {
  const [form] = Form.useForm();
  const { mutate: addNote, isPending } = useAddOrderNote();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (order?.notes) {
      scrollToBottom();
    }
  }, [order?.notes]);

  const onFinish = (values) => {
    if (!values.message?.trim()) return;

    addNote(
      {
        id: order.id,
        data: {
          orderId: order.id,
          message: values.message,
        },
      },
      {
        onSuccess: () => {
          form.resetFields();
          refetch();
        },
      }
    );
  };

  return (
    <Box
      loading={isLoading}
      header
      title="Communication"
      description="Chat with our support team regarding your order"
      classRest="bg-white shadow-sm"
    >
      <div
        className="bg-primary/80 flex h-[500px] flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-inner"
        style={{
          backgroundImage: 'url("/images/skulls.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: '400px',
        }}
      >
        {/* Messages List */}
        <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
          {order?.notes?.length > 0 ? (
            order.notes.map((note, idx) => {
              const type = note.type?.toUpperCase();
              const isCustomer = type === 'CUSTOMER';

              return (
                <div
                  key={idx}
                  className={`flex w-full ${isCustomer ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`relative max-w-[85%] min-w-[70px] px-3 pt-1.5 pb-2.5 shadow-sm ${
                      isCustomer
                        ? 'rounded-lg rounded-tr-none bg-[#dcf8c6]'
                        : 'rounded-lg rounded-tl-none bg-white'
                    }`}
                  >
                    {/* Tail */}
                    <div
                      className="absolute top-0 h-0 w-0 border-[6px] border-transparent"
                      style={{
                        [isCustomer ? 'right' : 'left']: '-6px',
                        borderTopColor: isCustomer ? '#dcf8c6' : 'white',
                        [isCustomer ? 'borderLeftColor' : 'borderRightColor']: isCustomer
                          ? '#dcf8c6'
                          : 'white',
                      }}
                    />

                    {!isCustomer && (
                      <div className="mb-0.5 text-[11px] font-bold tracking-tight text-[#075e54] uppercase opacity-80">
                        {note.createdBy === 'admin' ? 'Support Team' : note.createdBy?.split('@')[0]}
                      </div>
                    )}

                    <div className="pr-14 text-[14px] leading-relaxed wrap-break-word text-gray-800">
                      {note.message}
                    </div>

                    <div className="absolute right-1.5 bottom-0.5 flex items-center gap-1">
                      <span className="text-[9px] font-medium text-gray-500">
                        {new Date(note.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex h-1/2 flex-col items-center justify-center text-white">
              <span className="text-sm font-medium bg-white/20 p-2 rounded-lg">No messages yet. Send a note to our team below.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input - WhatsApp Style */}
        <div className="border-t bg-[#f0f0f0] p-2">
          <Form form={form} onFinish={onFinish} className="flex items-end gap-2">
            <Form.Item name="message" noStyle>
              <Input.TextArea
                placeholder="Type your message..."
                autoSize={{ minRows: 1, maxRows: 5 }}
                className="flex-1 resize-none rounded-[20px] border-none px-4 py-2 shadow-sm hover:border-none focus:border-none focus:shadow-none"
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    form.submit();
                  }
                }}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined style={{ fontSize: '18px' }} />}
              loading={isPending}
              className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-full border-none bg-[#00a884] shadow-md hover:bg-[#008f6f]!"
            />
          </Form>
        </div>
      </div>
    </Box>
  );
};

export default CommunicationSection;
