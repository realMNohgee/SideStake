import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Offers" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/roadmap", label: "Roadmap" },
];

const FOOTER = {
  Product: [
    { href: "/", label: "Browse Offers" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "#", label: "API & Developers" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Press" },
  ],
  Help: [
    { href: "#", label: "Help Center" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Fee Schedule" },
  ],
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Side<span className="text-violet-400">Stake</span>
            </Link>
            <div className="hidden sm:flex gap-1 text-sm">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-300 hover:border-zinc-500 transition-colors">
              Log In
            </button>
            <button className="text-xs px-3 py-1.5 rounded-md bg-violet-600 text-white hover:bg-violet-500 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-3 gap-8 mb-8">
            {Object.entries(FOOTER).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">
                  {heading}
                </h4>
                <div className="flex flex-col gap-1.5 text-sm text-zinc-400">
                  {links.map(({ href, label }) => (
                    <Link key={label} href={href} className="hover:text-zinc-200 transition-colors">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-6 text-center">
            <div className="text-sm font-bold mb-2">
              Side<span className="text-violet-400">Stake</span>
            </div>
            <div className="text-xs text-zinc-600">
              © 2026 SideStake Foundation (Cayman Islands). Operated by SideStake Labs (BVI).
            </div>
            <div className="text-[11px] text-zinc-600 max-w-lg mx-auto mt-3 leading-relaxed">
              SideStake is a non-custodial P2P wager protocol. We do not hold user funds,
              create markets, or resolve outcomes. Smart contracts handle escrow. Oracles
              determine winners. Available worldwide — including the United States.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
