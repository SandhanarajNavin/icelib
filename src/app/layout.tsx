import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { site } from "@/content/site";
import "./globals.css";

/* Display serif — the headline face throughout the design. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/* UI / body sans. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Lakeside drinks and eatery in Coimbatore. Momos, signature kunafa bowls, brownies and mojitos, served under the string lights until late.",
  metadataBase: new URL("https://icelibandco.in"),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      "Lakeside drinks and eatery in Coimbatore. Momos, signature bowls, brownies and mojitos under the string lights.",
    images: ["/images/shop.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
