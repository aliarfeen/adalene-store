export interface RawStarDistribution {
  "5_star": number;
  "4_star": number;
  "3_star": number;
  "2_star": number;
  "1_star": number;
}

export interface Comment {
  commentId: string;
  author: string;
  date: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  text: string;
}


export interface Product {
  resource: 'products';
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
  orderQuantity: number;
  bestSeller: boolean;
  rating: {
    starDistribution: RawStarDistribution;
  };
  comments: Comment[];

  sold?: number;
}