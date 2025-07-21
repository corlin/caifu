import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, ERROR_MESSAGES } from '../constants';
import { ApiResponse, ErrorResponse, HomePageData } from '../types';
import { storage, handleError } from '../utils/helpers';
import { STORAGE_KEYS } from '../constants';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从本地存储获取认证令牌
    const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;
    
    if (error.response) {
      // 服务器返回了错误响应
      switch (error.response.status) {
        case 401:
          errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
          // 可以在这里处理认证失败的情况，例如重定向到登录页面
          break;
        case 404:
          errorMessage = ERROR_MESSAGES.NOT_FOUND;
          break;
        case 500:
          errorMessage = ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          errorMessage = error.response.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      }
    } else if (error.request) {
      // 请求已发送但没有收到响应
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
    }
    
    handleError(error, 'API Request');
    return Promise.reject({ message: errorMessage, originalError: error });
  }
);

// API服务
export const apiService = {
  // 获取首页数据
  getHomepageData: async (): Promise<HomePageData> => {
    try {
      // 检查缓存
      const cachedData = storage.get<{ data: HomePageData, timestamp: number }>(STORAGE_KEYS.HOMEPAGE_CACHE);
      const now = Date.now();
      
      // 如果缓存存在且未过期，则使用缓存数据
      if (cachedData && (now - cachedData.timestamp < 300000)) { // 5分钟缓存
        return cachedData.data;
      }
      
      // 缓存不存在或已过期，发送API请求
      const response = await apiClient.get<ApiResponse<HomePageData>>('/homepage');
      const homepageData = response.data.data;
      
      // 更新缓存
      storage.set(STORAGE_KEYS.HOMEPAGE_CACHE, {
        data: homepageData,
        timestamp: now
      });
      
      return homepageData;
    } catch (error) {
      // 如果API请求失败但缓存存在，则使用缓存数据（即使已过期）
      const cachedData = storage.get<{ data: HomePageData, timestamp: number }>(STORAGE_KEYS.HOMEPAGE_CACHE);
      if (cachedData) {
        return cachedData.data;
      }
      
      // 如果没有缓存，则抛出错误
      throw error;
    }
  },
  
  // 搜索API
  search: async (query: string): Promise<any> => {
    const response = await apiClient.get(`/search?query=${encodeURIComponent(query)}`);
    return response.data.data;
  },
  
  // 用户认证API
  login: async (username: string, password: string): Promise<any> => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data.data;
  },
  
  // 其他API方法可以在这里添加
};

export default apiService;