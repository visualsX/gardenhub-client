export const siteConfig = {
  name: 'GardenHub',
  description:
    'Fresh Indoor Plants, Delivered to Your Home. Discover hand-picked plants perfect for beginners, collectors, and cozy spaces.',
  url: 'https://gardenhub.ae',
  ogImage: 'https://gardenhub.ae/test.png',
  links: {
    twitter: 'https://twitter.com/gardenhub',
    github: 'https://github.com/gardenhub',
  },
};

export const defaultMetadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@gardenhub',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  metadataBase: new URL(siteConfig.url),
};
