import React, { useState, useEffect, useCallback } from 'react';
import SearchResults from '../components/search/SearchResults';
import { SearchResult } from '../types';
import { mockApiService } from '../services/mockApi';

// 调试日志
console.log('SearchPage module loaded');

const SearchPage: React.FC = () => {
  // 从URL获取查询参数，兼容非Router环境
  const getQueryFromUrl = () => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      return urlSearchParams.get('query') || '';
    } catch (error) {
      console.error('Error parsing URL search params:', error);
      return '';
    }
  };
  
  const query = getQueryFromUrl();
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchSearchResults = useCallback(async () => {
    if (!query) return;
    
    setIsLoading(true);
    setError(undefined);
    
    try {
      const data = await mockApiService.search(query);
      setResults(data.results);
      setTotalResults(data.totalResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : '搜索时发生未知错误');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSearchResults();
  }, [query, fetchSearchResults]);

  const handleResultClick = (result: SearchResult) => {
    // 在实际应用中，这里会导航到结果URL
    console.log('点击了搜索结果:', result);
    window.location.href = result.url;
  };

  return (
    <div className="search-page">
      <div className="container">
        <SearchResults
          query={query}
          results={results}
          totalResults={totalResults}
          isLoading={isLoading}
          error={error}
          onResultClick={handleResultClick}
          onRetry={fetchSearchResults}
        />
      </div>
    </div>
  );
};

export default SearchPage;