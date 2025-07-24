import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { HomePageProvider, useHomePageData } from '../HomePageContext';
import apiService from '../../services/api';

// 模拟API服务
jest.mock('../../services/api', () => ({
  getHomepageData: jest.fn(),
}));

// 测试组件
const TestComponent = () => {
  const { data, loading, error, fetchHomePageData } = useHomePageData();
  
  return (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      {data && <div data-testid="data">{JSON.stringify(data)}</div>}
      <button onClick={() => fetchHomePageData()} data-testid="fetch-button">
        Fetch Data
      </button>
    </div>
  );
};

describe('HomePageContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state and fetch data on mount', async () => {
    const mockData = {
      hero: { slides: [], autoPlay: true, interval: 5000 },
      features: { title: 'Features', features: [], layout: 'grid' },
      content: { title: 'Content', contentItems: [], layout: 'grid', pagination: false },
      testimonials: { title: 'Testimonials', testimonials: [], autoPlay: true, interval: 5000 },
      callToAction: { title: 'CTA', description: 'Description', primaryButtonText: 'Click' },
    };

    // 模拟API调用成功
    (apiService.getHomepageData as jest.Mock).mockResolvedValueOnce(mockData);

    render(
      <HomePageProvider>
        <TestComponent />
      </HomePageProvider>
    );

    // 初始应该显示加载状态
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // 等待数据加载完成
    await waitFor(() => {
      expect(screen.getByTestId('data')).toBeInTheDocument();
    });

    // 验证数据已加载
    expect(screen.getByTestId('data').textContent).toContain('Features');
    expect(apiService.getHomepageData).toHaveBeenCalledTimes(1);
  });

  it('should handle API errors', async () => {
    // 模拟API调用失败
    (apiService.getHomepageData as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <HomePageProvider>
        <TestComponent />
      </HomePageProvider>
    );

    // 等待错误显示
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    // 验证错误信息
    expect(screen.getByTestId('error').textContent).toContain('加载首页数据失败');
  });

  it('should fetch data when button is clicked', async () => {
    const mockData = {
      hero: { slides: [], autoPlay: true, interval: 5000 },
      features: { title: 'New Features', features: [], layout: 'grid' },
      content: { title: 'Content', contentItems: [], layout: 'grid', pagination: false },
      testimonials: { title: 'Testimonials', testimonials: [], autoPlay: true, interval: 5000 },
      callToAction: { title: 'CTA', description: 'Description', primaryButtonText: 'Click' },
    };

    // 模拟API调用成功
    (apiService.getHomepageData as jest.Mock).mockResolvedValueOnce(mockData);

    render(
      <HomePageProvider>
        <TestComponent />
      </HomePageProvider>
    );

    // 等待初始加载完成
    await waitFor(() => {
      expect(apiService.getHomepageData).toHaveBeenCalledTimes(1);
    });

    // 模拟第二次API调用
    (apiService.getHomepageData as jest.Mock).mockResolvedValueOnce({
      ...mockData,
      features: { title: 'Updated Features', features: [], layout: 'grid' },
    });

    // 点击按钮重新获取数据
    act(() => {
      screen.getByTestId('fetch-button').click();
    });

    // 应该再次显示加载状态
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // 等待新数据加载完成
    await waitFor(() => {
      expect(screen.getByTestId('data').textContent).toContain('Updated Features');
    });

    // 验证API被调用了两次
    expect(apiService.getHomepageData).toHaveBeenCalledTimes(2);
  });
});