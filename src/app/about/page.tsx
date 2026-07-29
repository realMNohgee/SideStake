import PageLayout from "@/components/PageLayout";

export default function About() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2">🏛 About SideStake</h2>
        <p className="text-zinc-400 mb-10">A non-custodial P2P wager protocol. We&apos;re infrastructure, not a bookmaker — and the distinction matters.</p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: "🎯", title: "What We Actually Do", desc: "SideStake connects two people who want to bet against each other. That&apos;s it. We provide the smart contract escrow and the resolution payout mechanism. We don&apos;t create bets, we don&apos;t set odds, we don&apos;t aggregate opinions, and we don&apos;t decide who wins." },
            { icon: "🛡️", title: "Non-Custodial", desc: "Your wallet, your keys, your funds. Smart contracts handle escrow. We never hold user funds. This is a structural commitment — not a policy choice. Even if we wanted to touch your money, we can&apos;t. The contracts don&apos;t allow it." },
            { icon: "🔓", title: "Oracle-Resolved", desc: "Outcomes are determined by decentralized oracles (UMA, Chainlink) or mutually agreed sources — never by SideStake. The oracle is locked at bet creation and neither party can change it." },
            { icon: "📈", title: "Tradeable Positions", desc: "Your bet becomes a token the moment it&apos;s matched. Sell it early, buy into existing bets, hedge your position. This isn&apos;t a bet slip you&apos;re stuck with until expiry — it&apos;s a liquid asset you control." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-4">🆚 Not a Prediction Market — A Wager Protocol</h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-800 mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="text-left p-3 w-48"></th>
                <th className="text-left p-3">Prediction Markets (Polymarket, Kalshi)</th>
                <th className="text-left p-3">SideStake</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Who creates the bet?", "The platform creates markets", "Users create their own bets"],
                ["How is the price set?", "AMM or order book aggregates crowd sentiment", "Two people agree on terms directly"],
                ["What does the platform do?", "Facilitates price discovery, acts as exchange", "Escrow + payout. Nothing more."],
                ["Regulatory stance", "CFTC considers these exchanges", "Infrastructure for private wagers"],
                ["Who decides the winner?", "Platform resolves (or oracle)", "Oracle only — platform never resolves"],
              ].map(([label, pm, ss]) => (
                <tr key={label} className="border-b border-zinc-800/50">
                  <td className="p-3 font-medium">{label}</td>
                  <td className="p-3 text-zinc-400">{pm}</td>
                  <td className="p-3 text-zinc-400"><strong>{ss}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-4">⚖️ Legal Structure & Availability</h3>
        <p className="text-zinc-400 mb-3">
          SideStake Foundation (Cayman Islands) operates the protocol. SideStake Labs (BVI) handles development.
          The protocol treasury is governed by a multisig with timelock — no single person controls the fee switch.
        </p>
        <p className="text-zinc-400 mb-8">
          <strong>🌎 Available worldwide — including the United States.</strong> Our non-custodial architecture
          means we&apos;re infrastructure, not an exchange. Users connect their own wallets, smart contracts handle
          escrow, oracles resolve outcomes. We never hold funds, never set prices, never decide winners. This
          structural separation is what makes global availability possible without the regulatory overhead of
          custodial platforms like Kalshi or the geo-blocking of Polymarket.
        </p>
      </div>
    </PageLayout>
  );
}
