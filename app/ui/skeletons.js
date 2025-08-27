export default function TableSkeleton() {
  return (
    <div className="py-2 rounded-xl flex justify-start items-center gap-1">
      <button
        type="button"
        className="btn-xs rounded-full border-transparent text-xs font-bold  flex justify-between items-center gap-2 btn-disabled"
      >
        <span className="loading loading-dots md:loading-md text-red-700"></span>
      </button>
    </div>
  );
}


export function StatsSkeleton() {
  return (
    <div className="py-2 rounded-xl flex justify-start items-center gap-4 mb-10">
      <span className="loading loading-spinner md:loading-md text-red-700"></span>
      <span className="loading loading-spinner md:loading-md text-red-700"></span>
      <span className="loading loading-spinner md:loading-md text-red-700"></span>
    </div>
  )
}

export function SizeStatsSkeleton() {
  return (
    <span className="loading loading-spinner md:loading-sm text-red-700"></span>
  )
}
