import { Skeleton } from 'antd';

export function CheckoutBox({
  children,
  loading = false,
  header = false,
  extra,
  title,
  description,
  className = '',
  dividers = 'py-6 border-t border-gray-200',
}) {
  return (
    <div className={`${className} ${dividers}`}>
      {header && (
        <div className="flex items-center justify-between">
          <div className="space-y-1 pb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="text-sm text-[#6B7280]">{description}</p>}
          </div>
          {extra}
        </div>
      )}
      <Skeleton
        active
        loading={loading}
        paragraph={{
          rows: 4,
          width: '100%',
        }}
        title={{ width: '60%' }}
      >
        {children}
      </Skeleton>
    </div>
  );
}
