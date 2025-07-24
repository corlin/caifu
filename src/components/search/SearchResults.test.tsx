import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from './SearchResults';
import { SearchResult } from '../../types';

describe('SearchResults Component', () => {
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: '测试结果 1',
      excerpt: '这是第一个测试结果的摘要内容',
      url: '/test-result-1',
      type: 'page'
    },
    {
      id: '2',
      title: '测试结果 2',
      excerpt: '这是第二个测试结果的摘要内容',
      url: '/test-result-2',
      type: 'post'
    }
  ];

  const defaultProps = {
    query: '测试',
    results: mockResults,
    totalResults: 2,
    isLoading: false
  };

  test('渲染搜索结果列表', () => {
    render(<SearchResults {...defaultProps} />);
    
    // 检查标题和摘要是否正确显示
    expect(screen.getByText('搜索结果')).toBeInTheDocument();
    
    // 使用更灵活的方式检查文本内容
    const summaryElement = screen.getByText(/找到/, { exact: false });
    expect(summaryElement).toBeInTheDocument();
    expect(summaryElement.textContent).toContain('找到');
    expect(summaryElement.textContent).toContain('2');
    expect(summaryElement.textContent).toContain('测试');
    
    // 检查结果项是否正确显示
    expect(screen.getByText('测试结果 1')).toBeInTheDocument();
    expect(screen.getByText('这是第一个测试结果的摘要内容')).toBeInTheDocument();
    expect(screen.getByText('测试结果 2')).toBeInTheDocument();
    expect(screen.getByText('这是第二个测试结果的摘要内容')).toBeInTheDocument();
    
    // 检查结果类型是否正确显示
    expect(screen.getByText('page')).toBeInTheDocument();
    expect(screen.getByText('post')).toBeInTheDocument();
  });

  test('渲染加载状态', () => {
    render(<SearchResults {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText(/正在搜索"测试".../)).toBeInTheDocument();
    expect(document.querySelector('.search-results__spinner')).toBeInTheDocument();
  });

  test('渲染错误状态', () => {
    const onRetry = jest.fn();
    render(
      <SearchResults 
        {...defaultProps} 
        error="网络错误" 
        onRetry={onRetry} 
      />
    );
    
    expect(screen.getByText(/搜索出错: 网络错误/)).toBeInTheDocument();
    
    // 测试重试按钮
    const retryButton = screen.getByText('重试');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test('渲染无结果状态', () => {
    render(<SearchResults {...defaultProps} results={[]} totalResults={0} />);
    
    expect(screen.getByText(/没有找到与"测试"相关的结果/)).toBeInTheDocument();
    expect(screen.getByText(/请尝试使用不同的关键词或更广泛的搜索词/)).toBeInTheDocument();
  });

  test('点击结果项触发回调', () => {
    const onResultClick = jest.fn();
    render(<SearchResults {...defaultProps} onResultClick={onResultClick} />);
    
    const resultItem = screen.getByText('测试结果 1').closest('li');
    fireEvent.click(resultItem!);
    
    expect(onResultClick).toHaveBeenCalledTimes(1);
    expect(onResultClick).toHaveBeenCalledWith(mockResults[0]);
  });
});