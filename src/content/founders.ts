export type Founder = {
  name: string;
  role: string;
  /** Initials stand in for the portrait until `photo` is set. */
  initials: string;
  /**
   * Square portrait under /public. These are head-and-shoulders crops of the
   * originals in public/images/Founders (folder name is case-sensitive once
   * deployed).
   */
  photo?: string;
  bio: string[];
};

/** Bios as supplied by the founders (October 2026). */
export const founders: Founder[] = [
  {
    name: "Varun Das",
    role: "Founder & Visionary",
    initials: "VD",
    photo: "/images/Founders/varun-portrait.jpg",
    bio: [
      "A BBA graduate in Textile Business Analytics from the Central University of Tamil Nadu, Varun Das is an ambitious entrepreneur with a passion for innovation and creating memorable food experiences. With a bold idea sparked in Coimbatore, he founded Icelib & Co with a vision to bring a fresh, exciting perspective to the food and beverage industry.",
      "Driven by creativity, quality, and a forward-thinking mindset, Varun aims to transform Icelib & Co into a distinctive brand that brings people together through great taste and unforgettable experiences — with dreams of taking it from Coimbatore to the international stage.",
    ],
  },
  {
    name: "Hafiz Muhammed",
    role: "Co-Founder",
    initials: "HM",
    photo: "/images/Founders/hafiz-portrait.jpg",
    bio: [
      "An MBA graduate in Finance from the Central University of Tamil Nadu, Hafiz Muhammed brings strategic thinking and business acumen to Icelib & Co. Driven by entrepreneurial ambition and a vision for growth, he is committed to building a distinctive food and beverage brand focused on quality, memorable experiences, and a future that reaches far beyond Coimbatore to the international stage.",
    ],
  },
];
