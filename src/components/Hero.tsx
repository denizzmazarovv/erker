import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

const heroImages = [
  "/src/images/carousel/1.jpg",
  "/src/images/carousel/2.jpeg",
  "/src/images/carousel/3.jpeg",
  "/src/images/carousel/4.jpeg",
];

const Hero = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Architecture ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="inline-block">
            <p className="text-sm md:text-base tracking-widest uppercase font-light mb-2 text-gray-200">
              {t("heroSubtitle")}
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
            {t("heroTitle")}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
            {t("heroDescription")}
          </p>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
