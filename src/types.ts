// src/types.ts
export interface Project {
  /** Уникальный идентификатор — имя папки */
  id: string;
  /** Год проекта */
  year: string;
  /** Площадь проекта */
  area: string;
  /** Путь к главному изображению */
  mainImage: string;
  /** Массив путей к картинкам галереи */
  images: string[];
  /** Название на трёх языках */
  title: Record<"ru" | "en" | "uz", string>;
  /** Описание на трёх языках */
  description: Record<"ru" | "en" | "uz", string>;
  /** Категория на трёх языках – теперь опционально */
  category?: Record<"ru" | "en" | "uz", string>;
  /** Локация на трёх языках – теперь опционально */
  location?: Record<"ru" | "en" | "uz", string>;
}
