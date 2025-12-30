export default function Title({ title = 'title', description = '' }) {
  return (
    <div className="space-y-1 pb-5">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[#6B7280]">
          {description}
        </p>
      )}
    </div>
  );
}
