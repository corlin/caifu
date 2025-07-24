import React, { useState } from 'react';
import ContentSection from './ContentSection';

const ContentSectionExample: React.FC = () => {
  const [page, setPage] = useState(1);
  
  // Mock content items
  const mockContentItems = [
    {
      id: '1',
      title: '如何提高网站性能和用户体验',
      summary: '本文介绍了提高网站性能和用户体验的十大技巧，包括代码优化、缓存策略和响应式设计等方面的最佳实践。',
      imageUrl: '/images/article-1.jpg',
      date: '2025-07-15',
      author: '张三',
      link: '/articles/1'
    },
    {
      id: '2',
      title: '2025年前端开发趋势展望',
      summary: '随着技术的不断发展，前端开发领域也在持续变革。本文分析了2025年前端开发的主要趋势和新兴技术。',
      imageUrl: '/images/article-2.jpg',
      date: '2025-07-10',
      link: '/articles/2'
    },
    {
      id: '3',
      title: '响应式设计的五个关键原则',
      summary: '响应式设计对于现代网站至关重要。本文详细介绍了响应式设计的五个关键原则及其实际应用案例。',
      imageUrl: '/images/article-3.jpg',
      date: '2025-07-05',
      author: '李四',
      link: '/articles/3'
    },
    {
      id: '4',
      title: 'React性能优化指南',
      summary: '本文提供了一系列React应用性能优化的实用技巧，帮助开发者构建更快、更流畅的用户界面。',
      imageUrl: '/images/article-4.jpg',
      date: '2025-06-28',
      author: '王五',
      link: '/articles/4'
    },
    {
      id: '5',
      title: '现代CSS技术与实践',
      summary: '探索现代CSS的新特性和技术，包括Grid布局、Flexbox、CSS变量和新的选择器等，以及它们的实际应用。',
      imageUrl: '/images/article-5.jpg',
      date: '2025-06-20',
      link: '/articles/5'
    },
    {
      id: '6',
      title: '网站安全最佳实践指南',
      summary: '网站安全对于保护用户数据至关重要。本文介绍了保障网站安全的最佳实践和常见漏洞的防范措施。',
      imageUrl: '/images/article-6.jpg',
      date: '2025-06-15',
      author: '赵六',
      link: '/articles/6'
    }
  ];

  // Simulate loading more content
  const handleLoadMore = () => {
    setPage(page + 1);
    // In a real application, you would fetch more data here
    console.log('Loading more content, page:', page + 1);
  };

  return (
    <ContentSection
      title="最新文章与资讯"
      contentItems={mockContentItems}
      layout="grid"
      pagination={true}
      itemsPerPage={6}
      onLoadMore={handleLoadMore}
    />
  );
};

export default ContentSectionExample;