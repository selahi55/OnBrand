import React from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

type LayoutProps = {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  pageTitle: string;
};

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, pageTitle }) => {
  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      
      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">{pageTitle}</h1>
        </header>
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
