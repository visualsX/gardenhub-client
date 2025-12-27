import Image from 'next/image';
import { Modal } from 'antd';

export default function AddonDetailModal({ visible, onClose, addonDetail }) {
    if (!addonDetail) return null;

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={320}
            centered
        >
            <div className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">
                    {addonDetail.name}
                </h2>

                {addonDetail.groupName && (
                    <p className="text-xs text-gray-500">
                        Category: <span className="font-medium">{addonDetail.groupName}</span>
                    </p>
                )}

                {/* Image - Full Width */}
                {addonDetail.imageUrl && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src={addonDetail.imageUrl}
                            alt={addonDetail.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                )}

                {/* Description */}
                {addonDetail.description && (
                    <div>
                        <h3 className="mb-1 text-sm font-semibold text-gray-900">Description</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">{addonDetail.description}</p>
                    </div>
                )}

                {/* Price Information */}
                <div className="rounded-lg bg-gray-50 p-3">
                    <h3 className="mb-1 text-sm font-semibold text-gray-900">Price</h3>
                    <div className="flex items-center gap-2">
                        {addonDetail.salePrice > 0 &&
                            addonDetail.salePrice < addonDetail.price ? (
                            <>
                                <span className="text-xl font-bold text-red-600">
                                    AED {addonDetail.salePrice}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    AED {addonDetail.price}
                                </span>
                                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                                    Save {Math.round(((addonDetail.price - addonDetail.salePrice) / addonDetail.price) * 100)}%
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-gray-900">
                                AED {addonDetail.price || 0}
                            </span>
                        )}
                    </div>
                </div>

                {/* Additional Details */}
                {addonDetail.isDefault && (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-2">
                        <p className="text-xs font-medium text-green-800">
                            ✓ This is the default option
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );
}
