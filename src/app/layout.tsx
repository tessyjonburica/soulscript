import type { Metadata } from "next";
import { Playfair_Display, Inter, Almendra } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const almendra = Almendra({
  weight: ["400", "700"],
  variable: "--font-almendra",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SoulScript",
  description: "Scale your content output without losing your brand voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} ${almendra.variable} font-sans antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
