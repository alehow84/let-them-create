import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hind = Hind_Siliguri({ weight: "500", subsets: ["bengali"] });

export const metadata: Metadata = {
  title: "Let Them Create",
  description: "Let Them Create homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hind.className}>{children}</body>
    </html>
  );
}
