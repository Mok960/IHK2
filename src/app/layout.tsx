import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: {
    default: "MINT-Ferienwoche Aurora 2026",
    template: "%s · MINT-Ferienwoche",
  },
  description:
    "Das Labor-Tagebuch der MINT-Ferienwoche Aurora – dunkel, pastellig, fünf Tage Forschen.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className={`${outfit.variable} ${syne.variable} font-sans antialiased`}>
        <div className="site-shell min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
