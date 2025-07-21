import React from 'react';
import FeatureSection from './FeatureSection';

// Example icons - in a real application, you would import actual SVG files or use an icon library
const featureIcons = {
  feature1: '/images/feature-icon-1.svg',
  feature2: '/images/feature-icon-2.svg',
  feature3: '/images/feature-icon-3.svg',
};

const FeatureSectionExample: React.FC = () => {
  const features = [
    {
      id: '1',
      icon: featureIcons.feature1,
      title: '简单易用',
      description: '我们的产品设计简洁直观，即使是初次使用的用户也能快速上手，无需复杂的学习过程。',
      link: '/features/ease-of-use'
    },
    {
      id: '2',
      icon: featureIcons.feature2,
      title: '强大功能',
      description: '提供全面的功能集，满足各种复杂需求，同时保持界面简洁，不会让用户感到困扰。',
      link: '/features/powerful-features'
    },
    {
      id: '3',
      icon: featureIcons.feature3,
      title: '安全可靠',
      description: '采用先进的安全技术，保护用户数据安全，提供稳定可靠的服务体验。',
    }
  ];

  return (
    <div className="feature-section-examples">
      <h1>特色功能展示示例</h1>
      
      <h2>网格布局</h2>
      <FeatureSection 
        title="我们的核心优势" 
        features={features} 
        layout="grid" 
      />
      
      <h2>卡片布局</h2>
      <FeatureSection 
        title="为什么选择我们" 
        features={features} 
        layout="cards" 
      />
      
      <h2>列表布局</h2>
      <FeatureSection 
        title="产品特点" 
        features={features} 
        layout="list" 
      />
    </div>
  );
};

export default FeatureSectionExample;