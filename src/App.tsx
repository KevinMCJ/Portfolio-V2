import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkTheme = localStorage.getItem('theme') === 'dark';
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDarkTheme = isDarkTheme || (!localStorage.getItem('theme') && isSystemDark);

    if (shouldUseDarkTheme) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  }

  return (
    <main className="min-h-screen vstack center bg-gray-100 dark:bg-blue-900">
      <h1 className="text-4xl font-bold text-primary text-center">
        {t('welcomeMessage')}
      </h1>
      <button
        onClick={toggleLanguage}
        className='mx-auto mt-3 px-3 py-4 rounded-sm border bg-cyan-500 border-cyan-700 dark:border-cyan-300'
        aria-label={i18n.language === 'en' ? 'Cambiar a español' : 'Change to English'}
      >
        {i18n.language === 'en' ? 'Change language to Spanish' : 'Cambiar idioma a ingles'}
      </button>
      <button
        onClick={toggleTheme}
        className="fixed center bottom-4 right-4 size-14 rounded-full bg-primary text-white hover:bg-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-secondary dark:hover:bg-primary"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <FaSun className="w-6 h-6" aria-hidden="true" />
        ) : (
          <FaMoon className="w-6 h-6" aria-hidden="true" />
        )}
      </button>
    </main>
  );
}

export default App;
