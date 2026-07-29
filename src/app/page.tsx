"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

// ── Types ──────────────────────────────────
type Offer = {
  id: number;
  title: string;
  category: string;
  creator: string;
  time: string;
  side: "yes" | "no";
  stake: number;
  confidence: number;
  oracle: string;
  volume: number;
  news: string | null;
};

type LiveMarket = {
  id: number;
  title: string;
  category: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  matched: string;
  oracle: string;
};

// ── Helpers ────────────────────────────────
function takerAmount(stake: number, confidence: number): number {
  const cc = confidence / 100;
  const tc = 1 - cc;
  return tc === 0 ? stake * 19 : Math.round(stake * (cc / tc));
}

function fmt(n: number): string {
  return "$" + n.toLocaleString();
}

const CAT_COLORS: Record<string, string> = {
  Crypto: "bg-amber-950 text-amber-300 border-amber-800",
  Economics: "bg-blue-950 text-blue-300 border-blue-800",
  Tech: "bg-violet-950 text-violet-300 border-violet-800",
  AI: "bg-pink-950 text-pink-300 border-pink-800",
  Science: "bg-emerald-950 text-emerald-300 border-emerald-800",
  Politics: "bg-rose-950 text-rose-300 border-rose-800",
  Sports: "bg-green-950 text-green-300 border-green-800",
  Geopolitics: "bg-orange-950 text-orange-300 border-orange-800",
  Culture: "bg-purple-950 text-purple-300 border-purple-800",
  Finance: "bg-cyan-950 text-cyan-300 border-cyan-800",
  Commodities: "bg-yellow-950 text-yellow-300 border-yellow-800",
  Climate: "bg-teal-950 text-teal-300 border-teal-800",
  Entertainment: "bg-fuchsia-950 text-fuchsia-300 border-fuchsia-800",
};

const TRENDING_FILTERS = [
  "Crypto", "Politics", "Fed", "AI", "Sports", "Geopolitics", "Tech", "Commodities",
];

const INITIAL_OFFERS: Offer[] = [
  { id: 1, title: "Bitcoin exceeds $200K by Dec 31, 2026", category: "Crypto", creator: "0xabcd...1234", time: "3m ago", side: "yes", stake: 500, confidence: 65, oracle: "UMA Oracle", volume: 12400, news: "BTC currently at $107K. Needs 87% gain in 5 months to hit $200K." },
  { id: 2, title: "ETH flips BTC in market cap before 2027", category: "Crypto", creator: "0x5678...abcd", time: "12m ago", side: "no", stake: 1000, confidence: 20, oracle: "Chainlink", volume: 8900, news: "ETH market cap: $480B vs BTC: $2.1T." },
  { id: 3, title: "Fed cuts rates 3+ times in 2026", category: "Economics", creator: "0xef01...7890", time: "28m ago", side: "yes", stake: 750, confidence: 50, oracle: "UMA Oracle", volume: 31500, news: "Fed meets July 29. Market pricing 78% chance of no change." },
  { id: 4, title: "Apple ships foldable iPhone in 2027", category: "Tech", creator: "0x2468...ace0", time: "1h ago", side: "yes", stake: 300, confidence: 40, oracle: "Manual", volume: 2200, news: "Ming-Chi Kuo predicts 2027. Apple filed 5+ foldable patents." },
  { id: 5, title: "Trump wins 2028 Republican nomination", category: "Politics", creator: "0xcc11...dd22", time: "45m ago", side: "no", stake: 2000, confidence: 30, oracle: "UMA Oracle", volume: 28500, news: "Trump would be 82. Vance, DeSantis, Haley positioning." },
  { id: 6, title: "Chiefs win Super Bowl LXI (2027)", category: "Sports", creator: "0xee33...ff44", time: "1h ago", side: "yes", stake: 800, confidence: 55, oracle: "UMA Oracle", volume: 18200, news: "Chiefs going for 4-peat. Mahomes through 2031." },
  { id: 7, title: "Iran nuclear deal reached by end of 2026", category: "Geopolitics", creator: "0xaa55...bb66", time: "2h ago", side: "no", stake: 1500, confidence: 70, oracle: "Manual", volume: 9400, news: "IAEA: Iran 2 weeks from weapons-grade enrichment." },
  { id: 8, title: "Oil drops below $50/barrel in 2027", category: "Commodities", creator: "0xdd77...ee88", time: "4h ago", side: "no", stake: 600, confidence: 80, oracle: "Chainlink", volume: 4100, news: "WTI at $62. OPEC+ production cuts in place." },
];

