import React from 'react';
import { Fab, Tooltip, Zoom } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useLanguage } from './LanguageProvider';

const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage, availableLanguages } = useLanguage();

  // Get current language display name
  const getCurrentLanguageDisplay = () => {
    const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);
    return currentLang ? currentLang.nativeName : 'EN';
  };

  // Get next language display name
  const getNextLanguageDisplay = () => {
    const nextLanguageCode = currentLanguage === 'en' ? 'zh' : 'en';
    const nextLang = availableLanguages.find(lang => lang.code === nextLanguageCode);
    return nextLang ? nextLang.nativeName : '中文';
  };

  return (
    <Zoom in={true}>
      <Tooltip 
        title={`Switch to ${getNextLanguageDisplay()}`}
        placement="left"
        arrow
      >
        <Fab
          color="primary"
          size="medium"
          onClick={toggleLanguage}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1300,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
              transform: 'scale(1.05)'
            },
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Toggle language"
        >
          <LanguageIcon sx={{ fontSize: 20, mb: 0.5 }} />
          <span style={{ 
            fontSize: '10px', 
            fontWeight: 'bold',
            lineHeight: 1,
            textTransform: 'uppercase'
          }}>
            {getCurrentLanguageDisplay()}
          </span>
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default LanguageToggle;