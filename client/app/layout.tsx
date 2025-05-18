import type { Metadata } from "next";
import { MedievalSharp } from "next/font/google";
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import { Providers } from "./providers";

const medievalSharp = MedievalSharp({
  weight: "400",
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Questly",
  description: "A fantasy RPG where you decide the outcomes—not the author.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${medievalSharp.className} antialiased`}>
      
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}
