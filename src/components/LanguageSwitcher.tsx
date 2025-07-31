import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types';

const languages = [
  { code: 'ru' as Language, name: 'RU', fullName: 'Русский' },
  { code: 'uz' as Language, name: 'UZ', fullName: 'O\'zbek' },
  { code: 'en' as Language, name: 'ENG', fullName: 'English' }
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-900 transition-all duration-200 bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg hover:bg-white/30 shadow-lg"
      >
        <span>{currentLang?.name}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <div
        className={`absolute top-full right-0 mt-2 w-32 bg-white/20 backdrop-blur-xl border border-white/30 rounded-lg shadow-xl transition-all duration-200 origin-top-right z-50 ${
          isOpen 
            ? 'opacity-100 scale-100 visible' 
            : 'opacity-0 scale-95 invisible'
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`w-full px-4 py-2 text-left text-sm transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code
                ? 'bg-white/30 text-gray-900 font-medium'
                : 'text-gray-800 hover:bg-white/20 hover:text-gray-900'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{lang.name}</span>
              <span className="text-xs text-gray-600">{lang.fullName}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;