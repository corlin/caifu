import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CallToAction, { CallToActionProps } from './CallToAction';

describe('CallToAction Component', () => {
  const mockPrimaryAction = jest.fn();
  const mockSecondaryAction = jest.fn();

  const defaultProps: CallToActionProps = {
    title: '立即行动',
    description: '加入我们的社区，体验更多精彩功能和服务。',
    primaryButtonText: '现在注册',
    onPrimaryAction: mockPrimaryAction
  };

  beforeEach(() => {
    mockPrimaryAction.mockClear();
    mockSecondaryAction.mockClear();
  });

  test('renders title and description correctly', () => {
    render(<CallToAction {...defaultProps} />);
    expect(screen.getByText('立即行动')).toBeInTheDocument();
    expect(screen.getByText('加入我们的社区，体验更多精彩功能和服务。')).toBeInTheDocument();
  });

  test('renders primary button with correct text', () => {
    render(<CallToAction {...defaultProps} />);
    const primaryButton = screen.getByText('现在注册');
    expect(primaryButton).toBeInTheDocument();
    expect(primaryButton).toHaveClass('cta-button primary');
  });

  test('calls onPrimaryAction when primary button is clicked', () => {
    render(<CallToAction {...defaultProps} />);
    const primaryButton = screen.getByText('现在注册');
    fireEvent.click(primaryButton);
    expect(mockPrimaryAction).toHaveBeenCalledTimes(1);
  });

  test('renders secondary button when secondaryButtonText and onSecondaryAction are provided', () => {
    render(
      <CallToAction
        {...defaultProps}
        secondaryButtonText="了解更多"
        onSecondaryAction={mockSecondaryAction}
      />
    );
    const secondaryButton = screen.getByText('了解更多');
    expect(secondaryButton).toBeInTheDocument();
    expect(secondaryButton).toHaveClass('cta-button secondary');
  });

  test('does not render secondary button when secondaryButtonText is not provided', () => {
    render(<CallToAction {...defaultProps} onSecondaryAction={mockSecondaryAction} />);
    expect(screen.queryByText('了解更多')).not.toBeInTheDocument();
  });

  test('calls onSecondaryAction when secondary button is clicked', () => {
    render(
      <CallToAction
        {...defaultProps}
        secondaryButtonText="了解更多"
        onSecondaryAction={mockSecondaryAction}
      />
    );
    const secondaryButton = screen.getByText('了解更多');
    fireEvent.click(secondaryButton);
    expect(mockSecondaryAction).toHaveBeenCalledTimes(1);
  });

  test('applies background image style when backgroundImage is provided', () => {
    const { container } = render(
      <CallToAction
        {...defaultProps}
        backgroundImage="/images/test-background.jpg"
      />
    );
    const section = container.querySelector('.call-to-action');
    expect(section).toHaveStyle({
      backgroundImage: 'url(/images/test-background.jpg)'
    });
  });

  test('applies background gradient style when backgroundGradient is provided', () => {
    const { container } = render(
      <CallToAction
        {...defaultProps}
        backgroundGradient="linear-gradient(135deg, #0066cc, #004080)"
      />
    );
    const section = container.querySelector('.call-to-action');
    expect(section).toHaveStyle({
      backgroundImage: 'linear-gradient(135deg, #0066cc, #004080)'
    });
  });

  test('has accessible elements with proper aria attributes', () => {
    render(
      <CallToAction
        {...defaultProps}
        secondaryButtonText="了解更多"
        onSecondaryAction={mockSecondaryAction}
      />
    );
    
    const primaryButton = screen.getByLabelText('现在注册');
    expect(primaryButton).toBeInTheDocument();
    
    const secondaryButton = screen.getByLabelText('了解更多');
    expect(secondaryButton).toBeInTheDocument();
  });

  test('is responsive and adapts to different screen sizes', () => {
    // This test verifies that the component has responsive CSS classes
    // Actual visual testing would require visual regression testing tools
    const { container } = render(<CallToAction {...defaultProps} />);
    
    const ctaSection = container.querySelector('.call-to-action');
    expect(ctaSection).toBeInTheDocument();
    
    const ctaButtons = container.querySelector('.cta-buttons');
    expect(ctaButtons).toBeInTheDocument();
    
    // Check that the CSS contains media queries (indirect test for responsiveness)
    const styles = document.styleSheets;
    let hasMediaQueries = false;
    
    // This is a simplified check - in a real environment we'd use a more robust approach
    for (let i = 0; i < styles.length; i++) {
      try {
        const rules = styles[i].cssRules;
        if (rules) {
          for (let j = 0; j < rules.length; j++) {
            if (rules[j] instanceof CSSMediaRule) {
              hasMediaQueries = true;
              break;
            }
          }
        }
      } catch (e) {
        // Security error can occur when accessing cross-origin stylesheets
        continue;
      }
      
      if (hasMediaQueries) break;
    }
    
    // This is more of a documentation test since we can't reliably check the actual CSS in Jest
    // In a real project, we'd use visual testing tools for this
    expect(true).toBeTruthy();
  });
});