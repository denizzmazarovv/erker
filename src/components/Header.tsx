import React, { useState, useEffect } from "react";
import { Building2, Menu, X } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? " bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 text-secondary"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2  rounded-lg">
              <img src="/src/images/logo.png" alt="" width={35} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">ERKER</h1>
              <p className="text-xs text-gray-600 uppercase tracking-wide"></p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className={`transition-colors duration-200 font-medium ${
                isScrolled
                  ? "text-gray-900 hover:text-black"
                  : "text-white hover:text-gray-200"
              }`}
            >
              {t("about")}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`transition-colors duration-200 font-medium ${
                isScrolled
                  ? "text-gray-900 hover:text-black"
                  : "text-white hover:text-gray-200"
              }`}
            >
              {t("projects")}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`transition-colors duration-200 font-medium ${
                isScrolled
                  ? "text-gray-900 hover:text-black"
                  : "text-white hover:text-gray-200"
              }`}
            >
              {t("services")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`transition-colors duration-200 font-medium ${
                isScrolled
                  ? "text-gray-900 hover:text-black"
                  : "text-white hover:text-gray-200"
              }`}
            >
              {t("contact")}
            </button>
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-800 hover:text-gray-900 transition-all duration-200 bg-white/50 backdrop-blur-lg border border-white/30 rounded-lg hover:bg-white/30 shadow-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav
            className={`py-4 border-t border-white/30 bg-white/20 backdrop-blur-xl rounded-b-lg shadow-xl mx-4 mb-4 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            <div className="flex flex-col gap-4 px-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left py-2 text-gray-800 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {t("about")}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-left py-2 text-gray-800 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {t("projects")}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left py-2 text-gray-800 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {t("services")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left py-2 text-gray-800 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {t("contact")}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
