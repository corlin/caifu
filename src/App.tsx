import React, { useEffect } from 'react';
import AppRoutes from './routes';
import './assets/styles/global.css';
import { RootProvider } from './context/RootContext';
import { useAuth } from './hooks/useAuth';

// 内部App组件，可以使用上下文
const AppContent = () => {
  const { checkAuthStatus } = useAuth();
  
  // 应用启动时检查认证状态
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
  
  return <AppRoutes />;
};

// 主App组件，提供上下文
function App() {
  return (
    <RootProvider>
      <AppContent />
    </RootProvider>
  );
}

export default App;