import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { HomePageData } from '../types';
import apiService from '../services/api';
import { handleError } from '../utils/helpers';

// 定义状态类型
interface HomePageState {
  data: HomePageData | null;
  loading: boolean;
  error: string | null;
}

// 定义动作类型
type HomePageAction =
  | { type: 'FETCH_DATA_START' }
  | { type: 'FETCH_DATA_SUCCESS'; payload: HomePageData }
  | { type: 'FETCH_DATA_FAILURE'; payload: string }
  | { type: 'CLEAR_ERROR' };

// 初始状态
const initialState: HomePageState = {
  data: null,
  loading: false,
  error: null,
};

// 创建上下文
const HomePageStateContext = createContext<HomePageState | undefined>(undefined);
const HomePageDispatchContext = createContext<React.Dispatch<HomePageAction> | undefined>(undefined);

// Reducer函数
function homePageReducer(state: HomePageState, action: HomePageAction): HomePageState {
  switch (action.type) {
    case 'FETCH_DATA_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

// Provider组件
export const HomePageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);

  return (
    <HomePageStateContext.Provider value={state}>
      <HomePageDispatchContext.Provider value={dispatch}>
        {children}
      </HomePageDispatchContext.Provider>
    </HomePageStateContext.Provider>
  );
};

// 自定义Hook，用于访问状态
export function useHomePageState() {
  const context = useContext(HomePageStateContext);
  if (context === undefined) {
    throw new Error('useHomePageState must be used within a HomePageProvider');
  }
  return context;
}

// 自定义Hook，用于访问dispatch
export function useHomePageDispatch() {
  const context = useContext(HomePageDispatchContext);
  if (context === undefined) {
    throw new Error('useHomePageDispatch must be used within a HomePageProvider');
  }
  return context;
}

// 组合Hook，提供状态和操作方法
export function useHomePage() {
  const state = useHomePageState();
  const dispatch = useHomePageDispatch();

  // 加载首页数据
  const fetchHomePageData = async () => {
    try {
      dispatch({ type: 'FETCH_DATA_START' });
      const data = await apiService.getHomepageData();
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
    } catch (error) {
      handleError(error, 'HomePageContext');
      dispatch({
        type: 'FETCH_DATA_FAILURE',
        payload: '加载首页数据失败，请稍后重试',
      });
    }
  };

  // 清除错误
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return {
    ...state,
    fetchHomePageData,
    clearError,
  };
}

// 自动加载数据的Hook
export function useHomePageData() {
  const { data, loading, error, fetchHomePageData } = useHomePage();

  useEffect(() => {
    if (!data && !loading && !error) {
      fetchHomePageData();
    }
  }, [data, loading, error, fetchHomePageData]);

  return { data, loading, error, fetchHomePageData };
}