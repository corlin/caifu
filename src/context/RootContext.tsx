import React from 'react';
import { AppProvider } from './AppContext';
import { HomePageProvider } from './HomePageContext';

// 根Provider组件，组合所有上下文Provider
export const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <HomePageProvider>
        {children}
      </HomePageProvider>
    </AppProvider>
  );
};

export default RootProvider;