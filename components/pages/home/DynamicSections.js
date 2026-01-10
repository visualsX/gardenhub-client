'use client';

import ProductGrid from '@/components/shared/ProductGrid';
import { useLandingPageSections } from '@/hooks/useHome';
import { PLACEMENT_AREAS } from '@/lib/const/landing-dropdowns';

export default function DynamicSections({ initialSections }) {
    const { data: sections } = useLandingPageSections(initialSections);

    if (!sections || sections.length === 0) return null;

    return (
        <>
            {sections.map((section) => (
                <ProductGrid
                    key={section.key + section.value[0].categoryId}
                    title={PLACEMENT_AREAS.find((area) => area.value === section.key)?.label + ' - ' + section.value[0].categoryName}
                    products={section.value[0].products}
                    viewAll={`/${section.value[0].categorySlug}`}
                />
            ))}
        </>
    );
}
