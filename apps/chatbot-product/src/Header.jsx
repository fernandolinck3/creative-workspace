export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <img src="/assets/logo-reference.png" alt="TaJoia" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>TaJoia</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-400">
          <a href="#como-funciona" className="hover:text-teal-400 transition">Como funciona</a>
          <a href="#para-quem" className="hover:text-teal-400 transition">Para quem é</a>
          <a href="#planos" className="hover:text-teal-400 transition">Planos</a>
          <a href="#faq" className="hover:text-teal-400 transition">FAQ</a>
        </nav>
        <a href="#cta" className="hidden md:inline-block bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition shadow-lg shadow-teal-900/30">
          Testar grátis
        </a>
      </div>
    </header>
  )
}
