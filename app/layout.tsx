import type { Metadata } from "next";
import { Playfair_Display, DM_Mono, Lora } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "900"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Shayaan Zaka — Software Engineer",
  description:
    "Software Engineer with experience building scalable data platforms and backend systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmMono.variable} ${lora.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
