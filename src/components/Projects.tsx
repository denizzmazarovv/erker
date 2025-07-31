import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useProjects } from "../hooks/useProjects";
import { Project } from "../types/project"; // Используй тип из правильного места
import ProjectModal from "./ProjectModal";

const Projects = () => {
  const { t, language } = useLanguage();
  const { projects, loading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="text-center py-20">{t("loading") || "Loading..."}</div>
    );
  }

  return (
    <>
      <section id="projects" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <p className="text-sm tracking-widest uppercase text-gray-500 font-medium mb-2">
                {t("projectsTitle")}
              </p>
              <div className="w-12 h-px bg-gray-900 mx-auto"></div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              {t("projectsText")}
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer ${
                  index % 3 === 0 ? "md:col-span-2" : ""
                }`}
                onClick={() => openModal(project)}
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[16/10] mb-6">
                  <img
                    src={project.images[0]} // ВАЖНО: используем images[0]
                    alt={project.title[language]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.area} m²</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                    {project.title[language]}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {project.description[language]}
                  </p>

                  <button className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all duration-200">
                    <span>{t("viewProject")}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Projects;
