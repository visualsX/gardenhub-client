import AddonCard from './AddonCard';

export default function AddonGroup({ addonGroup, selectedOption, onSelectAddon, onExpandAddon }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-base font-medium text-gray-900">
          Choose a <span className="underline">{addonGroup.name}</span>
        </label>
        {addonGroup.isRequired && (
          <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">Required</span>
        )}
      </div>

      <div className="space-y-4 overflow-hidden">
        {/* Scrollable Container */}
        <div
          className="-mx-4 flex gap-4 overflow-x-auto scroll-smooth px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {addonGroup.options.map((option) => {
            const isSelected = selectedOption?.optionId === option.id;

            return (
              <AddonCard
                key={option.id}
                option={option}
                addonGroup={addonGroup}
                isSelected={isSelected}
                onSelect={onSelectAddon}
                onExpand={onExpandAddon}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
