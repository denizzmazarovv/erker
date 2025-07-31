import React from "react";
import { X, Calendar, Maximize } from "lucide-react";
import { Project } from "../types/project"; // ✅ исправлено
import { useLanguage } from "../hooks/useLanguage";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { t, language } = useLanguage();

  if (!project || !isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {project.title[language]}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Main Image */}
          <div className="aspect-video mb-8 overflow-hidden rounded-xl">
            <img
              src={project.images[0]} // ✅ используем первое изображение
              alt={project.title[language]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("projectDetails")}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{t("year")}: </span>
                    <span className="font-medium text-gray-900">
                      {project.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Maximize className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{t("area")}: </span>
                    <span className="font-medium text-gray-900">
                      {project.area} m²
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("description")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {project.description[language]}
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {t("gallery")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={image}
                    alt={`${project.title[language]} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
