import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Icelib & Co — Drinks & Eatery",
  description:
    "Lakeside drinks and eatery in Coimbatore. Momos, signature kunafa bowls, brownies and mojitos, served under the string lights until late.",
  metadataBase: new URL("https://icelibandco.in"),
  openGraph: {
    title: "Icelib & Co — Drinks & Eatery",
    description:
      "Lakeside drinks and eatery in Coimbatore. Momos, signature bowls, brownies and mojitos under the string lights.",
    images: ["/images/shop.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
