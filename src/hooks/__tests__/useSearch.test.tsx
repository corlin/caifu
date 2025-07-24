import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import { useSearch } from '../useSearch';
import apiService from '../../services/api';

// 模拟API服务
jest.mock('../../services/api', () => ({
  search: jest.fn(),
}));

// 测试组件
const TestComponent = () => {
  const { search, performSearch, clearSearch } = useSearch();
  
  return (
    <div>
      <div data-testid="query">{search.query}</div>
      <div data-testid="loading">{search.loading.toString()}</div>
      <div data-testid="error">{search.error || 'null'}</div>
      <div data-testid="results-count">{search.results.length}</div>
      <button
        onClick={() => performSearch('test query')}
        data-testid="search-button"
      >
        Search
      </button>
      <button
        onClick={clearSearch}
        data-testid="clear-button"
      >
        Clear
      </button>
    </div>
  );
};

describe('useSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful search', async () => {
    const mockResults = {
      results: [
        { id: '1', title: 'Result 1', excerpt: 'Excerpt 1', url: '/result1', type: 'page' },
        { id: '2', title: 'Result 2', excerpt: 'Excerpt 2', url: '/result2', type: 'post' },
      ],
      totalResults: 2,
    };
    
    // 模拟API调用成功
    (apiService.search as jest.Mock).mockResolvedValueOnce(mockResults);
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // 初始状态
    expect(screen.getByTestId('query').textContent).toBe('');
    expect(screen.getByTestId('loading').textContent).toBe('false');
    expect(screen.getByTestId('results-count').textContent).toBe('0');
    
    // 点击搜索按钮
    fireEvent.click(screen.getByTestId('search-button'));
    
    // 应该显示加载状态
    expect(screen.getByTestId('loading').textContent).toBe('true');
    expect(screen.getByTestId('query').textContent).toBe('test query');
    
    // 等待搜索完成
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false');
    });
    
    // 验证结果
    expect(screen.getByTestId('results-count').textContent).toBe('2');
    expect(apiService.search).toHaveBeenCalledWith('test query');
  });

  it('should handle search failure', async () => {
    // 模拟API调用失败
    (apiService.search as jest.Mock).mockRejectedValueOnce(new Error('Search failed'));
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // 点击搜索按钮
    fireEvent.click(screen.getByTestId('search-button'));
    
    // 等待搜索完成
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false');
    });
    
    // 验证错误状态
    expect(screen.getByTestId('error').textContent).not.toBe('null');
    expect(screen.getByTestId('results-count').textContent).toBe('0');
  });

  it('should clear search results', async () => {
    const mockResults = {
      results: [{ id: '1', title: 'Result 1', excerpt: 'Excerpt 1', url: '/result1', type: 'page' }],
      totalResults: 1,
    };
    
    // 模拟API调用成功
    (apiService.search as jest.Mock).mockResolvedValueOnce(mockResults);
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // 执行搜索
    fireEvent.click(screen.getByTestId('search-button'));
    
    // 等待搜索完成
    await waitFor(() => {
      expect(screen.getByTestId('results-count').textContent).toBe('1');
    });
    
    // 清除搜索
    fireEvent.click(screen.getByTestId('clear-button'));
    
    // 验证状态已重置
    expect(screen.getByTestId('query').textContent).toBe('');
    expect(screen.getByTestId('results-count').textContent).toBe('0');
  });
});