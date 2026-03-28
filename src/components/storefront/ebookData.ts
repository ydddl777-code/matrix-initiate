export interface Ebook {
  id: string;
  series: string;
  volume: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  price: string;
  isFree?: boolean;
  coverUrl: string;
  squareCheckoutUrl: string;
  badge?: string;
}

export const ebooks: Ebook[] = [
  {
    id: "ebook-1",
    series: "Remnant Warning",
    volume: "Volume I",
    title: "The Frequency of Babylon",
    subtitle: "No Contemporary Praise Music for the Israelites",
    description: "When worship became performance and the altar became a stage",
    author: "Prophet Gad",
    price: "$18.98",
    coverUrl: "https://media.base44.com/images/public/698ae99a8f13115b248081e9/1e2633946_smallGadup1.jpg",
    squareCheckoutUrl: "#",
    badge: "CONTROVERSIAL DOCTRINE",
  },
  {
    id: "ebook-2",
    series: "Remnant Warning",
    volume: "Volume II",
    title: "No Dogs for the Israelites",
    subtitle: "No Dogs for the Israelites",
    description: "The snare of displaced intimacy and the idolatry of the creature",
    author: "Prophet Gad",
    price: "$18.98",
    coverUrl: "https://media.base44.com/images/public/698ae99a8f13115b248081e9/1e2633946_smallGadup1.jpg",
    squareCheckoutUrl: "#",
    badge: "CONTROVERSIAL DOCTRINE",
  },
  {
    id: "ebook-3",
    series: "Remnant Warning",
    volume: "Volume III",
    title: "The King's Table",
    subtitle: "No King's Meat for the Israelites",
    description: "Daniel's resolve and the divine wisdom of biblical dietary law",
    author: "Prophet Gad",
    price: "$9.89",
    coverUrl: "https://media.base44.com/images/public/698ae99a8f13115b248081e9/1e2633946_smallGadup1.jpg",
    squareCheckoutUrl: "#",
  },
  {
    id: "ebook-4",
    series: "Remnant Warning",
    volume: "Volume IV",
    title: "The Debt Trap",
    subtitle: "No False Wisdom for the Israelites",
    description: "The borrower is servant to the lender — breaking free from Babylon's schools",
    author: "Prophet Gad",
    price: "$9.89",
    coverUrl: "https://media.base44.com/images/public/698ae99a8f13115b248081e9/1e2633946_smallGadup1.jpg",
    squareCheckoutUrl: "#",
  },
  {
    id: "ebook-5",
    series: "Remnant Warning",
    volume: "Special Edition",
    title: "Our Forefathers & Their Seed",
    subtitle: "The Twelve Tribes of Israel",
    description: "The apple of His eye — a heritage for every generation",
    author: "Prophet Gad",
    price: "FREE",
    isFree: true,
    coverUrl: "https://media.base44.com/images/public/698ae99a8f13115b248081e9/1e2633946_smallGadup1.jpg",
    squareCheckoutUrl: "#",
  },
  {
    id: "ebook-6",
    series: "Remnant Warning",
    volume: "Special Edition",
    title: "A Chosen People",
    subtitle: "The Eternal Oracle",
    description: "Always the same — if He chose then, He chooses now",
    author: "Prophet Gad",
    price: "$38.98",
    coverUrl: "https://media.base44.com/images/public/698ae99a8f13115b248081e9/1e2633946_smallGadup1.jpg",
    squareCheckoutUrl: "#",
  },
];
