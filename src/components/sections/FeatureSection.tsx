import React from 'react';
import './FeatureSection.css';

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  link?: string;
}

export interface FeatureSectionProps {
  title: string;
  features: Feature[];
  layout: 'grid' | 'cards' | 'list';
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ 
  title, 
  features, 
  layout = 'grid' 
}) => {
  return (
    <section className={`feature-section feature-section-${layout}`}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className={`feature-container ${layout}`}>
          {features.map((feature) => (
            <div key={feature.id} className="feature-item">
              <div className="feature-icon">
                <img src={feature.icon} alt="" aria-hidden="true" />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              {feature.link && (
                <a href={feature.link} className="feature-link">
                  了解更多
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;