import { useEffect, useState } from "react";

export interface Project {
  id: string;
  folder: string;
  year: string;
  area: string;
  title: {
    ru: string;
    en: string;
    uz: string;
  };
  description: {
    ru: string;
    en: string;
    uz: string;
  };
  images: string[];
  mainImage: string;
}

export const useProjects = (): { projects: Project[]; loading: boolean } => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Ошибка загрузки проектов:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading };
};
