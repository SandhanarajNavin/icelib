export type NavLink = { label: string; href: string };
export type Hours = { days: string; time: string };
export type Social = { label: string; href: string };

export const site = {
  name: "Icelib & Co",
  tagline: "Drinks & Eatery",
  city: "Coimbatore",
  description:
    "A blue container kitchen by the lake serving steaming momos, kunafa bowls and cold mojitos.",
  phone: "+91 90000 00000",
  email: "hello@icelibandco.in",
  address: {
    line1: "Lakeside Walkway, Race Course Road",
    line2: "Coimbatore, Tamil Nadu 641018",
  },
  mapsUrl: "https://maps.google.com/?q=Icelib+%26+Co+Coimbatore",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Brand Story", href: "/brand-story" },
  { label: "Contact", href: "/contact" },
];

/** Ordering goes out to a delivery partner rather than a page of our own. */
export const orderUrl = "https://swiggy.com";

export const hours: Hours[] = [
  { days: "Monday — Thursday", time: "11:00 am — 11:00 pm" },
  { days: "Friday — Saturday", time: "11:00 am — 12:00 am" },
  { days: "Sunday", time: "12:00 pm — 11:00 pm" },
];

export const socials: Social[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Swiggy", href: "https://swiggy.com" },
  { label: "Zomato", href: "https://zomato.com" },
];
