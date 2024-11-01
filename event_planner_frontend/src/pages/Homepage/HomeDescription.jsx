import React from 'react';

const HomeDescription = () => {
  return (
    <section className="hero-section">
      <div className="content-wrapper">
        <div className="title-container">
          <div className="accent-line"></div>
          <h1>Create Unforgettable Moments with Us</h1>
          <div className="accent-line"></div>
        </div>

        <div className="message-container">
          <p className="main-message">
            Whether it's a <span className="accent">grand wedding</span>, 
            a <span className="accent">corporate gala</span>, or 
            a <span className="accent">social gathering</span>, 
            our team of event specialists will bring your vision to life.
          </p>
          <p className="secondary-message">
            Let us take care of every detail, from planning to 
            <span className="emphasis">Execution</span>, 
            so you can focus on celebrating.
          </p>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: 100px 24px;
          background: linear-gradient(
            to right bottom,
            #ffffff,
            #f8f9fa,
            #f5f6f8
          );
          position: relative;
        }

        .content-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        .title-container {
          text-align: center;
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .accent-line {
          width: 80px;
          height: 3px;
          background: linear-gradient(
            to right,
            #e5e7eb,
            #4a5568,
            #e5e7eb
          );
        }

        h1 {
          font-size: 3.2rem;
          font-weight: 700;
          color: #5B3413;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin: 0;
          padding: 0 20px;
        }

        .message-container {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.02),
            0 10px 15px rgba(0, 0, 0, 0.03),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
        }

        .message-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            to right,
            #4a5568,
            #718096,
            #4a5568
          );
        }

        .main-message {
          font-size: 1.4rem;
          line-height: 1.7;
          color: #2d3748;
          margin-bottom: 25px;
          font-weight: 400;
        }

        .secondary-message {
          font-size: 1.3rem;
          line-height: 1.6;
          color: #4a5568;
          margin: 0;
        }

        .accent {
          color: #4a5568;
          font-weight: 600;
          position: relative;
          padding: 0 4px;
        }

        .accent::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #e2e8f0;
          z-index: -1;
        }

        .emphasis {
          display: inline-block;
          font-weight: 600;
          color: #2d3748;
          margin: 0 8px;
          padding: 2px 12px;
          background: #f7fafc;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .emphasis:hover {
          background: #edf2f7;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 70px 20px;
          }

          h1 {
            font-size: 2.6rem;
          }

          .message-container {
            padding: 30px;
          }

          .main-message {
            font-size: 1.2rem;
          }

          .secondary-message {
            font-size: 1.1rem;
          }

          .accent-line {
            width: 60px;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 50px 16px;
          }

          h1 {
            font-size: 2rem;
          }

          .message-container {
            padding: 25px;
          }

          .main-message {
            font-size: 1.1rem;
            margin-bottom: 20px;
          }

          .secondary-message {
            font-size: 1rem;
          }

          .accent-line {
            width: 40px;
          }

          .emphasis {
            padding: 2px 8px;
            margin: 0 4px;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeDescription;