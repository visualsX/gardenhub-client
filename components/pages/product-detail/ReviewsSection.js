'use client';

import { useState } from 'react';
import { Form, Modal, Input, Rate, Upload, message, Button, Spin, Empty, Tooltip, Image } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  useProductReviewStats,
  useProductReviews,
  useCanReviewProduct,
  useSubmitReview,
} from '@/hooks/useReviews';

export default function ReviewsSection({ productId, rating: initialRating, totalReviews: initialTotalReviews }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Hooks
  const { data: stats, isLoading: isStatsLoading } = useProductReviewStats(productId);
  const {
    data: reviewsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isReviewsLoading,
  } = useProductReviews(productId);
  const { data: canReview } = useCanReviewProduct(productId);
  const { mutateAsync: submitReview, isPending: isSubmitting } = useSubmitReview();

  const reviews = reviewsData?.pages.flatMap((page) => page.nodes) || [];
  const rating = stats?.averageRating || initialRating || 0;
  const totalReviews = stats?.totalReviews || initialTotalReviews || 0;
  const ratingDistribution = stats?.ratingDistribution || [];

  const handleUploadChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('ProductId', productId);
      formData.append('Rating', values.rating);
      formData.append('Title', values.title);
      formData.append('Description', values.description);

      if (fileList[0]?.originFileObj) {
        formData.append('Image1', fileList[0].originFileObj);
      }
      if (fileList[1]?.originFileObj) {
        formData.append('Image2', fileList[1].originFileObj);
      }

      await submitReview(formData);
      message.success('Review submitted successfully!', 4);
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
      // Note: In a real app, you might want to refetch stats or reviews here
    } catch (error) {
      console.error('Failed to submit review:', error);
      message.error('Failed to submit review. Please try again.');
    }
  };

  if (isStatsLoading && !initialRating) {
    return (
      <div className="flex justify-center py-20">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <main className="max-layout py-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Customer Reviews</h2>

      <div className="bg-accent-gray space-y-6 rounded-2xl p-8 md:p-12">
        {/* Rating Summary Block */}
        <section className="mb-12 flex flex-col items-center justify-between gap-8 border-b border-gray-300 pb-6 md:flex-row">
          {/* Left: Overall Rating */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-gray-900">{rating.toFixed(1)} out of 5</span>
            <div className="flex items-center gap-2">
              <Rate disabled allowHalf defaultValue={rating} className="text-yellow-400" />
            </div>
            <p className="text-sm text-gray-500">Based on {totalReviews} reviews</p>
          </div>

          {/* Middle: Bars */}
          <div className="flex flex-1 flex-col gap-2 md:mx-auto md:max-w-xs">
            {[5, 4, 3, 2, 1].map((stars) => {
              const dist = ratingDistribution.find((d) => parseInt(d.key) === stars);
              const count = dist ? dist.value : 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={stars} className="flex items-center gap-4 text-sm">
                  <div className="flex w-24 justify-end gap-1">
                    <span className="text-gray-600">{stars}</span>
                    <Rate disabled defaultValue={1} count={1} className="text-xs text-yellow-400" />
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-[#1e3d2a]"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-6 text-right font-medium text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Right: Button */}
          {/* {canReview && ( */}
          <Tooltip title="User can review this once and only after buying this product">
            <Button
              type='primary'
              disabled={!canReview}
              onClick={() => setIsModalOpen(true)}
              className="rounded-full! px-8! py-3! font-bold text-white transition-colors"
            >
              Write a Review
            </Button>
          </Tooltip>
          {/* )} */}
        </section>

        {/* Review List */}
        <section className="space-y-6 divide-y divide-gray-300">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="py-6 first:pt-0">
                <div className="flex gap-x-4">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white text-xl font-bold text-gray-500 shadow-sm">
                    {review.customerImage ? (
                      <img
                        src={review.customerImage}
                        alt={review.customerName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{review.customerName?.charAt(0) || 'U'}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="font-bold text-gray-800">{review.customerName}</h4>
                      <span className="text-sm text-gray-400">
                        {review.createdAt ? new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(review.createdAt)) : ''}
                      </span>
                    </div>

                    <div className="mb-3">
                      <Rate disabled defaultValue={review.rating} className="text-xs text-yellow-400" />
                    </div>

                    <h5 className="mb-2 font-bold text-gray-900">{review.title}</h5>
                    <p className="mb-4 leading-relaxed text-gray-600">{review.description}</p>

                    <div className="flex gap-3">
                      {review.image1Url && (
                        <div className="h-20 w-20 overflow-hidden rounded-xl border border-gray-200">
                          <Image preview src={review.image1Url} alt="Review" className="h-full w-full object-cover" />
                        </div>
                      )}
                      {review.image2Url && (
                        <div className="h-20 w-20 overflow-hidden rounded-xl border border-gray-200">
                          <Image preview src={review.image2Url} alt="Review" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : !isReviewsLoading ? (
            <Empty description="No reviews yet" />
          ) : null}

          {hasNextPage && (
            <div className="pt-8 text-center">
              <Button
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage}
                className="h-auto rounded-full border-2 border-[#2D5F3F] px-8 py-2 font-bold text-[#2D5F3F] hover:bg-[#2D5F3F] hover:text-white"
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Review Modal */}
      <Modal
        title="Write a Review"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
          <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Please provide a rating' }]}>
            <Rate className="text-yellow-400" />
          </Form.Item>

          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
            <Input placeholder="Example: Great product!" />
          </Form.Item>

          <Form.Item name="description" label="Review Description" rules={[{ required: true, message: 'Please enter your review' }]}>
            <Input.TextArea rows={4} placeholder="What did you like or dislike about this product?" />
          </Form.Item>

          <Form.Item label="Upload Photos (Optional)">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false} // Prevent auto upload
              maxCount={2}
            >
              {fileList.length < 2 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item className="mb-0 mt-6 flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="bg-[#2D5F3F] hover:bg-[#1e3d2a] h-12 rounded-full px-8 font-bold"
            >
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
