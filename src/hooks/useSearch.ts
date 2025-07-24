import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import apiService from '../services/api';
import { handleError } from '../utils/helpers';
import { SEARCH_CONFIG } from '../constants';

export function useSearch() {
  const { state, dispatch } = useApp();
  const { search } = state;

  // 执行搜索
  const performSearch = useCallback(async (query: string) => {
    if (!query || query.length < SEARCH_CONFIG.minQueryLength) {
      return;
    }

    try {
      dispatch({ type: 'SEARCH_START', payload: query });
      const data = await apiService.search(query);
      dispatch({
        type: 'SEARCH_SUCCESS',
        payload: {
          results: data.results,
          totalResults: data.totalResults,
        },
      });
    } catch (error) {
      handleError(error, 'Search');
      dispatch({
        type: 'SEARCH_FAILURE',
        payload: '搜索失败，请稍后重试',
      });
    }
  }, [dispatch]);

  // 清除搜索结果
  const clearSearch = useCallback(() => {
    dispatch({ type: 'CLEAR_SEARCH' });
  }, [dispatch]);

  return {
    search,
    performSearch,
    clearSearch,
  };
}