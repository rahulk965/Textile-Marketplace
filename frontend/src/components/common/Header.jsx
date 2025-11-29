export default function Header({ title, right }) {
  return (
    <header className="w-full bg-white border-b">
      <div className="page-container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold shadow">VM</div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold leading-tight">{title}</h1>
            <div className="text-xs text-gray-500">Textile Marketplace</div>
          </div>
        </div>
        <div className="hidden sm:block">{right}</div>
      </div>
    </header>
  );
}
