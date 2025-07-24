import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider, useApp } from '../AppContext';

// 测试组件
const TestComponent = () => {
  const { state, dispatch } = useApp();
  
  return (
    <div>
      <div data-testid="theme">{state.theme}</div>
      <div data-testid="is-authenticated">{state.user.isAuthenticated.toString()}</div>
      <div data-testid="search-query">{state.search.query}</div>
      <button
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        data-testid="toggle-theme"
      >
        Toggle Theme
      </button>
      <button
        onClick={() => dispatch({ type: 'LOGIN_SUCCESS', payload: { id: '1', name: 'Test User' } })}
        data-testid="login"
      >
        Login
      </button>
      <button
        onClick={() => dispatch({ type: 'LOGOUT' })}
        data-testid="logout"
      >
        Logout
      </button>
      <button
        onClick={() => dispatch({ type: 'SEARCH_START', payload: 'test query' })}
        data-testid="search"
      >
        Search
      </button>
    </div>
  );
};

describe('AppContext', () => {
  it('should provide initial state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(screen.getByTestId('is-authenticated').textContent).toBe('false');
    expect(screen.getByTestId('search-query').textContent).toBe('');
  });

  it('should toggle theme', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // 初始主题是light
    expect(screen.getByTestId('theme').textContent).toBe('light');
    
    // 切换主题
    fireEvent.click(screen.getByTestId('toggle-theme'));
    
    // 主题应该变为dark
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    
    // 再次切换主题
    fireEvent.click(screen.getByTestId('toggle-theme'));
    
    // 主题应该变回light
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('should handle login and logout', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // 初始未认证
    expect(screen.getByTestId('is-authenticated').textContent).toBe('false');
    
    // 登录
    fireEvent.click(screen.getByTestId('login'));
    
    // 应该已认证
    expect(screen.getByTestId('is-authenticated').textContent).toBe('true');
    
    // 退出登录
    fireEvent.click(screen.getByTestId('logout'));
    
    // 应该未认证
    expect(screen.getByTestId('is-authenticated').textContent).toBe('false');
  });

  it('should handle search', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // 初始搜索查询为空
    expect(screen.getByTestId('search-query').textContent).toBe('');
    
    // 执行搜索
    fireEvent.click(screen.getByTestId('search'));
    
    // 搜索查询应该更新
    expect(screen.getByTestId('search-query').textContent).toBe('test query');
  });
});