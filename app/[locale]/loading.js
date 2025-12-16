import Logo from '@/public/logo.svg';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
                {/* Animated Leaf/Plant Icon */}
                <Logo className="animate-pulse" />

                {/* Loading Spinner */}
                <div className="mt-4 flex gap-1">
                    <div
                        className="bg-primary h-2 w-2 animate-bounce rounded-full"
                        style={{ animationDelay: '0s' }}
                    ></div>
                    <div
                        className="bg-primary h-2 w-2 animate-bounce rounded-full"
                        style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                        className="bg-primary h-2 w-2 animate-bounce rounded-full"
                        style={{ animationDelay: '0.2s' }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
