import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import apiService from '../services/api';
import { handleError } from '../utils/helpers';
import { storage } from '../utils/helpers';
import { STORAGE_KEYS } from '../constants';

export function useAuth() {
  const { state, dispatch } = useApp();
  const { user } = state;

  // 登录
  const login = useCallback(async (username: string, password: string) => {
    try {
      const userData = await apiService.login(username, password);
      
      // 存储认证令牌
      if (userData.token) {
        storage.set(STORAGE_KEYS.AUTH_TOKEN, userData.token);
      }
      
      // 存储用户数据
      storage.set(STORAGE_KEYS.USER_DATA, userData);
      
      // 更新状态
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      
      return { success: true };
    } catch (error) {
      handleError(error, 'Authentication');
      return {
        success: false,
        error: '登录失败，请检查您的用户名和密码',
      };
    }
  }, [dispatch]);

  // 退出登录
  const logout = useCallback(() => {
    // 清除存储的认证数据
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.USER_DATA);
    
    // 更新状态
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]);

  // 检查认证状态
  const checkAuthStatus = useCallback(() => {
    const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
    const userData = storage.get(STORAGE_KEYS.USER_DATA);
    
    if (token && userData) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      return true;
    }
    
    return false;
  }, [dispatch]);

  return {
    user,
    login,
    logout,
    checkAuthStatus,
    isAuthenticated: user.isAuthenticated,
  };
}