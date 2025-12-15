import { defaultMetadata } from '../../config/seo.config';

/**
 * Constructs a Next.js metadata object by merging page-specific overrides with defaults.
 *
 * @param {Object} overrides - Page-specific metadata overrides.
 * @param {string} [overrides.title] - The page title.
 * @param {string} [overrides.description] - The page description.
 * @param {string} [overrides.image] - Custom Open Graph image URL.
 * @param {boolean} [overrides.noIndex] - Whether to prevent indexing.
 * @returns {import('next').Metadata} The constructed metadata object.
 */
export function constructMetadata({
    title = defaultMetadata.title.default,
    description = defaultMetadata.description,
    image = defaultMetadata.openGraph.images[0].url,
    noIndex = false,
    ...rest
} = {}) {
    return {
        ...defaultMetadata,
        title,
        description,
        openGraph: {
            ...defaultMetadata.openGraph,
            title,
            description,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title,
            description,
            images: [image],
        },
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
        ...rest,
    };
}
