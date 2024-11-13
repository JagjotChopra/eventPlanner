// About.jsx
import React, { useEffect, useRef } from 'react';
import './homepage.css';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const paragraphs = document.querySelectorAll('.about-paragraph');
    paragraphs.forEach(p => observer.observe(p));
    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <div className="about-container">
        <h2 className="about-title">About</h2>
        <div className="about-content">
          <p className="about-paragraph">
            At Refined Stack Co, we specialize in turning your ideas into perfectly planned events, 
            whether you're hosting a corporate conference, a dream wedding, or a lively birthday party. 
            Our dedicated team of event professionals manages everything from concept to execution, 
            ensuring a stress-free planning experience.
          </p>
          
          <p className="about-paragraph">
            With a range of services tailored for corporate events, job fairs, weddings, and social celebrations, 
            we offer personalized solutions that meet your unique needs and exceed your expectations. 
            From venue selection and décor to catering and entertainment, we take care of every detail, 
            allowing you to enjoy your event to the fullest.
          </p>
          
          <p className="about-paragraph">
            Let's make your next event unforgettable! Explore our services and see how we bring 
            your celebrations to life, no matter the size or occasion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

