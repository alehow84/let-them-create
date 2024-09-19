import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { GlobalStateProvider } from "@/contexts/GlobalStateContext";

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
        <AuthContextProvider>
          <GlobalStateProvider>{children}</GlobalStateProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
