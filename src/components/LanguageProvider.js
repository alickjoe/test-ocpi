import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Create Language Context
const LanguageContext = createContext();

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isReady, setIsReady] = useState(false);

  // Initialize i18n and set ready state
  useEffect(() => {
    const handleLanguageInitialized = () => {
      setCurrentLanguage(i18n.language);
      setIsReady(true);
    };

    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng);
    };

    // Check if i18n is already initialized
    if (i18n.isInitialized) {
      handleLanguageInitialized();
    } else {
      // Wait for initialization
      i18n.on('initialized', handleLanguageInitialized);
    }

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChanged);

    // Cleanup event listeners
    return () => {
      i18n.off('initialized', handleLanguageInitialized);
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Language change handler
  const changeLanguage = async (language) => {
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  // Toggle between English and Chinese
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    changeLanguage(newLanguage);
  };

  // Get available languages
  const availableLanguages = [
    { code: 'en', name: 'English', nativeName: 'EN' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' }
  ];

  const contextValue = {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    toggleLanguage,
    isReady
  };

  // Show loading state if i18n is not ready
  if (!isReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        Loading translations...
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;