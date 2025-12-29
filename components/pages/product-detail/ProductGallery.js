'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images }) {
  // Use dummy images if none provided
  const displayImages =
    images && images.length > 0
      ? images
      : [
          'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80',
          'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
          'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80',
          'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
        ];

  const [activeImage, setActiveImage] = useState(displayImages[0]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-100">
      {/* Main Image */}
      <img src={activeImage} alt="Product View" className="h-full w-full object-cover" />

      {/* Floating Thumbnails */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-2xl bg-white/40 p-2 backdrop-blur-md">
        {displayImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
              activeImage === img ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
