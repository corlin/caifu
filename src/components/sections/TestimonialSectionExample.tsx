import React from 'react';
import TestimonialSection from './TestimonialSection';

const TestimonialSectionExample: React.FC = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: '1',
      quote: 'This product has completely transformed our business operations. The implementation was smooth and the results were immediate.',
      author: 'Jane Doe',
      role: 'CEO',
      companyName: 'Tech Solutions',
      rating: 5
    },
    {
      id: '2',
      quote: 'The customer service is exceptional and the product is top-notch. We couldn\'t be happier with our decision to partner with this company.',
      author: 'John Smith',
      role: 'CTO',
      companyName: 'Digital Innovations',
      rating: 4
    },
    {
      id: '3',
      quote: 'We have seen a 40% increase in productivity since implementing this solution. The ROI has been incredible.',
      author: 'Emily Johnson',
      role: 'Operations Manager',
      companyName: 'Global Enterprises',
      rating: 5
    }
  ];

  return (
    <div>
      <h1>Testimonial Section Examples</h1>
      
      <h2>Carousel Layout</h2>
      <TestimonialSection 
        title="What Our Customers Say" 
        testimonials={testimonials} 
        layout="carousel"
        autoPlay={true}
        interval={5000}
      />
      
      <h2>Grid Layout</h2>
      <TestimonialSection 
        title="Customer Testimonials" 
        testimonials={testimonials} 
        layout="grid"
      />
    </div>
  );
};

export default TestimonialSectionExample;