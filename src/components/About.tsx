import React from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Award, Users, Calendar, Target } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Calendar, value: "5+", label: t("yearExp") },
    { icon: Target, value: "100+", label: t("projectsCompleted") },
    { icon: Users, value: "100+", label: t("happyClients") },
    { icon: Award, value: "17+", label: t("awardsWon") },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block mb-6">
                <p className="text-sm tracking-widest uppercase text-gray-500 font-medium mb-2">
                  {t("aboutTitle")}
                </p>
                <div className="w-12 h-px bg-gray-900"></div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8">
                {t("aboutText0")}
              </h2>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">{t("aboutText1")}</p>
              <p className="text-lg">{t("aboutText2")}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-lg mb-3">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg"
                alt="Modern Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-8 shadow-2xl max-w-xs">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  2025
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  {t("aboutExd")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
