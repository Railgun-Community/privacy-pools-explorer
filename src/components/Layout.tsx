import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 your-class">
      <Header />
      <div className="flex-grow  flex items-center justify-center">
        {children}
      </div>
      <Footer />
    </div>
  );
};
