import PageLayout from "@/components/PageLayout";

const PHASES = [
  {
    title: "📋 Phase 1 — Core Protocol (Now)",
    items: [
      { status: "✅", text: "Demo site — sidestake-demo.vercel.app live" },
      { status: "✅", text: "Interactive bet creation — create, browse, and match bets" },
      { status: "✅", text: "Wager protocol framing — \"not a prediction market\" language throughout" },
      { status: "✅", text: "Non-custodial architecture design — wallet → contract → winner" },
      { status: "✅", text: "Production app — sidestake.vercel.app live" },
      { status: "🔄", text: "Smart contract development — BetFactory + Market + Position token contracts" },
      { status: "⏳", text: "Wallet integration — Phantom, MetaMask, WalletConnect" },
      { status: "⏳", text: "Contract audit — external security review" },
      { status: "⏳", text: "Testnet launch — real contracts, fake money" },
      { status: "⏳", text: "Mainnet launch — real USDC, real bets" },
    ],
  },
  {
    title: "📋 Phase 2 — Growth (Post-Launch)",
    items: [
      { status: "⏳", text: "Fiat on-ramp — buy USDC with credit card (MoonPay/Ramp)" },
      { status: "⏳", text: "Mobile apps — iOS + Android native" },
      { status: "⏳", text: "Creator program — revenue share for top bettors" },
      { status: "⏳", text: "Feed algorithm v2 — personalized offers, reputation weighting" },
      { status: "⏳", text: "Data products — aggregate sentiment reports for institutions" },
      { status: "⏳", text: "Auth expansion — optional email/social login alongside wallet" },
    ],
  },
  {
    title: "📋 Phase 3 — Licensed Sports Book (12-24 Months)",
    items: [
      { status: "⏳", text: "UK Gambling Commission license — gold standard, globally recognized" },
      { status: "⏳", text: "Sports data integration — Sportradar / Genius Sports" },
      { status: "⏳", text: "Fiat sports betting — separate from non-custodial protocol" },
      { status: "⏳", text: "KYC/AML compliance — required for licensed betting" },
    ],
  },
  {
    title: "📋 Phase 4 — US Expansion (3-5 Years)",
    items: [
      { status: "⏳", text: "CFTC DCM license — federal event contracts (non-sports)" },
      { status: "⏳", text: "State-by-state sports licenses — 30+ states" },
      { status: "⏳", text: "US banking + fiat rails" },
    ],
  },
];

export default function Roadmap() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2">🗺️ Roadmap</h2>
        <p className="text-zinc-400 mb-10">What we&apos;re building and why. Subject to change as we learn from real users.</p>

        <h3 className="text-xl font-semibold mb-6">🔐 Wallet Architecture (Phase 1 Foundation)</h3>
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: "🔑", title: "Connect Your Wallet", desc: "No email. No password. No KYC. Connect your existing wallet (Phantom, MetaMask, WalletConnect) and you&apos;re in. SideStake is a website that talks to the blockchain — we never see your private keys." },
            { icon: "🏦", title: "Smart Contract Escrow", desc: "When you create or take a bet, USDC moves from your wallet directly into an audited smart contract. SideStake servers never touch it. The contract is the escrow agent — code, not people." },
            { icon: "🔄", title: "How It Actually Flows", desc: "Your Wallet → Smart Contract (escrow) → Winner&apos;s Wallet. That&apos;s the entire path. Even if our servers go down, the contracts keep running. Your funds are always on-chain, always yours." },
            { icon: "💳", title: "Fiat On-Ramp (Later)", desc: "Phase 1 is crypto-only (USDC). Phase 2 adds MoonPay or similar — buy USDC with a credit card right in the app. No bank account needed." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {PHASES.map((phase) => (
          <div key={phase.title} className="mb-10">
            <h3 className="text-xl font-semibold mb-4">{phase.title}</h3>
            <div className="flex flex-col gap-3">
              {phase.items.map(({ status, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-900 text-sm"
                >
                  <span className="text-base flex-shrink-0 mt-0.5">{status}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
