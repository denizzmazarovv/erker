import React from "react";
import { Compass, Palette, Users, Eye } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Compass,
      title: t("service1"),
      description: t("service1Desc"),
      features: [
        t("compassLi1"),
        t("compassLi2"),
        t("compassLi3"),
        t("compassLi4"),
      ],
    },
    {
      icon: Palette,
      title: t("service2"),
      description: t("service2Desc"),
      features: [
        t("paletteLi1"),
        t("paletteLi2"),
        t("paletteLi3"),
        t("paletteLi4"),
      ],
    },
    {
      icon: Users,
      title: t("service3"),
      description: t("service3Desc"),
      features: [t("userLi1"), t("userLi2"), t("userLi3"), t("userLi4")],
    },
    {
      icon: Eye,
      title: t("service4"),
      description: t("service4Desc"),
      features: [t("eyeLi1"), t("eyeLi2"), t("eyeLi3"), t("eyeLi4")],
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <p className="text-sm tracking-widest uppercase text-gray-500 font-medium mb-2">
              {t("servicesTitle")}
            </p>
            <div className="w-12 h-px bg-gray-900 mx-auto"></div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8">
            {t("servicesTitletwo")}
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("servicesTitlemini")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 lg:p-10 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
                    <service.icon className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm text-gray-500"
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-4 px-8 py-4 bg-gray-900 text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            <span>{t("startYproject")}</span>
            <div className="w-8 h-px bg-white"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
