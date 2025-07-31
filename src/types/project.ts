export interface Project {
  id: string;
  folder: string;
  year: string;
  area: string;
  title: Record<"ru" | "en" | "uz", string>;
  description: Record<"ru" | "en" | "uz", string>;
  images: string[];
  mainImage: string;
}
