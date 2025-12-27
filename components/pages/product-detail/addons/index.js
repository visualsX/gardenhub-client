'use client';

import { useState } from 'react';
import AddonGroup from './AddonGroup';
import AddonDetailModal from './AddonDetailModal';

export default function ProductAddons({ addons, selectedAddons, onSelectAddon }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAddonDetail, setSelectedAddonDetail] = useState(null);

    // Early return AFTER all hooks
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
