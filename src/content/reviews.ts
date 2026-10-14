export type Review = {
  /** The review, as the guest wrote it. */
  quote: string;
  /** How the guest is named on the source, e.g. "Priya S." */
  name: string;
  /** Where it was posted. */
  source?: "Google" | "Zomato" | "Swiggy" | "Instagram";
  /** Star rating out of 5, if the source gives one. */
  rating?: 1 | 2 | 3 | 4 | 5;
};

/**
 * Guest reviews for the home page carousel. Copy these from real reviews
 * (Google, Zomato, Swiggy, Instagram) — the carousel stays hidden while this
 * list is empty, so nothing invented ever reaches the site.
 *
 * Example entry:
 *   {
 *     quote: "The momos were fantastic and the view at sunset is unreal.",
 *     name: "Priya S.",
 *     source: "Google",
 *     rating: 5,
 *   },
 */
export const reviews: Review[] = [];

/**
 * Stand-in reviews for previewing the carousel while `reviews` is empty.
 * Shown only in development (`next dev`) and labelled as samples there —
 * never in a production build, so they cannot go live by mistake.
 */
export const sampleReviews: Review[] = [
  {
    quote: "The momo platter is unreal and the sunset over the lake makes it even better. Easily our favourite evening spot.",
    name: "Sample Guest",
    source: "Google",
    rating: 5,
  },
  {
    quote: "Smash burger was juicy, fries were crisp, and the Blue Ocean mojito is a must. Staff were super friendly.",
    name: "Sample Guest",
    source: "Zomato",
    rating: 5,
  },
  {
    quote: "Came for a quick coffee, stayed for two hours. Such a calm place to sit by the water and just slow down.",
    name: "Sample Guest",
    source: "Google",
    rating: 5,
  },
  {
    quote: "The Kunafa Pistachio Bowl is worth the trip on its own. Generous portions and great value.",
    name: "Sample Guest",
    source: "Instagram",
    rating: 4,
  },
  {
    quote: "Lovely vibe with the string lights at night. Food takes a little while, but it's all made fresh and it shows.",
    name: "Sample Guest",
    source: "Swiggy",
    rating: 4,
  },
  {
    quote: "Perfect for catching up with friends. Loaded fries and iced tiramisu were the highlights for us.",
    name: "Sample Guest",
    source: "Google",
    rating: 5,
  },
];
