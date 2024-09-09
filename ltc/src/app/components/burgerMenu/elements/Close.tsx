export default function Close() {
  return (
    <button className="relative z-50 p-6 bg-slate hover:bg-sky rounded-md">
      <div className="w-8 h-1 rotate-45 -translate-x-1/2 absolute bg-white animate-pulse"></div>
      <div className="w-8 h-1 -rotate-45 -translate-x-1/2 absolute bg-white animate-pulse"></div>
    </button>
  );
}
