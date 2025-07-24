import React from 'react';
import './CallToAction.css';
import { CallToActionSkeleton } from '../ui';

export interface CallToActionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
  backgroundImage?: string;
  backgroundGradient?: string;
  isLoading?: boolean;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryAction,
  onSecondaryAction,
  backgroundImage,
  backgroundGradient,
  isLoading = false
}) => {
  if (isLoading) {
    return <CallToActionSkeleton />;
  }

  // Determine the background style based on props
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : backgroundGradient
    ? { backgroundImage: backgroundGradient }
    : {};

  return (
    <section 
      className="call-to-action" 
      style={backgroundStyle}
      data-testid="call-to-action-section"
    >
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">{title}</h2>
          <p className="cta-description">{description}</p>
          <div className="cta-buttons">
            <button 
              className="cta-button primary" 
              onClick={onPrimaryAction}
              aria-label={primaryButtonText}
            >
              {primaryButtonText}
            </button>
            {secondaryButtonText && onSecondaryAction && (
              <button 
                className="cta-button secondary" 
                onClick={onSecondaryAction}
                aria-label={secondaryButtonText}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;