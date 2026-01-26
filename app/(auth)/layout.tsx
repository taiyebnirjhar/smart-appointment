import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Trade Makina",
  description: "Trade Makina",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="w-full h-full">{children}</section>;
}