const INITIAL_LIVE: LiveMarket[] = [
  { id: 101, title: "US recession declared by Q1 2027", category: "Economics", yesPrice: 0.38, noPrice: 0.62, volume: 12500, matched: "2h ago", oracle: "UMA Oracle" },
  { id: 102, title: "Solana surpasses $500 by EOY 2026", category: "Crypto", yesPrice: 0.72, noPrice: 0.28, volume: 34000, matched: "5h ago", oracle: "Chainlink" },
  { id: 103, title: "SpaceX Starship reaches orbit in 2026", category: "Science", yesPrice: 0.85, noPrice: 0.15, volume: 8900, matched: "1d ago", oracle: "UMA Oracle" },
];

export default function Home() {
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [live, setLive] = useState<LiveMarket[]>(INITIAL_LIVE);
  const [tab, setTab] = useState<"offers" | "live" | "create">("offers");
  const [betTitle, setBetTitle] = useState("");
  const [betSide, setBetSide] = useState<"yes" | "no">("yes");
  const [betStake, setBetStake] = useState(500);
  const [betConfidence, setBetConfidence] = useState(65);

  const takeBet = (id: number, side: "yes" | "no") => {
    const idx = offers.findIndex((o) => o.id === id);
    if (idx === -1) return;
    const offer = offers[idx];
    const taker = takerAmount(offer.stake, offer.confidence);
    setOffers((prev) => prev.filter((o) => o.id !== id));
    setLive((prev) => [...prev, { id: 200 + prev.length, title: offer.title, category: offer.category, yesPrice: 0.5, noPrice: 0.5, volume: offer.volume + taker, matched: "just now", oracle: offer.oracle }]);
    setTab("live");
  };

  const buyLive = (id: number, outcome: "yes" | "no") => {
    setLive((prev) => prev.map((m) => {
      if (m.id !== id) return m;
      const shift = 0.02 + Math.random() * 0.05;
      const yesPrice = outcome === "yes" ? Math.min(0.99, m.yesPrice + shift) : Math.max(0.01, m.yesPrice - shift);
      return { ...m, yesPrice, noPrice: Math.max(0.01, 1 - yesPrice), volume: m.volume + Math.floor(Math.random() * 500) + 50 };
    }));
  };

  const submitBet = () => {
    if (!betTitle.trim()) return;
    setOffers((prev) => [...prev, { id: Math.floor(Math.random() * 9000) + 1000, title: betTitle, category: "Custom", creator: "You (0x" + Math.random().toString(16).slice(2, 10) + ")", time: "just now", side: betSide, stake: betStake, confidence: betConfidence, oracle: "UMA Optimistic Oracle", volume: 0, news: null }]);
    setBetTitle("");
    setTab("offers");
  };

  const stats = { volume: 1.2 + live.length * 0.05, open: offers.length + 840, active: live.length + 310 };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold tracking-tight leading-tight">
          Pick a <span className="text-violet-400">side.</span><br />Place a <span className="text-violet-400">stake.</span>
        </h1>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
          Peer-to-peer wagers. Two people agree on a bet — smart contracts lock the stake and pay the winner. We never hold your money. We never pick the winner.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => setTab("offers")} className="px-5 py-2.5 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-500">Browse Offers</button>
          <button onClick={() => setTab("create")} className="px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-200 font-medium hover:border-zinc-500">Create a Bet</button>
        </div>
      </section>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-4 gap-4 mb-8">
        {[["$" + stats.volume.toFixed(1) + "M", "Volume"], [String(stats.open), "Open Offers"], [String(stats.active), "Active Bets"], ["0.3%", "Protocol Fee"]].map(([v, l]) => (
          <div key={l} className="text-center p-3 rounded-xl bg-zinc-900 border border-zinc-800"><div className="text-lg font-bold">{v}</div><div className="text-xs text-zinc-500 mt-0.5">{l}</div></div>
        ))}
      </div>

      {/* Trending */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs font-semibold text-zinc-500 mr-2">🔥 Trending:</span>
          {TRENDING_FILTERS.map((f) => (
            <button key={f} className="text-xs px-2.5 py-1 rounded-md border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200">{f}</button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="flex gap-1 border-b border-zinc-800 pb-0">
          {[["offers", "📋 Open Offers"], ["live", "📊 Active Bets"], ["create", "➕ Create a Bet"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id as typeof tab)} className={`px-4 py-2 text-sm rounded-t-lg ${tab === id ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}>{label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 pb-16">
        {tab === "offers" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {offers.map((o) => {
              const taker = takerAmount(o.stake, o.confidence);
              const payout = ((o.stake + taker) * 0.997 / o.stake).toFixed(2);
              const opp = o.side === "yes" ? "no" : "yes";
              return (
                <div key={o.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2"><h3 className="text-sm font-semibold leading-snug">{o.title}</h3><span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${CAT_COLORS[o.category] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>{o.category}</span></div>
                  <div className="text-xs text-zinc-500">{o.creator} · {o.time} · {o.oracle} · Vol: {fmt(o.volume)}</div>
                  {o.news && <div className="text-xs text-zinc-400 bg-zinc-800/50 rounded-lg p-2.5">📰 {o.news}</div>}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-zinc-800/50 p-3"><div className={`text-[10px] font-bold uppercase ${o.side === "yes" ? "text-emerald-400" : "text-red-400"}`}>{o.side}</div><div className="text-lg font-bold mt-0.5">{fmt(o.stake)} USDC</div><div className="text-[10px] text-zinc-500">@{o.confidence}% · {payout}x</div></div>
                    <div className="rounded-lg bg-zinc-800/30 p-3"><div className={`text-[10px] font-bold uppercase ${opp === "yes" ? "text-emerald-400" : "text-red-400"}`}>{opp}</div><div className="text-lg font-bold mt-0.5 text-zinc-500">{fmt(taker)} USDC</div><div className="text-[10px] text-zinc-500">taker puts up</div></div>
                  </div>
                  <button onClick={() => takeBet(o.id, opp as "yes" | "no")} className={`w-full py-2 rounded-lg text-sm font-medium ${opp === "no" ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"}`}>⚡ Take {opp.toUpperCase()} — {fmt(taker)} USDC</button>
                </div>
              );
            })}
          </div>
        )}

        {tab === "live" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {live.map((m) => (
              <div key={m.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2"><h3 className="text-sm font-semibold">{m.title}</h3><span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-800">◆ Tradeable</span></div>
                <div className="text-xs text-zinc-500">Matched {m.matched} · {m.oracle} · Vol: {fmt(m.volume)} USDC</div>
                <div className="h-2 rounded-full bg-zinc-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-red-500 transition-all duration-300" style={{ width: `${Math.round(m.yesPrice * 100)}%` }} /></div>
                <div className="flex justify-between text-sm font-semibold"><span className="text-emerald-400">YES {Math.round(m.yesPrice * 100)}¢</span><span className="text-red-400">NO {Math.round(m.noPrice * 100)}¢</span></div>
                <div className="flex gap-2"><button onClick={() => buyLive(m.id, "yes")} className="flex-1 py-2 rounded-lg text-sm bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">Buy YES</button><button onClick={() => buyLive(m.id, "no")} className="flex-1 py-2 rounded-lg text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20">Buy NO</button></div>
              </div>
            ))}
          </div>
        )}

        {tab === "create" && (
          <div className="max-w-lg mx-auto">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col gap-4">
              <h3 className="text-lg font-semibold">➕ Create a Bet</h3>
              <label className="flex flex-col gap-1.5"><span className="text-sm text-zinc-400">What&apos;s your bet?</span><input type="text" value={betTitle} onChange={(e) => setBetTitle(e.target.value)} placeholder="e.g., Bitcoin will hit $200K by end of 2026" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500" /></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5"><span className="text-sm text-zinc-400">Your Side</span><select value={betSide} onChange={(e) => setBetSide(e.target.value as "yes" | "no")} className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100"><option value="yes">YES</option><option value="no">NO</option></select></label>
                <label className="flex flex-col gap-1.5"><span className="text-sm text-zinc-400">Resolution</span><select className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100"><option>UMA Optimistic Oracle</option><option>Chainlink</option><option>Manual</option></select></label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5"><span className="text-sm text-zinc-400">Stake (USDC)</span><input type="number" value={betStake} onChange={(e) => setBetStake(Number(e.target.value))} min={10} className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100" /><span className="text-[10px] text-zinc-600">Always $1 — no volatility</span></label>
                <label className="flex flex-col gap-1.5"><span className="text-sm text-zinc-400">Confidence</span><input type="range" value={betConfidence} onChange={(e) => setBetConfidence(Number(e.target.value))} min={5} max={95} className="w-full accent-violet-500" /><span className="text-sm font-medium text-violet-400">{betConfidence}%</span></label>
              </div>
              <div className="rounded-lg bg-zinc-800/50 p-4 text-center"><div className="text-xs text-zinc-500">Counterparty puts up</div><div className="text-2xl font-bold mt-1">{fmt(takerAmount(betStake, betConfidence))} USDC</div><div className="text-xs text-zinc-500 mt-1">to take <strong>{betSide === "yes" ? "NO" : "YES"}</strong> · Payout: <strong>{betStake > 0 ? ((betStake + takerAmount(betStake, betConfidence)) * 0.997 / betStake).toFixed(2) : "0"}x</strong></div></div>
              <button onClick={submitBet} className="w-full py-3 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-500">🔒 Lock USDC & Create Bet</button>
            </div>
          </div>
        )}
      </main>
    </PageLayout>
  );
}
