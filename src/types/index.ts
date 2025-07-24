// 首页相关类型定义

// 轮播图幻灯片
export interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaAction: string;
}

// Hero部分
export interface HeroProps {
  slides: Slide[];
  autoPlay: boolean;
  interval: number;
  onCallToAction: (actionId: string) => void;
}

// 特色功能
export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  link?: string;
}

// 特色部分
export interface FeatureSectionProps {
  title: string;
  features: Feature[];
  layout: 'grid' | 'cards' | 'list';
}

// 内容项
export interface ContentItem {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  date: string;
  author?: string;
  link: string;
}

// 内容部分
export interface ContentSectionProps {
  title: string;
  contentItems: ContentItem[];
  layout: 'grid' | 'list';
  pagination: boolean;
  itemsPerPage?: number;
  onLoadMore?: () => void;
}

// 客户评价
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  companyName?: string;
  companyLogo?: string;
  rating?: number;
}

// 评价部分
export interface TestimonialSectionProps {
  title: string;
  testimonials: Testimonial[];
  autoPlay: boolean;
  interval: number;
}

// 行动号召部分
export interface CallToActionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
  backgroundImage?: string;
}

// 导航菜单项
export interface MenuItem {
  id: string;
  title: string;
  url: string;
  subItems?: MenuItem[];
}

// 页眉属性
export interface HeaderProps {
  logo: string;
  menuItems: MenuItem[];
  userAuthenticated: boolean;
  onSearch: (query: string) => void;
  onLogin: () => void;
  onLogout: () => void;
}

// 链接
export interface Link {
  title: string;
  url: string;
}

// 社交链接
export interface SocialLink extends Link {
  icon: string;
}

// 菜单组
export interface MenuGroup {
  title: string;
  items: Link[];
}

// 联系信息
export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

// 页脚属性
export interface FooterProps {
  logo: string;
  menuGroups: MenuGroup[];
  socialLinks: SocialLink[];
  contactInfo: ContactInfo;
  copyrightText: string;
  legalLinks: Link[];
}

// 首页数据
export interface HomePageData {
  hero: {
    slides: Slide[];
    autoPlay: boolean;
    interval: number;
  };
  features: {
    title: string;
    features: Feature[];
    layout: 'grid' | 'cards' | 'list';
  };
  content: {
    title: string;
    contentItems: ContentItem[];
    layout: 'grid' | 'list';
    pagination: boolean;
    itemsPerPage?: number;
  };
  testimonials: {
    title: string;
    testimonials: Testimonial[];
    autoPlay: boolean;
    interval: number;
  };
  callToAction: {
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText?: string;
    backgroundImage?: string;
  };
}

// API响应
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 错误响应
export interface ErrorResponse {
  status: number;
  code: string;
  message: string;
  details?: any;
}

// 搜索结果
export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: 'page' | 'post' | 'product' | 'guide' | 'faq' | 'news' | 'review';
}

// 搜索结果组件属性
export interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  totalResults: number;
  isLoading: boolean;
  error?: string;
  onResultClick?: (result: SearchResult) => void;
  onRetry?: () => void;
}