'use client';

import ProductGrid from '@/components/shared/ProductGrid';
import { useLandingPageSections } from '@/hooks/useHome';
import { PLACEMENT_AREAS } from '@/lib/const/landing-dropdowns';

export default function DynamicSections({ initialSections }) {
  const { data: sections } = useLandingPageSections(initialSections);

  if (!sections || sections.length === 0) return null;
  return (
    <>
      {sections.map((section) => {
        const areaLabel = PLACEMENT_AREAS.find((area) => area.value === section.key)?.label || '';

        console.log("sectons: ", section)
        return section.value.map((category) => (
          <ProductGrid
            key={`${section.key}-${category.categoryId}-${category.id}`}
            title={category.customTitle || `${areaLabel} - ${category.categoryName}`}
            products={category.products || []}
            viewAll={`/collections/${category.categorySlug}`}
          />
        ));
      })}
    </>
  );
}
