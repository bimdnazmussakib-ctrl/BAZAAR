export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  tags?: string[];
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Local Crafts",
  "Gifts",
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Handwoven Cotton Saree",
    description: "Authentic hand-loomed cotton saree with traditional motifs. Breathable, elegant, and perfect for all occasions. Each piece is unique and supports local artisans.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1610030469915-9a88edc1c20a?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
    rating: 4.8,
    reviews: 124,
    stock: 5,
    tags: ["Traditional", "Handmade"],
    isFeatured: true
  },
  {
    id: "p2",
    name: "Premium Mango Honey",
    description: "Pure, raw honey harvested from the organic orchards of Rajshahi. Rich in antioxidants and natural sweetness.",
    price: 850,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop",
    category: "Gifts",
    rating: 4.9,
    reviews: 89,
    stock: 50,
    isFeatured: true
  },
  {
    id: "p3",
    name: "Wireless ANC Headphones",
    description: "Next-gen noise cancellation with 40-hour battery life. Crystal clear audio and ergonomic design for all-day comfort.",
    price: 12500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviews: 567,
    stock: 12,
    isFeatured: true
  },
  {
    id: "p4",
    name: "Handicrafted Bamboo Lamp",
    description: "Eco-friendly bamboo lamp that creates a warm, atmospheric glow. A beautiful addition to any modern sustainable home.",
    price: 2200,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&auto=format&fit=crop",
    category: "Home & Living",
    rating: 4.5,
    reviews: 32,
    stock: 8,
    tags: ["Eco-friendly", "Handmade"]
  },
  {
    id: "p5",
    name: "Leather Messenger Bag",
    description: "Genuine top-grain leather bag with multiple compartments. Durable, stylish, and perfect for the modern professional.",
    price: 6800,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
    rating: 4.6,
    reviews: 215,
    stock: 3
  },
  {
    id: "p6",
    name: "Smart Watch Elite",
    description: "Comprehensive health tracking, Amoled display, and water resistance up to 50m. Stay connected with style.",
    price: 8900,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.4,
    reviews: 840,
    stock: 25
  },
  {
    id: "p7",
    name: "Organic Tea Sampler",
    description: "A collection of 6 premium loose leaf teas including Darjeeling, Green, and Jasmine. Gift box included.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4586c567?q=80&w=800&auto=format&fit=crop",
    category: "Gifts",
    rating: 4.9,
    reviews: 45,
    stock: 100
  },
  {
    id: "p8",
    name: "Minimalist Ceramic Vase",
    description: "Hand-finished ceramic vase with a matte texture. Perfect for dry flowers or as a standalone decor piece.",
    price: 1500,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800&auto=format&fit=crop",
    category: "Home & Living",
    rating: 4.7,
    reviews: 67,
    stock: 15
  }
];
