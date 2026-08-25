import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SM MILK - Dairy Management Application",
  description: "SM MILK Dairy Management Application - Milk Purchase, Milk Sale, Customer Passbook & Rate Charts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b1329" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
