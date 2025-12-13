import React from 'react';
import Header from './Header';
import { useTranslation } from '../../i18n/hooks/useTranslation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>{t('common.footer.copyright', { year: new Date().getFullYear().toString(), siteName: t('common.siteName') })}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
