// =============================================
// SKELETON TABLE — D'GUST ERP
// Loading state para tabelas
// =============================================

export default function SkeletonTable({ rows = 5, columns = 6 }) {
  return (
    <div className="overflow-x-auto fade-in">
      <table className="min-w-full bg-white border border-neutral-200 rounded-lg">
        {/* Header Skeleton */}
        <thead className="bg-neutral-100">
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-4 py-3">
                <div className="skeleton skeleton-text h-4 w-3/4" />
              </th>
            ))}
          </tr>
        </thead>

        {/* Body Skeleton */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-neutral-200">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  <div className="skeleton skeleton-text h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Skeleton para Cards
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 fade-in">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text w-2/3" />
    </div>
  );
}

// Skeleton para KPI Cards
export function SkeletonKpiCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton skeleton-text w-1/3 h-5" />
        <div className="skeleton rounded-full w-8 h-8" />
      </div>
      <div className="skeleton skeleton-title h-8" />
      <div className="skeleton skeleton-text w-1/2 h-3 mt-2" />
    </div>
  );
}

// Skeleton para Forms
export function SkeletonForm({ fields = 4 }) {
  return (
    <div className="space-y-4 fade-in">
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index}>
          <div className="skeleton skeleton-text w-1/4 h-4 mb-2" />
          <div className="skeleton h-10 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
