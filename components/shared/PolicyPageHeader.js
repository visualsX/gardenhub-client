/**
 * PolicyPageHeader Component
 * Reusable header section for all policy pages
 */

export default function PolicyPageHeader({ icon, badge, title, titleAccent, subtitle, lastUpdated }) {
    return (
        <div className="mb-16 text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                {icon}
                <span>{badge}</span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-5xl font-bold text-gray-900 sm:text-6xl">
                {title} <span className="text-primary">{titleAccent}</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-3 max-w-2xl text-lg leading-relaxed text-gray-600">
                {subtitle}
            </p>

            {/* Last Updated */}
            <p className="text-sm text-gray-500">
                Last updated: {lastUpdated}
            </p>
        </div>
    );
}
