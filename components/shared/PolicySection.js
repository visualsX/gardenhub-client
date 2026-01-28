/**
 * PolicySection Component
 * Reusable card component for policy pages with consistent green theme
 */

export default function PolicySection({ icon, title, children }) {
    return (
        <div className="group rounded-3xl border border-green-100 bg-white p-8 shadow-sm transition-all hover:border-primary hover:shadow-lg">
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110">
                    {icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>
            <div className="text-gray-700">{children}</div>
        </div>
    );
}

/**
 * PolicyList Component
 * Renders a list of items with green bullet points
 */
export function PolicyList({ items }) {
    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"></div>
                    <p className="text-gray-700">{item}</p>
                </div>
            ))}
        </div>
    );
}

/**
 * PolicySteps Component
 * Renders numbered steps with green background
 */
export function PolicySteps({ steps }) {
    return (
        <div className="space-y-3">
            {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg bg-green-50 p-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                </div>
            ))}
        </div>
    );
}

/**
 * PolicyGrid Component
 * Two-column grid for comparing items
 */
export function PolicyGrid({ columns }) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {columns.map((column, colIndex) => (
                <div key={colIndex} className={`rounded-2xl p-5 ${column.highlight ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <h3 className="mb-3 text-lg font-bold text-gray-900">{column.title}</h3>
                    <div className="space-y-2">
                        {column.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start gap-2">
                                <div className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${column.highlight ? 'bg-primary' : 'bg-gray-400'}`}></div>
                                <p className="text-sm text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

/**
 * PolicyContact Component
 * Contact information cards
 */
export function PolicyContact({ contacts }) {
    return (
        <div className="flex flex-wrap gap-4">
            {contacts.map((contact, index) => (
                <div key={index} className="rounded-xl bg-green-50 px-5 py-3">
                    <p className="text-sm font-semibold text-gray-900">{contact.label}</p>
                    <p className="text-sm text-gray-600">{contact.value}</p>
                </div>
            ))}
        </div>
    );
}
