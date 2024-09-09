export default function Burger() {
  return (
    <button
      aria-label="Burger Menu Button"
      className="relative p-6 bg-slate-light rounded-md"
    >
      <div className="absolute space-y-2 z-50 -translate-y-1/2 -translate-x-1/2">
        <div className="w-8 h-1 bg-white animate-pulse rounded-lg"></div>
        <div className="w-8 h-1 bg-white animate-pulse rounded-lg"></div>
        <div className="w-8 h-1 bg-white animate-pulse rounded-lg"></div>
      </div>
    </button>
  );
}
