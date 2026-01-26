'use client';

import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';

export default function MobileModal({ isOpen, onClose, children, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Sync visibility state with isOpen prop for animations
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsVisible(true);
            // Tiny delay to allow DOM to register the initial state before animating
            const timer = setTimeout(() => setIsAnimating(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'unset';
            }, 500); // Matches transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-99999 flex flex-col items-center justify-end pb-2 transition-all duration-500 ${isAnimating ? 'bg-black/40 backdrop-blur-sm' : 'pointer-events-none bg-transparent'}`}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#2d5f3f] shadow-lg transition-all duration-500 ${isAnimating ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-0 opacity-0'}`}
            >
                <CloseOutlined className="text-xl" />
            </button>

            {/* Menu Card */}
            <div
                className={`relative w-[95%] max-w-[400px] transform overflow-hidden rounded-xl bg-[#f9f8f3] shadow-2xl transition-all duration-500 ease-out sm:max-w-[500px] md:max-w-[800px] ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${className}`}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}
