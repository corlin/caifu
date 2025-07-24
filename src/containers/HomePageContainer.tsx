import React, { useCallback } from 'react';
import { HomePageData } from '../types';
import { useHomePageData } from '../context/HomePageContext';
import { useApp } from '../context/AppContext';

interface HomePageContainerProps {
  children: (props: {
    data: HomePageData | null;
    loading: boolean;
    error: string | null;
    handleCallToAction: (actionId: string) => void;
    handleLoadMore: () => void;
  }) => React.ReactNode;
}

const HomePageContainer: React.FC<HomePageContainerProps> = ({ children }) => {
  // 使用我们的自定义Hook获取首页数据
  const { data, loading, error, fetchHomePageData } = useHomePageData();
  const { dispatch } = useApp();

  // 处理行动号召按钮点击
  const handleCallToAction = useCallback((actionId: string) => {
    console.log('Action clicked:', actionId);
    // 这里可以添加导航逻辑
  }, []);

  // 处理加载更多内容
  const handleLoadMore = useCallback(() => {
    console.log('Load more content');
    // 这里可以添加加载更多内容的逻辑
  }, []);

  return (
    <>
      {children({
        data,
        loading,
        error,
        handleCallToAction,
        handleLoadMore,
      })}
    </>
  );
};

export default HomePageContainer;