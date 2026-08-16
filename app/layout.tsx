import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./_components/layout/Header";
import Footer from "./_components/layout/Footer";
import WhatsAppButton from "./_components/layout/WhatsAppButton";
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
  title: "JASHOKAI GlobalTech — Japanese Language Education in Jashore",
  description:
    "JASHOKAI GlobalTech offers professional, structured Japanese language education — N5, N4, JLPT and JFT-Basic preparation — taught by qualified teachers in Jashore.",
  keywords: [
    "Japanese language course Jashore",
    "JLPT preparation Bangladesh",
    "JFT-Basic preparation",
    "Learn Japanese Bangladesh",
    "JASHOKAI GlobalTech",
  ],
  openGraph: {
    title: "JASHOKAI GlobalTech — Japanese Language Education",
    description:
      "Professional Japanese language education from N5 to JLPT and JFT-Basic preparation. Born in Jashore, built for global opportunities.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-offwhite text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
