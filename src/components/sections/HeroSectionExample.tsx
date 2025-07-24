import React from 'react';
import HeroSection from './HeroSection';

const HeroSectionExample: React.FC = () => {
  const exampleSlides = [
    {
      id: '1',
      imageUrl: '/images/hero-1.jpg',
      title: '欢迎来到我们的网站',
      description: '探索我们提供的优质服务和产品，满足您的各种需求。',
      ctaText: '了解更多',
      ctaAction: 'learn-more'
    },
    {
      id: '2',
      imageUrl: '/images/hero-2.jpg',
      title: '发现创新解决方案',
      description: '我们的专业团队致力于为您提供最佳的解决方案。',
      ctaText: '联系我们',
      ctaAction: 'contact-us'
    },
    {
      id: '3',
      imageUrl: '/images/hero-3.jpg',
      title: '加入我们的社区',
      description: '成为我们不断成长的社区的一部分，共同创造美好未来。',
      ctaText: '立即注册',
      ctaAction: 'sign-up'
    }
  ];

  const handleCallToAction = (actionId: string) => {
    console.log(`Call to action clicked: ${actionId}`);
    // 在实际应用中，这里可以导航到不同的页面或打开模态框
    switch (actionId) {
      case 'learn-more':
        // 导航到"关于我们"页面
        break;
      case 'contact-us':
        // 导航到"联系我们"页面
        break;
      case 'sign-up':
        // 打开注册模态框
        break;
      default:
        break;
    }
  };

  return (
    <HeroSection 
      slides={exampleSlides}
      autoPlay={true}
      interval={5000}
      onCallToAction={handleCallToAction}
    />
  );
};

export default HeroSectionExample;