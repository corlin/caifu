import { useCallback, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { storage } from '../utils/helpers';
import { STORAGE_KEYS } from '../constants';

export function useTheme() {
  const { state, dispatch } = useApp();
  const { theme } = state;

  // 切换主题
  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, [dispatch]);

  // 设置特定主题
  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: newTheme });
  }, [dispatch]);

  // 当主题变化时，保存到本地存储并应用到文档
  useEffect(() => {
    // 保存到本地存储
    storage.set(STORAGE_KEYS.THEME_PREFERENCE, theme);
    
    // 应用到文档
    document.documentElement.setAttribute('data-theme', theme);
    
    // 更新meta主题颜色
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#121212' : '#ffffff'
      );
    }
  }, [theme]);

  // 初始化主题
  useEffect(() => {
    const savedTheme = storage.get<'light' | 'dark'>(STORAGE_KEYS.THEME_PREFERENCE);
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // 如果用户系统偏好是暗色主题
      setTheme('dark');
    }
  }, [setTheme]);

  return {
    theme,
    toggleTheme,
    setTheme,
    isDarkMode: theme === 'dark',
  };
}