import React, { createContext, useReducer, useContext } from 'react';
import { SearchResult } from '../types';

// 用户状态
interface UserState {
  isAuthenticated: boolean;
  userData: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  } | null;
}

// 搜索状态
interface SearchState {
  query: string;
  results: SearchResult[];
  totalResults: number;
  loading: boolean;
  error: string | null;
}

// 应用程序状态
interface AppState {
  user: UserState;
  search: SearchState;
  theme: 'light' | 'dark';
}

// 定义动作类型
type AppAction =
  // 用户相关动作
  | { type: 'LOGIN_SUCCESS'; payload: any }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER_DATA'; payload: any }
  // 搜索相关动作
  | { type: 'SEARCH_START'; payload: string }
  | { type: 'SEARCH_SUCCESS'; payload: { results: SearchResult[]; totalResults: number } }
  | { type: 'SEARCH_FAILURE'; payload: string }
  | { type: 'CLEAR_SEARCH' }
  // 主题相关动作
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

// 初始状态
const initialState: AppState = {
  user: {
    isAuthenticated: false,
    userData: null,
  },
  search: {
    query: '',
    results: [],
    totalResults: 0,
    loading: false,
    error: null,
  },
  theme: 'light',
};

// 创建上下文
const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<React.Dispatch<AppAction> | undefined>(undefined);

// Reducer函数
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // 用户相关
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: {
          isAuthenticated: true,
          userData: action.payload,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {
          isAuthenticated: false,
          userData: null,
        },
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        user: {
          ...state.user,
          userData: {
            ...state.user.userData,
            ...action.payload,
          },
        },
      };
    // 搜索相关
    case 'SEARCH_START':
      return {
        ...state,
        search: {
          ...state.search,
          query: action.payload,
          loading: true,
          error: null,
        },
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload.results,
          totalResults: action.payload.totalResults,
          loading: false,
          error: null,
        },
      };
    case 'SEARCH_FAILURE':
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          error: action.payload,
        },
      };
    case 'CLEAR_SEARCH':
      return {
        ...state,
        search: {
          query: '',
          results: [],
          totalResults: 0,
          loading: false,
          error: null,
        },
      };
    // 主题相关
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}

// Provider组件
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// 自定义Hook，用于访问状态
export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}

// 自定义Hook，用于访问dispatch
export function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context;
}

// 组合Hook，提供状态和操作方法
export function useApp() {
  return { state: useAppState(), dispatch: useAppDispatch() };
}