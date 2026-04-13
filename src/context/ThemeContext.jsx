import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [color, setColor] = useState(() => {
    return localStorage.getItem('color') || 'blue';
  });

  const [font, setFont] = useState(() => {
    return localStorage.getItem('font') || 'inter';
  });

  const [layout, setLayout] = useState(() => {
    return localStorage.getItem('layout') || 'shadow';
  });

  const [sidebar, setSidebar] = useState(() => {
    return localStorage.getItem('sidebar') || 'vertical';
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-color', color);
    root.setAttribute('data-font', font);
    root.setAttribute('data-layout', layout);
    root.setAttribute('data-sidebar', sidebar);

    localStorage.setItem('theme', theme);
    localStorage.setItem('color', color);
    localStorage.setItem('font', font);
    localStorage.setItem('layout', layout);
    localStorage.setItem('sidebar', sidebar);
  }, [theme, color, font, layout, sidebar]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  const changeFont = (newFont) => {
    setFont(newFont);
  };

  const changeLayout = (newLayout) => {
    setLayout(newLayout);
  };

  const changeSidebar = (newSidebar) => {
    setSidebar(newSidebar);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const value = {
    theme,
    color,
    font,
    layout,
    sidebar,
    sidebarCollapsed,
    toggleTheme,
    changeColor,
    changeFont,
    changeLayout,
    changeSidebar,
    toggleSidebar,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
