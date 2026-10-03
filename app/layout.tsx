import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Literata } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
});

const reading = Literata({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-literata",
});

export const metadata: Metadata = {
  title: "Bookster",
  description: "Read. Understand. Compete. Win.",
  applicationName: "Bookster",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bookster",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${reading.variable}`}>
      <body>{children}</body>
    </html>
  );
}
