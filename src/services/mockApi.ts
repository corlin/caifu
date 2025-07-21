import { HomePageData } from '../types';
import { DEFAULT_IMAGES, CAROUSEL_CONFIG } from '../constants';

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟首页数据
const mockHomepageData: HomePageData = {
  hero: {
    slides: [
      {
        id: '1',
        imageUrl: DEFAULT_IMAGES.HERO_BACKGROUND,
        title: '欢迎来到我们的网站',
        description: '我们提供最好的产品和服务，满足您的各种需求',
        ctaText: '了解更多',
        ctaAction: '/about'
      },
      {
        id: '2',
        imageUrl: '/images/hero-bg-2.jpg',
        title: '探索我们的特色产品',
        description: '高品质、创新的产品，为您的生活带来便利',
        ctaText: '浏览产品',
        ctaAction: '/products'
      },
      {
        id: '3',
        imageUrl: '/images/hero-bg-3.jpg',
        title: '专业的服务团队',
        description: '我们的专家随时为您提供帮助和支持',
        ctaText: '联系我们',
        ctaAction: '/contact'
      }
    ],
    autoPlay: true,
    interval: CAROUSEL_CONFIG.autoPlayInterval
  },
  features: {
    title: '我们的特色',
    features: [
      {
        id: '1',
        icon: DEFAULT_IMAGES.FEATURE_ICON,
        title: '高品质产品',
        description: '我们只提供最高品质的产品，确保您的满意度'
      },
      {
        id: '2',
        icon: DEFAULT_IMAGES.FEATURE_ICON,
        title: '专业服务',
        description: '我们的专业团队随时为您提供支持和帮助'
      },
      {
        id: '3',
        icon: DEFAULT_IMAGES.FEATURE_ICON,
        title: '创新设计',
        description: '我们的产品采用创新设计，提供更好的用户体验'
      },
      {
        id: '4',
        icon: DEFAULT_IMAGES.FEATURE_ICON,
        title: '快速交付',
        description: '我们承诺快速交付，让您尽快享受我们的产品和服务'
      }
    ],
    layout: 'grid'
  },
  content: {
    title: '最新内容',
    contentItems: [
      {
        id: '1',
        title: '如何选择适合您的产品',
        summary: '本文将指导您如何根据自己的需求选择最适合的产品',
        imageUrl: '/images/content-1.jpg',
        date: '2025-07-21',
        author: '张三',
        link: '/blog/how-to-choose-product'
      },
      {
        id: '2',
        title: '产品使用指南',
        summary: '详细介绍我们产品的使用方法和技巧',
        imageUrl: '/images/content-2.jpg',
        date: '2025-07-20',
        author: '李四',
        link: '/blog/product-usage-guide'
      },
      {
        id: '3',
        title: '客户成功案例',
        summary: '了解我们的客户如何成功使用我们的产品',
        imageUrl: '/images/content-3.jpg',
        date: '2025-07-19',
        author: '王五',
        link: '/blog/customer-success-story'
      },
      {
        id: '4',
        title: '行业趋势分析',
        summary: '深入分析行业最新趋势和发展方向',
        imageUrl: '/images/content-4.jpg',
        date: '2025-07-18',
        author: '赵六',
        link: '/blog/industry-trends'
      }
    ],
    layout: 'grid',
    pagination: true,
    itemsPerPage: 4
  },
  testimonials: {
    title: '客户评价',
    testimonials: [
      {
        id: '1',
        quote: '这是我使用过的最好的产品之一，非常满意！',
        author: '张先生',
        role: 'CEO',
        companyName: 'ABC公司'
      },
      {
        id: '2',
        quote: '服务非常专业，团队反应迅速，解决问题高效。',
        author: '李女士',
        role: '市场总监',
        companyName: 'XYZ企业'
      },
      {
        id: '3',
        quote: '产品质量超出预期，价格也很合理，强烈推荐！',
        author: '王先生',
        role: '技术总监',
        companyName: '123科技'
      }
    ],
    autoPlay: true,
    interval: 4000
  },
  callToAction: {
    title: '准备好开始了吗？',
    description: '立即注册，开始使用我们的服务',
    primaryButtonText: '立即注册',
    secondaryButtonText: '了解更多',
    backgroundImage: '/images/cta-bg.jpg'
  }
};

// 模拟API服务
export const mockApiService = {
  // 获取首页数据
  getHomepageData: async (): Promise<HomePageData> => {
    // 模拟网络延迟
    await delay(800);
    return mockHomepageData;
  },
  
  // 搜索API
  search: async (query: string): Promise<any> => {
    await delay(500);
    // 模拟搜索结果
    return {
      results: [
        {
          id: '1',
          title: `搜索结果 1 for "${query}"`,
          excerpt: '这是搜索结果1的摘要...',
          url: '/result/1',
          type: 'page'
        },
        {
          id: '2',
          title: `搜索结果 2 for "${query}"`,
          excerpt: '这是搜索结果2的摘要...',
          url: '/result/2',
          type: 'post'
        }
      ],
      totalResults: 2,
      page: 1,
      totalPages: 1
    };
  },
  
  // 用户认证API
  login: async (username: string, password: string): Promise<any> => {
    await delay(600);
    // 模拟登录响应
    if (username === 'test' && password === 'password') {
      return {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: '测试用户',
          email: 'test@example.com',
          avatar: DEFAULT_IMAGES.AVATAR
        }
      };
    } else {
      throw new Error('用户名或密码不正确');
    }
  }
};

export default mockApiService;