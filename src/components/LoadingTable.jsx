export default function LoadingTable() {
  return (
    <div
      role="status"
      className="w-full p-4 border border-gray-300 rounded-md shadow-sm animate-pulse dark:border-gray-700">
      {/* Table Header */}
      <div className="w-full h-6 bg-gray-200 rounded mb-4"></div>

      {/* Table Body */}
      <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>

      <div className="space-y-4 mt-4">
        {/* Generating 5 Rows for Skeleton */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="w-1/5 h-8 bg-gray-100 rounded"></div>
            <div className="w-1/5 h-8 bg-gray-200 rounded"></div>
            <div className="w-1/5 h-8 bg-gray-100 rounded"></div>
            <div className="w-1/5 h-8 bg-gray-200 rounded"></div>
            <div className="w-1/5 h-8 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
