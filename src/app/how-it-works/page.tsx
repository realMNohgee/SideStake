import PageLayout from "@/components/PageLayout";

export default function HowItWorks() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2">📖 How It Works</h2>
        <p className="text-zinc-400 mb-10">Two people, one bet, zero middlemen. Here's how SideStake works from start to finish.</p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: "📝", title: "Create a Bet", desc: "You have a take. Pick a side (YES or NO), stake USDC from your wallet, choose how it gets resolved, and set an expiry. Your stake locks in a smart contract — SideStake never touches your funds." },
            { icon: "🤝", title: "Get Matched", desc: "Your bet goes live in the Open Offers feed. Someone who disagrees takes the opposite side. Both stakes lock. Position tokens are minted — each of you gets a tradeable token representing your side of the bet." },
            { icon: "📊", title: "Trade Positions", desc: "Don't want to wait for expiry? Your position token can be sold anytime. Lock in profits early or cut losses. Buy someone else's position to enter an existing bet. The token's market price reflects what people think will happen." },
            { icon: "🔮", title: "Resolution", desc: "When the bet expires, the oracle both parties agreed on reports the outcome. Winners claim automatically. Losers' tokens expire. SideStake never decides who wins — and never can." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-4">🔮 Resolution Sources</h3>
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: "⚖️", title: "UMA Optimistic Oracle", desc: "Anyone proposes an answer. 2-hour dispute window. Token-holder voting resolves disputes. Used by Polymarket. Free to propose. Most common." },
            { icon: "🔗", title: "Chainlink Price Feeds", desc: "Decentralized oracle network. Best for price-based bets (crypto, stocks, commodities). Multiple independent nodes report. Tamper-resistant." },
            { icon: "🤝", title: "Manual Agreement", desc: "Both parties agree on a specific resolution at creation time. Can use any public API, URL, or data source. Risk: APIs can change. Best for esoteric bets." },
            { icon: "⚡", title: "Immutable Once Set", desc: "The resolution source is locked at bet creation. Neither party can change it. This prevents disputes — both sides knew the rules before they staked." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-4">📋 Types of Bets</h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Example</th>
                <th className="text-left p-3">Resolution</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Binary (YES/NO)", "Bitcoin {'>'} $200K by Dec 2026", "Oracle confirms — YES or NO"],
                ["Price Target", "ETH hits $8,000 before July 2027", "Chainlink price feed at expiry"],
                ["Event Outcome", "Fed cuts rates 3+ times in 2026", "UMA Optimistic Oracle — public data"],
                ["Head-to-Head", "Solana market cap {'>'} BNB by EOY", "Dual Chainlink feeds compared"],
                ["Custom", "Any verifiable claim both sides agree on", "Designated source set at creation (immutable)"],
              ].map(([type, example, resolution]) => (
                <tr key={type} className="border-b border-zinc-800/50">
                  <td className="p-3 font-medium">{type}</td>
                  <td className="p-3 text-zinc-400">{example}</td>
                  <td className="p-3 text-zinc-400">{resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
