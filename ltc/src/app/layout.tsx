import type { Metadata } from "next";
import Script from "next/script";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { GlobalStateProvider } from "@/contexts/GlobalStateContext";

declare global {
  interface Window {
    addeventatc: any;
  }
}

const hind = Hind_Siliguri({ weight: "500", subsets: ["bengali"] });

export const metadata: Metadata = {
  title: "Let Them Create",
  description: "Let Them Create",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hind.className}>
        <Script
          src="https://cdn.addevent.com/libs/atc/1.6.1/atc.min.js"
          strategy="beforeInteractive"
        />
        <AuthContextProvider>
          <GlobalStateProvider>{children}</GlobalStateProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
