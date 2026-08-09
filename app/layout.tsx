import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "System Design & Security Digest",
  description: "Twice-daily learning digest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}