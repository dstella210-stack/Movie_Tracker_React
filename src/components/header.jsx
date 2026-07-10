export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
        <span className="text-green-500 text-xl">🎬</span>
        <div>
          <h1 className="text-xl font-bold text-white leading-none">Movie Tracker</h1>
          <p className="text-xs text-white/40 mt-0.5">Keep track of your favorite films</p>
        </div>
      </div>
    </header>
  )
}
