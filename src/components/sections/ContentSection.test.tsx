import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentSection, { ContentSectionProps } from './ContentSection';

describe('ContentSection Component', () => {
  const mockContentItems = [
    {
      id: '1',
      title: '最新文章一',
      summary: '这是最新文章一的摘要，介绍文章的主要内容和亮点。',
      imageUrl: '/images/article-1.jpg',
      date: '2025-07-15',
      author: '张三',
      link: '/articles/1'
    },
    {
      id: '2',
      title: '最新文章二',
      summary: '这是最新文章二的摘要，介绍文章的主要内容和亮点。',
      imageUrl: '/images/article-2.jpg',
      date: '2025-07-10',
      link: '/articles/2'
    },
    {
      id: '3',
      title: '最新文章三',
      summary: '这是最新文章三的摘要，介绍文章的主要内容和亮点。',
      imageUrl: '/images/article-3.jpg',
      date: '2025-07-05',
      author: '李四',
      link: '/articles/3'
    }
  ];

  const defaultProps: ContentSectionProps = {
    title: '最新内容',
    contentItems: mockContentItems,
    layout: 'grid',
    pagination: false
  };

  test('renders section title correctly', () => {
    render(<ContentSection {...defaultProps} />);
    expect(screen.getByText('最新内容')).toBeInTheDocument();
  });

  test('renders all content items', () => {
    render(<ContentSection {...defaultProps} />);
    expect(screen.getByText('最新文章一')).toBeInTheDocument();
    expect(screen.getByText('最新文章二')).toBeInTheDocument();
    expect(screen.getByText('最新文章三')).toBeInTheDocument();
  });

  test('renders content summaries', () => {
    render(<ContentSection {...defaultProps} />);
    expect(screen.getByText('这是最新文章一的摘要，介绍文章的主要内容和亮点。')).toBeInTheDocument();
    expect(screen.getByText('这是最新文章二的摘要，介绍文章的主要内容和亮点。')).toBeInTheDocument();
    expect(screen.getByText('这是最新文章三的摘要，介绍文章的主要内容和亮点。')).toBeInTheDocument();
  });

  test('renders author information when available', () => {
    render(<ContentSection {...defaultProps} />);
    expect(screen.getByText('作者: 张三')).toBeInTheDocument();
    expect(screen.getByText('作者: 李四')).toBeInTheDocument();
    // Article 2 doesn't have an author
    expect(screen.queryByText('作者: ')).not.toBeInTheDocument();
  });

  test('renders dates for all content items', () => {
    render(<ContentSection {...defaultProps} />);
    expect(screen.getByText('2025-07-15')).toBeInTheDocument();
    expect(screen.getByText('2025-07-10')).toBeInTheDocument();
    expect(screen.getByText('2025-07-05')).toBeInTheDocument();
  });

  test('renders "阅读更多" links for all items', () => {
    render(<ContentSection {...defaultProps} />);
    const readMoreLinks = screen.getAllByText('阅读更多');
    expect(readMoreLinks).toHaveLength(3);
  });

  test('applies correct layout class', () => {
    const { container, rerender } = render(<ContentSection {...defaultProps} layout="grid" />);
    expect(container.querySelector('.content-container.grid')).toBeInTheDocument();
    
    rerender(<ContentSection {...defaultProps} layout="list" />);
    expect(container.querySelector('.content-container.list')).toBeInTheDocument();
  });

  test('renders images for all content items', () => {
    render(<ContentSection {...defaultProps} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', '/images/article-1.jpg');
    expect(images[1]).toHaveAttribute('src', '/images/article-2.jpg');
    expect(images[2]).toHaveAttribute('src', '/images/article-3.jpg');
  });

  test('does not render pagination when pagination is false', () => {
    render(<ContentSection {...defaultProps} pagination={false} />);
    expect(screen.queryByText('加载更多')).not.toBeInTheDocument();
  });

  test('renders pagination when pagination is true and there are enough items', () => {
    const onLoadMore = jest.fn();
    render(
      <ContentSection 
        {...defaultProps} 
        pagination={true} 
        itemsPerPage={3} 
        onLoadMore={onLoadMore} 
      />
    );
    
    const loadMoreButton = screen.getByText('加载更多');
    expect(loadMoreButton).toBeInTheDocument();
    
    fireEvent.click(loadMoreButton);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  test('does not render pagination when there are fewer items than itemsPerPage', () => {
    render(
      <ContentSection 
        {...defaultProps} 
        pagination={true} 
        itemsPerPage={4} // More than the 3 mock items
      />
    );
    
    expect(screen.queryByText('加载更多')).not.toBeInTheDocument();
  });
});