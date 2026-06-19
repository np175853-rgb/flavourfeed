export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type DietType = 'Vegan' | 'Vegetarian' | 'Gluten-Free' | 'None' | 'All';

export interface Ingredient {
  name: string;
  amount: number; // Base amount for base serving size
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number; // base serving size
  difficulty: DifficultyLevel;
  category: string;
  ingredients: Ingredient[];
  instructions: string[];
  videoUrl?: string;
  calories: number;
  rating: number;
  reviewsCount: number;
  diet: DietType;
  isFeatured?: boolean;
  isTrending?: boolean;
  author: string;
  authorAvatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorAvatar: string;
  image: string;
  likes: number;
}

export interface Comment {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export interface PhotoAsset {
  id: string;
  imageUrl: string;
  title: string;
  photographer: string;
  photographerAvatar: string;
  story: string;
  stylingTips: string[];
  camera: string;
  lens: string;
  aperture: string;
  iso: number;
  shutterSpeed: string;
}
