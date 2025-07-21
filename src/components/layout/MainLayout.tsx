import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SITE_CONFIG, ROUTES, CONTACT_INFO, SOCIAL_LINKS } from '../../constants';
import { MenuItem, MenuGroup, Link, SocialLink } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;
}

// 示例菜单项
const defaultMenuItems: MenuItem[] = [
  {
    id: '1',
    title: '首页',
    url: ROUTES.HOME,
  },
  {
    id: '2',
    title: '关于我们',
    url: ROUTES.ABOUT,
  },
  {
    id: '3',
    title: '产品',
    url: '/products',
    subItems: [
      {
        id: '3-1',
        title: '产品类别1',
        url: '/products/category1',
      },
      {
        id: '3-2',
        title: '产品类别2',
        url: '/products/category2',
      },
    ],
  },
  {
    id: '4',
    title: '联系我们',
    url: ROUTES.CONTACT,
  },
];

// 页脚菜单组
const footerMenuGroups: MenuGroup[] = [
  {
    title: '关于我们',
    items: [
      { title: '公司简介', url: ROUTES.ABOUT },
      { title: '团队介绍', url: '/team' },
      { title: '发展历程', url: '/history' },
    ],
  },
  {
    title: '产品服务',
    items: [
      { title: '产品一', url: '/products/1' },
      { title: '产品二', url: '/products/2' },
      { title: '服务支持', url: '/support' },
    ],
  },
  {
    title: '帮助中心',
    items: [
      { title: '常见问题', url: '/faq' },
      { title: '使用指南', url: '/guide' },
      { title: '联系我们', url: ROUTES.CONTACT },
    ],
  },
];

// 页脚社交媒体链接
const footerSocialLinks: SocialLink[] = [
  { title: 'Facebook', url: SOCIAL_LINKS.FACEBOOK, icon: 'facebook' },
  { title: 'Twitter', url: SOCIAL_LINKS.TWITTER, icon: 'twitter' },
  { title: 'Instagram', url: SOCIAL_LINKS.INSTAGRAM, icon: 'instagram' },
  { title: 'LinkedIn', url: SOCIAL_LINKS.LINKEDIN, icon: 'linkedin' },
  { title: 'YouTube', url: SOCIAL_LINKS.YOUTUBE, icon: 'youtube' },
];

// 页脚法律链接
const footerLegalLinks: Link[] = [
  { title: '隐私政策', url: '/privacy' },
  { title: '使用条款', url: '/terms' },
  { title: '网站地图', url: '/sitemap' },
];

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // 这些函数在实际应用中会连接到状态管理和API
  const handleSearch = (query: string) => {
    console.log('搜索查询:', query);
    // 实际应用中会重定向到搜索页面或显示搜索结果
  };

  const handleLogin = () => {
    console.log('用户点击登录');
    // 实际应用中会重定向到登录页面或显示登录模态框
  };

  const handleLogout = () => {
    console.log('用户点击退出');
    // 实际应用中会调用退出API并清除用户会话
  };

  return (
    <div className="main-layout">
      <Header
        logo={SITE_CONFIG.logo}
        menuItems={defaultMenuItems}
        userAuthenticated={false}
        onSearch={handleSearch}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <main>{children}</main>
      <Footer
        logo={SITE_CONFIG.logo}
        menuGroups={footerMenuGroups}
        socialLinks={footerSocialLinks}
        contactInfo={CONTACT_INFO}
        copyrightText={`© {year} ${SITE_CONFIG.name}. 保留所有权利.`}
        legalLinks={footerLegalLinks}
      />
    </div>
  );
};

export default MainLayout;