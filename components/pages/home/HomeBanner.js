'use client';

import { Carousel } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import ArrowLeft from '@/public/shared/arrow-left.svg';
import ArrowRight from '@/public/shared/arrow-right.svg';
import { useActiveBanners } from '@/hooks/useHome';
import { useRef } from 'react';

const POSITION_MAP = {
  center: 'items-center justify-center',
  'center-left': 'items-center justify-start',
  'center-right': 'items-center justify-end',
  'top-left': 'items-start justify-start',
  'top-center': 'items-start justify-center',
  'top-right': 'items-start justify-end',
  'bottom-left': 'items-end justify-start',
  'bottom-center': 'items-end justify-center',
  'bottom-right': 'items-end justify-end',
};

const BannerButton = ({ button, className }) => {
  if (!button || !button.text) return null;

  const baseStyles =
    'px-10 py-3.5 rounded-full font-bold transition-all duration-500 text-lg md:text-xl inline-block text-center min-w-[200px] hover:scale-105! active:scale-95! hover:shadow-2xl!';
  const styles = {
    solid: 'bg-primary! text-white! hover:bg-primary/90! shadow-lg shadow-primary/20!',
    outline:
      'border-2! border-primary/40! text-white! bg-primary/20! backdrop-blur-md! hover:bg-primary/25! hover:border-primary/60! shadow-xl shadow-black/5!',
    ghost:
      'bg-transparent! text-white! border-2! border-white/20! hover:bg-white/10! backdrop-blur-sm! hover:border-white/40!',
  };

  return (
    <Link
      href={button.link || '#'}
      className={`${baseStyles} ${styles[button.style] || styles.solid} ${className}`}
    >
      {button.text}
    </Link>
  );
};

const BannerContent = ({ banner }) => {
  const positionClass = POSITION_MAP[banner.textPosition] || POSITION_MAP['center-left'];
  const textAlignClass = `text-${banner.textAlignment || 'left'}`;

  // Convert opacity to decimal and handle potential edge cases
  const opacityValue = (banner.overlayOpacity || 30) / 100;

  return (
    <div className="relative h-screen w-full overflow-hidden md:h-[84vh]">
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        {banner.imageUrl && (
          <Image
            src={banner.imageUrl}
            alt={banner.heading || 'Banner'}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Background Image - Mobile */}
      <div className="absolute inset-0 block md:hidden">
        {banner.mobileImageUrl ? (
          <Image
            src={banner.mobileImageUrl}
            alt={banner.heading || 'Banner'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          banner.imageUrl && (
            <Image
              src={banner.imageUrl}
              alt={banner.heading || 'Banner'}
              fill
              className="object-cover"
              priority
            />
          )
        )}
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: banner.backgroundOverlay || '#000000',
          opacity: opacityValue,
        }}
      />

      {/* Content Container */}
      <div className={`max-layout absolute inset-0 flex ${positionClass} p-8 md:p-20`}>
        <div className={`${textAlignClass} animate-fadeIn z-10 space-y-6 text-white`}>
          <div className="space-y-2">
            {banner.subheading && (
              <p className="text-lg font-medium tracking-wider text-white/90 uppercase drop-shadow-sm md:text-2xl">
                {banner.subheading}
              </p>
            )}
            {banner.heading && (
              <h2 className="text-4xl leading-[1.1] font-bold drop-shadow-md md:text-7xl">
                {banner.heading}
              </h2>
            )}
          </div>

          {banner.description && (
            <h2 className="text-base leading-[1.1] font-medium drop-shadow-md md:text-lg">
              {banner.description}
            </h2>
          )}

          {/* Buttons Group */}
          <div
            className={`flex flex-wrap gap-4 pt-2 ${banner.textAlignment === 'center' ? 'justify-center' : banner.textAlignment === 'right' ? 'justify-end' : 'justify-start'}`}
          >
            <BannerButton button={banner.primaryButton} />
            <BannerButton button={banner.secondaryButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 z-20 -translate-y-1/2 ${
      direction === 'left' ? 'left-6' : 'right-6'
    } hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 md:flex`}
  >
    {direction === 'left' ? <ArrowLeft /> : <ArrowRight />}
  </button>
);

export default function HomeBanner({ initialBanners }) {
  const { data: banners, isLoading } = useActiveBanners(initialBanners);
  const carouselRef = useRef(null);

  if (isLoading && !banners?.length) {
    return <div className="h-screen w-full animate-pulse bg-gray-100 md:h-[84vh]" />;
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="group relative">
      <Carousel
        pauseOnHover={true}
        autoplay
        autoplaySpeed={4000}
        effect="fade"
        ref={carouselRef}
        dots={{ className: 'custom-dots-hero' }}
      >
        {banners.map((banner) => (
          <div key={banner.id}>
            <BannerContent banner={banner} />
          </div>
        ))}
      </Carousel>

      {banners.length > 1 && (
        <>
          <CustomArrow direction="left" onClick={() => carouselRef.current?.prev()} />
          <CustomArrow direction="right" onClick={() => carouselRef.current?.next()} />
        </>
      )}
    </div>
  );
}
