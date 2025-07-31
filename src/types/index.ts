export interface Project {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  category: Record<string, string>;
  year: string;
  area: string;
  location: Record<string, string>;
  images: string[];
  mainImage: string;
}

export interface Translation {
  [key: string]: Record<string, string>;
}

export type Language = 'ru' | 'uz' | 'en';