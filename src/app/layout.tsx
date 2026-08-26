import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SM MILK — Smart Dairy Collection Command Center",
  description:
    "SM MILK Enterprise Dairy Management System — Milk Purchase, Milk Sale, Member Passbook & Rate Charts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#070c17" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
