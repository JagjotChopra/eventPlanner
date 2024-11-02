// FoodDrinkSection.jsx
import React from 'react';
import './homepage.css';

const FoodDrinkSection = () => {
    const items = [
        { 
            name: 'Buffet Style',
            image: require("../../assets/food1 (4).jpg"),
            description: 'Elegant buffet stations with diverse culinary options'
        },
        { 
            name: 'Assorted Drinks',
            image: require("../../assets/pexels-expect-best-79873-1243337.jpg"), 
            description: 'Professional mixologists serving signature drinks'
        },
        { 
            name: 'Plated Meals',
            image: require("../../assets/food1 (1).jpg"),
            description: 'Fine dining experience with personalized service'
        },
    ];

    return (
        <section className="food">
            <div className="food-container">
                <h2 className="food-title">Food & Drink Options</h2>
                <div className="food-grid">
                    {items.map((item) => (
                        <div key={item.name} className="food-card">
                            <div className="food-image-container">
                                <img src={item.image} alt={item.name} className="food-image" />
                            </div>
                            <div className="food-content">
                                <h3 className="food-subtitle">{item.name}</h3>
                                <p className="food-description">{item.description}</p>
                            </div>
                            
                        </div>
                    ))
                    
                    }
                    
                </div>
                <a href='/foodmenu' style={{ display: 'flex', justifyContent: 'center', textDecoration:'none'}}>
                    <button className="view-more-btn">View More</button>
                </a>
            </div>
        </section>
    );
};

export default FoodDrinkSection;

