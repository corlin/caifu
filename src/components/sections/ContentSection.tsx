import React from 'react';
import './ContentSection.css';
import { ContentSkeleton } from '../ui';

export interface ContentItem {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  date: string;
  author?: string;
  link: string;
}

export interface ContentSectionProps {
  title: string;
  contentItems: ContentItem[];
  layout: 'grid' | 'list';
  pagination: boolean;
  itemsPerPage?: number;
  onLoadMore?: () => void;
  isLoading?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  contentItems,
  layout = 'grid',
  pagination = false,
  itemsPerPage = 6,
  onLoadMore,
  isLoading = false
}) => {
  if (isLoading) {
    return <ContentSkeleton layout={layout} count={itemsPerPage} showImage={true} />;
  }

  return (
    <section className={`content-section content-section-${layout}`}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className={`content-container ${layout}`}>
          {contentItems.map((item) => (
            <div key={item.id} className="content-item">
              {item.imageUrl && (
                <div className="content-image">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
              )}
              <div className="content-details">
                <h3 className="content-title">
                  <a href={item.link}>{item.title}</a>
                </h3>
                <div className="content-meta">
                  <span className="content-date">{item.date}</span>
                  {item.author && (
                    <span className="content-author">作者: {item.author}</span>
                  )}
                </div>
                <p className="content-summary">{item.summary}</p>
                <a href={item.link} className="content-link">
                  阅读更多
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {pagination && contentItems.length >= itemsPerPage && (
          <div className="content-pagination">
            <button 
              className="load-more-button" 
              onClick={onLoadMore}
            >
              加载更多
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentSection;