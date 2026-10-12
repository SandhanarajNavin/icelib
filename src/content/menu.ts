/** One way an item is sold — "Chicken" / "Veg", or a box size. */
export type PriceOption = { label: string; price: number };

export type MenuItem = {
  name: string;
  /** Left out where the board gives none, rather than inventing one. */
  description?: string;
  /** A single price, or one per option (shown stacked). */
  price: number | PriceOption[];
  tag?: "signature" | "bestseller" | "new";
};

export type MenuCategory = {
  id: string;
  label: string;
  blurb: string;
  items: MenuItem[];
};

/* Momos are all sold in two fillings, chicken first, as on the board. */
const momo = (chicken: number, veg: number): PriceOption[] => [
  { label: "Chicken", price: chicken },
  { label: "Veg", price: veg },
];

/** Shown alongside the menu, from the foot of the board. */
export const menuNote = "Made fresh on order — prep time 10 to 20 minutes.";

/**
 * Names, prices and descriptions are taken from the Icelib & Co menu board
 * (October 2026). Prices are in rupees. The board describes no momos; their
 * descriptions are the site's own copy.
 */
export const menu: MenuCategory[] = [
  {
    id: "momos",
    label: "Momos",
    blurb: "Hand-folded, steamed to order, then tossed in the sauce you pick.",
    items: [
      {
        name: "Steamed",
        description: "Classic parcels, clean and juicy, with fiery red chutney.",
        price: momo(120, 110),
        tag: "bestseller",
      },
      {
        name: "Fried",
        description: "Golden and blistered, crisp shell giving way to soft filling.",
        price: momo(120, 110),
      },
      {
        name: "Peri Peri",
        description: "Dusted in smoky peri peri with a slow, building heat.",
        price: momo(140, 130),
      },
      {
        name: "Schezwan",
        description: "Wok-tossed in garlicky schezwan, sharp and unapologetic.",
        price: momo(140, 130),
      },
      {
        name: "Thai Honey",
        description: "Sweet honey glaze cut with lime and a whisper of chilli.",
        price: momo(150, 140),
      },
      {
        name: "Kanthari Momo",
        description: "Tossed in a fiery kanthari chilli masala.",
        price: momo(140, 130),
      },
      {
        name: "Lemon Pepper",
        description: "Bright citrus and cracked pepper — the quiet favourite.",
        price: momo(150, 140),
      },
      {
        name: "Dynamite",
        description: "Crisp-fried, folded through a creamy chilli sauce.",
        price: momo(150, 140),
      },
      {
        name: "Malay Creamy",
        description: "Rich white gravy, mild and comforting.",
        price: momo(160, 150),
      },
      {
        name: "Platter Momo",
        description: "A little of everything — built to share, rarely shared.",
        price: momo(180, 170),
        tag: "signature",
      },
    ],
  },
  {
    id: "beef-burgers",
    label: "Beef Burgers",
    blurb: "Smashed thin on the flat-top, so the edges catch and crisp.",
    items: [
      {
        name: "The OG Smash",
        description: "Juicy smashed beef patty with cheese, pickles & signature sauce.",
        price: 269,
      },
      {
        name: "Oklahoma Smash",
        description: "Smashed beef, caramelised onions & melted cheese.",
        price: 299,
      },
      {
        name: "Double Smash",
        description: "Double beef patties with double cheese & house sauce.",
        price: 369,
      },
      {
        name: "Bacon Smash Burger",
        description: "Smashed beef with crispy bacon & melted cheese.",
        price: 399,
      },
    ],
  },
  {
    id: "chicken-burgers",
    label: "Chicken Burgers",
    blurb: "Smashed or Nashville-fried, always on a soft bun.",
    items: [
      {
        name: "Classic Smashed Chicken",
        description: "Smashed chicken with coleslaw, American cheese & house sauce.",
        price: 249,
      },
      {
        name: "Double Smashed Chicken",
        description: "Double patties with double melted cheese, veggies & mayo.",
        price: 359,
      },
      {
        name: "Nashville Chicken Burger",
        description:
          "Spicy Nashville-style fried chicken with pickles & creamy mayo on a toasted brioche bun.",
        price: 289,
      },
    ],
  },
  {
    id: "tex-mex",
    label: "Tex-Mex Specials",
    blurb: "Grilled flat and folded, with the cheese still pulling.",
    items: [
      {
        name: "Classic Mexican Quesadilla",
        description:
          "Grilled tortilla filled with chicken, veggies, melted cheese & Mexican seasonings.",
        price: 239,
      },
      {
        name: "Hot Chicken Quesadilla",
        description:
          "Spicy chicken, melted cheese, jalapeños & Mexican spices in a grilled tortilla.",
        price: 269,
      },
    ],
  },
  {
    id: "tenders-wings",
    label: "Tenders & Wings",
    blurb: "Fried crisp and sauced to order. Wings come in BBQ, Nashville or Buffalo.",
    items: [
      {
        name: "Nashville Chicken Tenders",
        description:
          "Served with a slice of toasted loaf bread, Nashville corn & dip.",
        price: [
          { label: "Box of 4", price: 259 },
          { label: "Box of 6", price: 339 },
        ],
      },
      {
        name: "Chicken Wings",
        description:
          "Crispy fried wings in your choice of BBQ, Nashville or Buffalo.",
        price: [
          { label: "6 pcs · 1 flavour", price: 249 },
          { label: "9 pcs · 2 flavours", price: 369 },
          { label: "12 pcs · 3 flavours", price: 499 },
        ],
      },
    ],
  },
  {
    id: "fries",
    label: "Fries & Loaded",
    blurb: "The reason nobody leaves after just one round.",
    items: [
      {
        name: "Regular Fries",
        description: "Classic crispy golden fries.",
        price: 110,
      },
      {
        name: "Peri Peri Fries",
        description: "Golden fries coated in zesty peri peri seasoning.",
        price: 129,
      },
      {
        name: "Classic Loaded Fries",
        description: "Golden fries loaded with creamy sauce, chicken & signature toppings.",
        price: 179,
        tag: "bestseller",
      },
      {
        name: "Hot Chicken Loaded",
        description: "Fries with spicy fried chicken, jalapeños & spicy mayo.",
        price: 249,
      },
      {
        name: "Alfredo White Cheese Loaded",
        description: "Fries with creamy Alfredo cheese sauce.",
        price: 239,
      },
      {
        name: "Beef Loaded Fries",
        description: "Seasoned fries topped with juicy beef & house sauces.",
        price: 249,
      },
    ],
  },
  {
    id: "appetizers",
    label: "Appetizers",
    blurb: "Something to pick at while the rest comes off the pass.",
    items: [
      {
        name: "Mozzarella Sticks",
        description:
          "Six crispy crumbed mozzarella sticks, served with chipotle sauce.",
        price: 249,
      },
    ],
  },
  {
    id: "mojitos",
    label: "Mojitos",
    blurb: "Built tall over crushed ice. Best carried out to the deck.",
    items: [
      { name: "Virgin", price: 110 },
      { name: "Blue Ocean", price: 120, tag: "signature" },
      { name: "Green Apple", price: 130 },
      { name: "Watermelon", price: 120 },
      { name: "Bubble Gum", price: 130 },
      { name: "Passion Fruit", price: 120 },
    ],
  },
  {
    id: "cold-beverages",
    label: "Cold Beverages",
    blurb: "Iced teas and iced coffees for the warm evenings.",
    items: [
      { name: "Peach Iced Tea", price: 120 },
      { name: "Lemon Iced Tea", price: 110 },
      { name: "Iced Coffee", price: 110 },
      { name: "Iced Hazelnut", price: 149 },
      { name: "Iced Americano", price: 99 },
      { name: "Iced Tiramisu", price: 179 },
    ],
  },
  {
    id: "hot-beverages",
    label: "Hot Beverages",
    blurb: "Coffee and tea, poured from morning to close.",
    items: [
      { name: "Signature Coffee", price: 30 },
      { name: "Black Coffee", price: 20 },
      { name: "Black Coffee (100% Arabica)", price: 50 },
      { name: "Choco Coffee", price: 40 },
      { name: "Irish Coffee", price: 70 },
      { name: "Lavender Coffee", price: 80 },
      { name: "Hazelnut Coffee", price: 80 },
      { name: "Caramel Coffee", price: 80 },
      { name: "Tiramisu Coffee", price: 90 },
      { name: "French Vanilla (Black)", price: 60 },
      { name: "Black Tea", price: 20 },
      { name: "Lemon Tea", price: 20 },
      { name: "Sulaimani Tea", price: 30 },
      { name: "Honey Lemon Tea", price: 30 },
      { name: "Blue Pea Tea", price: 40 },
      { name: "Hibiscus Tea", price: 40 },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    blurb: "Kunafa, trifles and mud bowls — the counter's sweet side.",
    items: [
      { name: "Pistachio Kunafa Brownie", price: 220, tag: "bestseller" },
      { name: "Kunafa Pistachio Bowl", price: 220, tag: "signature" },
      { name: "Nutella Kunafa Bowl", price: 210 },
      { name: "Vanilla Choco Trifle", price: 159 },
      { name: "Lotus Biscoff Trifle", price: 220 },
      { name: "Nutella Pistachio Trifle", price: 210 },
      { name: "Chocolate Mud Bowl", price: 189 },
      { name: "Tiramisu Mud Bowl", price: 179 },
    ],
  },
];
