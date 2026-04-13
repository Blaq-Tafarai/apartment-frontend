import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useTheme } from '../../context/ThemeContext';

const MainLayout = () => {
  const { sidebar } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div 
        className={`
          flex flex-col min-h-screen transition-all duration-300
          ${sidebar === 'horizontal' ? '' : 'lg:ml-[var(--sidebar-width)]'}
        `}
        id="main-content"
      >
        <Header />
        
        <main 
          className={`
            flex-1 p-4 lg:p-6
            ${sidebar === 'horizontal' ? '' : 'mt-16'}
          `}
        >
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;