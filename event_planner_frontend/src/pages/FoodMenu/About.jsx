import React from 'react';
import './FoodMenu.css';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Every single member of staff on the day was brilliant, all so friendly and kind. The food was incredible; we have received countless compliments. The soup was the best we've ever tasted!",
      author: "Scott Smith"
    },
    {
      quote: "I couldn't have asked for a better event planner. From start to finish, everything was handled with care and precision. Highly recommended for anyone looking to host a memorable event!",
      author: "Sarah Lee"
    }
  ];

  return (
    <section className="testimonials-section">
      <h2>See what our clients say about us</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="quote">{testimonial.quote}</p>
            <p className="author">{testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

/* CSS styles */
