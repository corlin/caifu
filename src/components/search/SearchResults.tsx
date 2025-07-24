import React from 'react';
import { SearchResultsProps } from '../../types';
import './SearchResults.css';
import { SearchResultsSkeleton } from '../ui';

const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  totalResults,
  isLoading,
  error,
  onResultClick,
  onRetry
}) => {
  // 渲染加载状态
  if (isLoading) {
    return <SearchResultsSkeleton count={5} />;
  }

  // 渲染错误状态
  if (error) {
    return (
      <div className="search-results search-results--error">
        <div className="search-results__error-message">
          <p>搜索出错: {error}</p>
          {onRetry && (
            <button 
              className="search-results__retry-button" 
              onClick={onRetry}
            >
              重试
            </button>
          )}
        </div>
      </div>
    );
  }

  // 渲染无结果状态
  if (results.length === 0) {
    return (
      <div className="search-results search-results--empty">
        <p>没有找到与"{query}"相关的结果</p>
        <p className="search-results__suggestion">请尝试使用不同的关键词或更广泛的搜索词</p>
      </div>
    );
  }

  // 渲染搜索结果
  return (
    <div className="search-results">
      <div className="search-results__header">
        <h2 className="search-results__title">搜索结果</h2>
        <p className="search-results__summary">
          找到 <strong>{totalResults}</strong> 个与 "<strong>{query}</strong>" 相关的结果
        </p>
      </div>
      
      <ul className="search-results__list">
        {results.map((result) => (
          <li 
            key={result.id} 
            className="search-results__item"
            onClick={() => onResultClick && onResultClick(result)}
          >
            <h3 className="search-results__item-title">{result.title}</h3>
            <p className="search-results__item-excerpt">{result.excerpt}</p>
            <div className="search-results__item-meta">
              <span className="search-results__item-type">{result.type}</span>
              <span className="search-results__item-url">{result.url}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;