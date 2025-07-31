import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      label: t("phone"),
      value: "+998 97 702 35 11",
      href: "tel:+998977023511",
    },
    {
      icon: Mail,
      label: t("email"),
      value: "erkeruz@gmail.com",
      href: "mailto:info@erkeruz@gmail.com",
    },
    {
      icon: MapPin,
      label: t("address"),
      value: "Tashkent City, Mirzo Ulugbek District",
      href: null,
    },
    {
      icon: Clock,
      label: t("workingHours"),
      value: t("workingDays") + ": 9:00 - 18:00",
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block mb-6">
                <p className="text-sm tracking-widest uppercase text-gray-500 font-medium mb-2">
                  {t("contactTitle")}
                </p>
                <div className="w-12 h-px bg-gray-900"></div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8">
                {t("contactTitletext")}
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                {t("contactText")}
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src="/src/images/contact.jpeg"
                alt="Architecture Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
