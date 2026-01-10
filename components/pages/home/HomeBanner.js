'use client';

import { Carousel } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useActiveBanners } from '@/hooks/useHome';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRef } from 'react';

const POSITION_MAP = {
    'center': 'items-center justify-center',
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

    const baseStyles = "px-10 py-3.5 rounded-full font-bold transition-all duration-500 text-lg md:text-xl inline-block text-center min-w-[200px] hover:scale-105! active:scale-95! hover:shadow-2xl!";
    const styles = {
        solid: "bg-primary! text-white! hover:bg-primary/90! shadow-lg shadow-primary/20!",
        outline: "border-2! border-primary/40! text-white! bg-primary/20! backdrop-blur-md! hover:bg-primary/25! hover:border-primary/60! shadow-xl shadow-black/5!",
        ghost: "bg-transparent! text-white! border-2! border-white/20! hover:bg-white/10! backdrop-blur-sm! hover:border-white/40!",
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
        <div className="relative w-full h-screen md:h-[80vh] overflow-hidden">
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
                className="absolute inset-0"
                style={{
                    backgroundColor: banner.backgroundOverlay || '#000000',
                    opacity: opacityValue
                }}
            />

            {/* Content Container */}
            <div className={`max-layout absolute inset-0 flex ${positionClass} p-8 md:p-20`}>
                <div className={`${textAlignClass} text-white z-10 space-y-6 animate-fadeIn`}>
                    <div className="space-y-2">
                        {banner.subheading && (
                            <p className="text-lg md:text-2xl font-medium tracking-wider uppercase text-white/90 drop-shadow-sm">
                                {banner.subheading}
                            </p>
                        )}
                        {banner.heading && (
                            <h2 className="text-4xl md:text-7xl font-bold leading-[1.1] drop-shadow-md">
                                {banner.heading}
                            </h2>
                        )}
                    </div>

                    {banner.description && (
                        <h2 className="text-base md:text-lg font-medium leading-[1.1] drop-shadow-md">
                            {banner.description}
                        </h2>
                    )}

                    {/* Buttons Group */}
                    <div className={`flex flex-wrap gap-4 pt-2 ${banner.textAlignment === 'center' ? 'justify-center' : banner.textAlignment === 'right' ? 'justify-end' : 'justify-start'}`}>
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
        className={`absolute top-1/2 -translate-y-1/2 z-20 ${direction === 'left' ? 'left-6' : 'right-6'
            } bg-black/20 hover:bg-black/40 text-white w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 hidden md:flex items-center justify-center border border-white/20`}
    >
        {direction === 'left' ? <LeftOutlined className="text-lg" /> : <RightOutlined className="text-lg" />}
    </button>
);

export default function HomeBanner({ initialBanners }) {
    const { data: banners, isLoading } = useActiveBanners(initialBanners);
    const carouselRef = useRef(null);

    if (isLoading && !banners?.length) {
        return <div className="w-full h-[450px] md:h-[650px] bg-gray-100 animate-pulse" />;
    }

    if (!banners || banners.length === 0) {
        return null;
    }

    return (
        <div className="relative group">
            <Carousel
                pauseOnHover={true}
                autoplay
                autoplaySpeed={2000}
                effect="fade"
                ref={carouselRef}
                dots={{ className: "custom-dots-hero" }}
            >
                {banners.map((banner) => (
                    <div key={banner.id}>
                        <BannerContent banner={banner} />
                    </div>
                ))}
            </Carousel>

            {/* {banners.length > 1 && (
                <>
                    <CustomArrow direction="left" onClick={() => carouselRef.current?.prev()} />
                    <CustomArrow direction="right" onClick={() => carouselRef.current?.next()} />
                </>
            )} */}
        </div>
    );
}
