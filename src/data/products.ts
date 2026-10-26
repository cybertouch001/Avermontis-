export type Product = {
  id: string;
  name: string;
  category: "Cleanse" | "Treat" | "Moisturise" | "Protect";
  description: string;
  price: number;
  rating: string;
  reviews: number;
  image: string;
  tag?: string;
};

export const products: Product[] = [
  {
    id: "cleanser", name: "Gentle Face Cleanser", category: "Cleanse",
    description: "A gentle daily cleanse without stripping natural moisture.",
    price: 499, rating: "4.8", reviews: 124, tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "serum", name: "Radiance Serum", category: "Treat",
    description: "A lightweight serum for a fresh, luminous-looking finish.",
    price: 999, rating: "4.7", reviews: 98,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "cream", name: "Hydrating Face Cream", category: "Moisturise",
    description: "Comforting hydration for soft, supple-feeling skin.",
    price: 799, rating: "4.9", reviews: 156, tag: "CUSTOMER FAVOURITE",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "sunscreen", name: "Mineral Sunscreen", category: "Protect",
    description: "Everyday broad-spectrum protection for your routine.",
    price: 699, rating: "4.8", reviews: 112,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85"
  }
];
