import React from 'react';
import CallToAction from './CallToAction';

const CallToActionExample: React.FC = () => {
  const handlePrimaryAction = () => {
    console.log('Primary action clicked');
    // In a real application, this would navigate to a signup page or open a modal
  };

  const handleSecondaryAction = () => {
    console.log('Secondary action clicked');
    // In a real application, this might navigate to a different page
  };

  return (
    <CallToAction
      title="准备好开始了吗？"
      description="立即注册，体验我们的产品和服务。我们提供免费试用，无需信用卡。"
      primaryButtonText="立即注册"
      secondaryButtonText="了解更多"
      onPrimaryAction={handlePrimaryAction}
      onSecondaryAction={handleSecondaryAction}
      // Uncomment one of these to see different background options
      // backgroundImage="/images/cta-background.jpg"
      // backgroundGradient="linear-gradient(135deg, #0066cc, #004080)"
    />
  );
};

export default CallToActionExample;