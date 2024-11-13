// Services.jsx
import React from "react";


const Services = () => {
  const services = [
    {
      id: 1,
      url: require("../../assets/food1 (10).jpg"),
      title: "Appetizing Desert",
    },
    {
      id: 2,
      url: require("../../assets/food1 (9).jpg"),
      title: "Full Service Bars",
    },
    {
      id: 3,
      url: require("../../assets/food1 (8).jpg"),
      title: "Meet our Executive Chef",
    },
    {
      id: 4,
      url: require("../../assets/food1 (4).jpg"),
      title: "Elevated Classic Cuisine",
    },
    {
      id: 5,
      url: require("../../assets/food1 (5).jpg"),
      title: "State of the Art Equipment",
    },
    {
      id: 6,
      url: require("../../assets/food1 (6).jpg"),
      title: "Sumptuous Main Course",
    },
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">Speciality in Food Catering</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-item" key={service.id}>
              <h3 className="service-title">{service.title}</h3>
              <div className="image-container">
                <img className = "abc" src={service.url} alt={service.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;