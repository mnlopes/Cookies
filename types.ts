
export interface Cookie {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  color: string; // Tailwind text color class approximation or hex
}

export interface CartItem extends Cookie {
  quantity: number;
  isBox?: boolean;
  boxContents?: Cookie[];
}

export interface AiRecommendation {
  recommendedCookieId: string;
  reason: string;
}
