import { useMediaQuery } from '@mui/material';
import { createContext, useEffect, useMemo, useState } from 'react';
import getTheme from '../../theme/theme';
import { ThemeProvider } from '@mui/material';

const CustomThemeContext = createContext(null);

const CustomThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState(localStorage.getItem('mode') || 'system');

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'mode') {
        setMode(e.newValue || 'system');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const theme = useMemo(
    () =>
      getTheme(mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode),
    [mode, prefersDarkMode]
  );

  const toggleTheme = (newMode) => {
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  return (
    <CustomThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      <ThemeProvider theme={theme} >
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export { CustomThemeContext, CustomThemeProvider };
