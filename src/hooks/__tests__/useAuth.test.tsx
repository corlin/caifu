import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import { useAuth } from '../useAuth';
import apiService from '../../services/api';
import { storage } from '../../utils/helpers';
import { STORAGE_KEYS } from '../../constants';

// 模拟API服务和存储
jest.mock('../../services/api', () => ({
  login: jest.fn(),
}));

jest.mock('../../utils/helpers', () => ({
  storage: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
  handleError: jest.fn(),
}));

// 测试组件
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      <div data-testid="is-authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="user-data">{user.userData ? JSON.stringify(user.userData) : 'null'}</div>
      <button
        onClick={() => login('testuser', 'password')}
        data-testid="login-button"
      >
        Login
      </button>
      <button
        onClick={logout}
        data-testid="logout-button"
      >
        Logout
      </button>
    </div>
  );
};

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful login', async () => {
    const mockUserData = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      token: 'test-token',
    };
    
    // 模拟API调用成功
    (apiService.login as jest.Mock).mockResolvedValueOnce(mockUserData);
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // 初始未认证
    expect(screen.getByTestId('is-authenticated').textContent).toBe('false');
    
    // 点击登录按钮
    fireEvent.click(screen.getByTestId('login-button'));
    
    // 等待认证状态更新
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated').textContent).toBe('true');
    });
    
    // 验证用户数据
    expect(screen.getByTestId('user-data').textContent).toContain('Test User');
    
    // 验证API调用
    expect(apiService.login).toHaveBeenCalledWith('testuser', 'password');
    
    // 验证存储调用
    expect(storage.set).toHaveBeenCalledWith(STORAGE_KEYS.AUTH_TOKEN, 'test-token');
    expect(storage.set).toHaveBeenCalledWith(STORAGE_KEYS.USER_DATA, mockUserData);
  });

  it('should handle logout', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // 模拟已登录状态
    fireEvent.click(screen.getByTestId('login-button'));
    
    // 等待认证状态更新
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated').textContent).toBe('true');
    });
    
    // 点击退出按钮
    fireEvent.click(screen.getByTestId('logout-button'));
    
    // 验证认证状态
    expect(screen.getByTestId('is-authenticated').textContent).toBe('false');
    expect(screen.getByTestId('user-data').textContent).toBe('null');
    
    // 验证存储调用
    expect(storage.remove).toHaveBeenCalledWith(STORAGE_KEYS.AUTH_TOKEN);
    expect(storage.remove).toHaveBeenCalledWith(STORAGE_KEYS.USER_DATA);
  });

  it('should handle login failure', async () => {
    // 模拟API调用失败
    (apiService.login as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // 点击登录按钮
    fireEvent.click(screen.getByTestId('login-button'));
    
    // 等待API调用完成
    await waitFor(() => {
      expect(apiService.login).toHaveBeenCalled();
    });
    
    // 验证认证状态未改变
    expect(screen.getByTestId('is-authenticated').textContent).toBe('false');
  });
});