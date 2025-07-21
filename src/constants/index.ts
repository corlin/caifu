// 应用程序常量

// 网站配置
export const SITE_CONFIG = {
  name: process.env.REACT_APP_SITE_NAME || '我的网站',
  description: process.env.REACT_APP_SITE_DESCRIPTION || '这是一个现代化的网站',
  url: process.env.REACT_APP_SITE_URL || 'http://localhost:3000',
  logo: '/images/logo.png',
};

// API配置
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  timeout: 10000,
};

// 响应式断点
export const BREAKPOINTS = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400,
};

// 动画配置
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
};

// 轮播配置
export const CAROUSEL_CONFIG = {
  autoPlayInterval: 5000,
  transitionDuration: 500,
  pauseOnHover: true,
};

// 分页配置
export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
};

// 搜索配置
export const SEARCH_CONFIG = {
  debounceDelay: 300,
  minQueryLength: 2,
  maxResults: 50,
};

// 缓存配置
export const CACHE_CONFIG = {
  homepageDataTTL: 5 * 60 * 1000, // 5分钟
  searchResultsTTL: 2 * 60 * 1000, // 2分钟
  userDataTTL: 30 * 60 * 1000, // 30分钟
};

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查您的网络设置',
  SERVER_ERROR: '服务器错误，请稍后重试',
  UNAUTHORIZED: '您没有权限访问此资源',
  NOT_FOUND: '请求的资源不存在',
  VALIDATION_ERROR: '输入数据格式不正确',
  UNKNOWN_ERROR: '发生未知错误，请稍后重试',
};

// 成功消息
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '登录成功',
  LOGOUT_SUCCESS: '退出成功',
  SAVE_SUCCESS: '保存成功',
  DELETE_SUCCESS: '删除成功',
  UPDATE_SUCCESS: '更新成功',
};

// 本地存储键名
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME_PREFERENCE: 'themePreference',
  LANGUAGE_PREFERENCE: 'languagePreference',
  HOMEPAGE_CACHE: 'homepageCache',
};

// 路由路径
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SEARCH: '/search',
};

// 社交媒体链接
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com',
  TWITTER: 'https://twitter.com',
  INSTAGRAM: 'https://instagram.com',
  LINKEDIN: 'https://linkedin.com',
  YOUTUBE: 'https://youtube.com',
};

// 联系信息
export const CONTACT_INFO = {
  email: 'contact@example.com',
  phone: '+86 123 4567 8900',
  address: '北京市朝阳区某某街道123号',
};

// 默认图片
export const DEFAULT_IMAGES = {
  AVATAR: '/images/default-avatar.png',
  PLACEHOLDER: '/images/placeholder.png',
  HERO_BACKGROUND: '/images/hero-bg.jpg',
  FEATURE_ICON: '/images/feature-icon.svg',
};

// 表单验证规则
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^1[3-9]\d{9}$/,
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
};

// 性能监控配置
export const PERFORMANCE_CONFIG = {
  enableLogging: process.env.NODE_ENV === 'development',
  slowThreshold: 1000, // 毫秒
  memoryThreshold: 50 * 1024 * 1024, // 50MB
};