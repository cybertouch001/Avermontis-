import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AVERMONTIS | Pure Skin. Lasting Care.",
  description: "Science-backed skincare with a thoughtful, botanical touch.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
