import React from "react";
import {
  Building2,
  Instagram,
  Facebook,
  // Telegram,
  // Youtube,
} from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { useLanguage } from "../hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/erker_uz",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/erker_uz", // <-- сюда можешь вставить настоящий адрес
      label: "Facebook",
    },
    {
      icon: FaTelegramPlane,
      href: "https://t.me/erker_uz",
      label: "Telegram",
    },
    // { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg">
                <img src="/src/images/logoWhite.png" alt="" width={35} />
              </div>
              <div>
                <h3 className="text-xl font-bold">ERKER</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wide"></p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed">{t("footerTitle")}</p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t("navigation")}</h4>
            <nav className="space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t("about")}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t("projects")}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t("services")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t("contact")}
              </button>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4 text-gray-400">
              <p>
                <a href="tel:+998977023511">+998 97 702 35 11</a>
              </p>
              <p>erkeruz@gmail.com</p>
              <p>
                Tashkent City
                <br />
                Mirzo Ulugbek District
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="https://www.instagram.com/deniz4me">
            <p className="text-gray-400 text-sm">
              © 2025 ERKER {t("footerText")}
            </p>
          </a>
          <div className="flex gap-6 text-sm text-gray-400">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              {t("privacyPolicy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
