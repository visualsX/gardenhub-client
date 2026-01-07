'use client';

import { Carousel } from 'antd';
import Image from 'next/image';
import { useActiveBanners } from '@/hooks/useHome';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRef } from 'react';

const BannerContent = ({ banner }) => {
    return (
        <div className="relative w-full h-[400px] md:h-[600px]">
            {/* Background Image - Desktop */}
            <div className="hidden md:block absolute inset-0">
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
            <div className="block md:hidden absolute inset-0">
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
                className="absolute inset-0 bg-black"
                style={{ opacity: banner.overlayOpacity || 0.3 }}
            />

            {/* Content */}
            <div className={`absolute inset-0 flex items-center justify-${banner.textAlignment === 'right' ? 'end' : banner.textAlignment === 'center' ? 'center' : 'start'} p-8 md:p-16`}>
                <div className={`text-${banner.textAlignment || 'left'} max-w-xl text-white z-10 space-y-4`}>
                    {banner.heading && (
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                            {banner.heading}
                        </h2>
                    )}
                    {banner.subheading && (
                        <p className="text-lg md:text-xl font-medium opacity-90">
                            {banner.subheading}
                        </p>
                    )}
                    {banner.description && (
                        <div dangerouslySetInnerHTML={{ __html: banner.description }} className="prose prose-invert" />
                    )}

                    {/* Add buttons/CTA here if available in schema. 
              Currently query doesn't return CTA links but based on request we integrate the banner. 
              If needed we can add checks. */}
                </div>
            </div>
        </div>
    );
};

const CustomArrow = ({ direction, onClick }) => (
    <button
        onClick={onClick}
        className={`absolute top-1/2 -translate-y-1/2 z-20 ${direction === 'left' ? 'left-4' : 'right-4'
            } bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 hidden md:flex items-center justify-center`}
    >
        {direction === 'left' ? <LeftOutlined className="text-xl" /> : <RightOutlined className="text-xl" />}
    </button>
);

export default function HomeBanner({ initialBanners }) {
    const { data: banners, isLoading } = useActiveBanners(initialBanners);
    const carouselRef = useRef(null);

    if (isLoading && !banners?.length) {
        return <div className="w-full h-[400px] md:h-[600px] bg-gray-100 animate-pulse" />;
    }

    if (!banners || banners.length === 0) {
        return null;
    }

    return (
        <div className="relative group">
            <Carousel
                autoplay
                effect="fade"
                ref={carouselRef}
                dots={{ className: "custom-dots" }}
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
