import React, { useEffect, useState } from 'react';
import { HomePageData } from '../types';
import { mockApiService as apiService } from '../services/mockApi';
import { handleError } from '../utils/helpers';

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
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const homepageData = await apiService.getHomepageData();
        setData(homepageData);
        setError(null);
      } catch (err) {
        handleError(err, 'HomePageContainer');
        setError('加载首页数据失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 处理行动号召按钮点击
  const handleCallToAction = (actionId: string) => {
    console.log('Action clicked:', actionId);
    // 这里可以添加导航逻辑
  };

  // 处理加载更多内容
  const handleLoadMore = () => {
    console.log('Load more content');
    // 这里可以添加加载更多内容的逻辑
  };

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