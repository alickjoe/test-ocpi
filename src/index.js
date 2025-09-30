import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n'; // Import i18n configuration
import App from './App';
import { LanguageProvider } from './components/LanguageProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
