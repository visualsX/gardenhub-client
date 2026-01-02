'use client';

import { useState } from 'react';
import AddonGroup from './AddonGroup';
import AddonDetailModal from './AddonDetailModal';
import AddonCardSkeleton from './AddonCardSkeleton';

export default function ProductAddons({ addons, isLoading, selectedAddons, onSelectAddon }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddonDetail, setSelectedAddonDetail] = useState(null);

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3].map((j) => (
                <AddonCardSkeleton key={j} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Early return if no addons
  if (!addons || addons.length === 0) return null;

  const handleExpandClick = (option, addonGroup) => {
    setSelectedAddonDetail({ ...option, groupName: addonGroup.name });
    setModalVisible(true);
  };

  return (
    <>
      <div className="space-y-4 overflow-hidden">
        {addons.map((addonGroup) => {
          const selectedOption = selectedAddons.find(
            (s) => s.assignmentId === addonGroup.productAddonAssignmentId
          );

          return (
            <AddonGroup
              key={addonGroup.productAddonAssignmentId}
              addonGroup={addonGroup}
              selectedOption={selectedOption}
              onSelectAddon={onSelectAddon}
              onExpandAddon={handleExpandClick}
            />
          );
        })}
      </div>

      <AddonDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        addonDetail={selectedAddonDetail}
      />
    </>
  );
}
