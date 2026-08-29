export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export const gallery: GalleryImage[] = [
  {
    src: "/images/ambiance.jpg",
    alt: "Open-air deck seating overlooking the lake at dusk, string lights strung between trees",
    caption: "The deck at golden hour",
  },
  {
    src: "/images/mojitos.jpg",
    alt: "Two hands clinking tall mojito cups, warm bokeh lights behind",
    caption: "Blue Curacao, meet Green Apple",
  },
  {
    src: "/images/mocha-bowl.png",
    alt: "A hand holding a navy Icelib & Co cup filled with a mocha truffle bowl topped with ice cream",
    caption: "Mocha Truffle Bowl",
  },
  {
    src: "/images/brownie.jpg",
    alt: "A thick chocolate brownie slab quartered with different nut and chocolate toppings",
    caption: "Brownies, cut thick",
  },
  {
    src: "/images/lakeside.jpg",
    alt: "Glass-topped tables on the wooden deck with the lake and city skyline beyond",
    caption: "Water on one side, city on the other",
  },
  {
    src: "/images/storefront.png",
    alt: "The lit Icelib & Co container counter at night",
    caption: "Open till late",
  },
];
