import { TooltipProvider } from "@/components/ui/tooltip";
import { sharedMetadata } from "@/config/shared-meta-data";
import authOptions from "@/lib/next-auth/auth-options";
import { ReduxProvider } from "@/providers/redux-provider";
import { getServerSession } from "next-auth";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster as SonnerToaster } from "sonner";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = sharedMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider session={session}>
          <ReduxProvider>
            <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
          </ReduxProvider>
        </AuthProvider>

        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
