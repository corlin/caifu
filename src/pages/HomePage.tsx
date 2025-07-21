import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
// 这些组件将在后续任务中实现
// import HeroSection from '../components/sections/HeroSection';
// import FeatureSection from '../components/sections/FeatureSection';
// import ContentSection from '../components/sections/ContentSection';
// import TestimonialSection from '../components/sections/TestimonialSection';
// import CallToAction from '../components/sections/CallToAction';

// 模拟数据，后续将从API获取
const mockData = {
  hero: {
    slides: [
      {
        id: '1',
        imageUrl: '/images/hero-1.jpg',
        title: '欢迎来到我们的网站',
        description: '我们提供最好的产品和服务',
        ctaText: '了解更多',
        ctaAction: '/about'
      }
    ],
    autoPlay: true,
    interval: 5000
  },
  features: {
    title: '我们的特色',
    features: [
      {
        id: '1',
        icon: 'icon-feature-1',
        title: '特色功能1',
        description: '这是特色功能1的描述'
      },
      {
        id: '2',
        icon: 'icon-feature-2',
        title: '特色功能2',
        description: '这是特色功能2的描述'
      },
      {
        id: '3',
        icon: 'icon-feature-3',
        title: '特色功能3',
        description: '这是特色功能3的描述'
      }
    ],
    layout: 'grid'
  },
  content: {
    title: '最新内容',
    contentItems: [
      {
        id: '1',
        title: '内容标题1',
        summary: '内容摘要1',
        imageUrl: '/images/content-1.jpg',
        date: '2025-07-21',
        author: '作者1',
        link: '/content/1'
      },
      {
        id: '2',
        title: '内容标题2',
        summary: '内容摘要2',
        imageUrl: '/images/content-2.jpg',
        date: '2025-07-20',
        author: '作者2',
        link: '/content/2'
      }
    ],
    layout: 'grid',
    pagination: false
  },
  testimonials: {
    title: '客户评价',
    testimonials: [
      {
        id: '1',
        quote: '这是一个很棒的产品，我非常喜欢！',
        author: '客户1',
        role: '职位1',
        companyName: '公司1'
      },
      {
        id: '2',
        quote: '服务非常好，推荐给大家！',
        author: '客户2',
        role: '职位2',
        companyName: '公司2'
      }
    ],
    autoPlay: true,
    interval: 4000
  },
  callToAction: {
    title: '准备好开始了吗？',
    description: '立即注册，开始使用我们的服务',
    primaryButtonText: '立即注册',
    secondaryButtonText: '了解更多'
  }
};

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data] = useState(mockData);

  useEffect(() => {
    // 模拟API加载
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      {loading ? (
        <div className="loading-container">
          <p>加载中...</p>
        </div>
      ) : (
        <>
          <div className="section hero-section">
            <div className="container">
              <h1>欢迎来到我们的网站</h1>
              <p>这里是Hero部分，将在后续任务中实现</p>
            </div>
          </div>

          <div className="section features-section">
            <div className="container">
              <div className="section-title">
                <h2>{data.features.title}</h2>
              </div>
              <p>这里是特色功能部分，将在后续任务中实现</p>
            </div>
          </div>

          <div className="section content-section">
            <div className="container">
              <div className="section-title">
                <h2>{data.content.title}</h2>
              </div>
              <p>这里是内容部分，将在后续任务中实现</p>
            </div>
          </div>

          <div className="section testimonial-section">
            <div className="container">
              <div className="section-title">
                <h2>{data.testimonials.title}</h2>
              </div>
              <p>这里是客户评价部分，将在后续任务中实现</p>
            </div>
          </div>

          <div className="section cta-section">
            <div className="container">
              <div className="section-title">
                <h2>{data.callToAction.title}</h2>
                <p>{data.callToAction.description}</p>
              </div>
              <div className="text-center">
                <button className="btn btn-primary mr-3">{data.callToAction.primaryButtonText}</button>
                <button className="btn btn-secondary">{data.callToAction.secondaryButtonText}</button>
              </div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default HomePage;