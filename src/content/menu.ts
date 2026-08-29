export type MenuItem = {
  name: string;
  description: string;
  price: number;
  tag?: "signature" | "bestseller" | "new";
};

export type MenuCategory = {
  id: string;
  label: string;
  blurb: string;
  items: MenuItem[];
};

/**
 * Prices below are PLACEHOLDERS — replace with the live menu-board figures.
 * Item names are taken from the Icelib & Co board.
 */
export const menu: MenuCategory[] = [
  {
    id: "momos",
    label: "Momos",
    blurb: "Hand-folded, steamed to order, then tossed in the sauce you pick.",
    items: [
      {
        name: "Steamed Chicken Momos",
        description: "Classic parcels, clean and juicy, with fiery red chutney.",
        price: 120,
        tag: "bestseller",
      },
      {
        name: "Fried Momos",
        description: "Golden and blistered, crisp shell giving way to soft filling.",
        price: 140,
      },
      {
        name: "Peri Peri Momos",
        description: "Dusted in smoky peri peri with a slow, building heat.",
        price: 150,
      },
      {
        name: "Schezwan Momos",
        description: "Wok-tossed in garlicky schezwan, sharp and unapologetic.",
        price: 150,
      },
      {
        name: "Thai Honey Momos",
        description: "Sweet honey glaze cut with lime and a whisper of chilli.",
        price: 160,
      },
      {
        name: "Bombay Masala Momos",
        description: "Street-style masala, tangy and loud, finished with onion.",
        price: 155,
      },
      {
        name: "Lemon Pepper Momos",
        description: "Bright citrus and cracked pepper — the quiet favourite.",
        price: 150,
      },
      {
        name: "Dynamite Momos",
        description: "Crisp-fried, folded through a creamy chilli sauce.",
        price: 170,
      },
      {
        name: "Malai Creamy Momos",
        description: "Rich white gravy, mild and comforting, mildly spiced.",
        price: 170,
      },
      {
        name: "Chicken Momos Platter",
        description: "A little of everything — built to share, rarely shared.",
        price: 280,
        tag: "signature",
      },
    ],
  },
  {
    id: "bowls",
    label: "Signature Bowls",
    blurb: "The two bowls the counter is known for. Both worth the wait.",
    items: [
      {
        name: "Kunafa Pistachio Bowl",
        description:
          "Shredded kunafa, pistachio cream and crushed nuts over cold ice cream.",
        price: 260,
        tag: "signature",
      },
      {
        name: "Mocha Truffle Bowl",
        description:
          "Warm chocolate truffle, espresso, a scoop of vanilla and toasted nuts.",
        price: 240,
        tag: "signature",
      },
    ],
  },
  {
    id: "desserts",
    label: "Brownies & Bakes",
    blurb: "Cut thick, served warm, gone quickly.",
    items: [
      {
        name: "Pistachio Kunafa Brownie",
        description: "Fudge brownie under a crown of kunafa and pistachio.",
        price: 190,
        tag: "bestseller",
      },
      {
        name: "Triple Chocolate Brownie",
        description: "Dark, milk and chip — dense, glossy, barely set.",
        price: 160,
      },
      {
        name: "Brownie with Ice Cream",
        description: "Warm brownie, cold scoop, hot fudge poured at the pass.",
        price: 210,
      },
    ],
  },
  {
    id: "mojitos",
    label: "Mojitos & Coolers",
    blurb: "Built tall over crushed ice. Best carried out to the deck.",
    items: [
      {
        name: "Classic Mint Mojito",
        description: "Lime, muddled mint, soda. The one everyone starts with.",
        price: 130,
        tag: "bestseller",
      },
      {
        name: "Blue Curacao Mojito",
        description: "Electric blue, citrus-forward — the one in every photo.",
        price: 150,
        tag: "signature",
      },
      {
        name: "Green Apple Mojito",
        description: "Tart apple and mint, sharp enough to reset the palate.",
        price: 140,
      },
      {
        name: "Passion Fruit Cooler",
        description: "Pulpy, tropical and just sweet enough.",
        price: 150,
      },
    ],
  },
  {
    id: "fries",
    label: "Fries & Loaded",
    blurb: "The reason nobody leaves after just one round.",
    items: [
      {
        name: "Classic Salted Fries",
        description: "Thin cut, twice fried, salted the moment they land.",
        price: 110,
      },
      {
        name: "Peri Peri Fries",
        description: "Tossed hot in peri peri so the dust actually sticks.",
        price: 130,
      },
      {
        name: "Loaded Cheese Fries",
        description: "Molten cheese, jalapeño and herbs over a full basket.",
        price: 180,
        tag: "bestseller",
      },
      {
        name: "Loaded Chicken Fries",
        description: "Shredded chicken, cheese sauce and a drizzle of sriracha.",
        price: 210,
      },
    ],
  },
  {
    id: "coffee",
    label: "Coffee",
    blurb: "Pulled from the machine behind the counter, morning to close.",
    items: [
      {
        name: "Filter Coffee",
        description: "Strong decoction, hot milk, poured the way it should be.",
        price: 80,
      },
      {
        name: "Cappuccino",
        description: "Double shot under a thick, even cap of foam.",
        price: 120,
      },
      {
        name: "Cold Coffee",
        description: "Blended thick and cold, topped with a scoop.",
        price: 160,
        tag: "bestseller",
      },
      {
        name: "Hazelnut Latte",
        description: "Smooth espresso, steamed milk, warm hazelnut.",
        price: 150,
      },
    ],
  },
];
