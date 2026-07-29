import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SideStake — P2P Wager Protocol",
  description:
    "Non-custodial peer-to-peer wagers. Connect your wallet, create a bet, smart contracts hold the escrow, oracles determine the winner. Available worldwide.",
  keywords: ["prediction market", "P2P betting", "wager protocol", "crypto", "non-custodial"],
  openGraph: {
    title: "SideStake — P2P Wager Protocol",
    description: "Pick a side. Place a stake. Smart contracts handle the rest.",
    url: "https://sidestake.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
