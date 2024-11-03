// components/EventCategory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventCategory = () => {
    const [categories, setCategories] = useState([]);
    
    // Base URL for your images
    const BASE_URL = 'http://localhost:9000/uploads/';

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/eventcategories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <section className="events" style={categorySectionStyle}>
            <h3 style={{color:'#5B3413', fontSize:'45px'}}>Event Categories</h3>
            <div style={categoryContainerStyle}>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category._id} style={categoryCardStyle}>
                            <img 
                                src={`${BASE_URL}${category.image}`} // Construct the correct image URL
                                alt={category.name} 
                                style={imageStyle} 
                            />
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No event categories available.</p> // Handle empty state
                )}
            </div>
        </section>
    );
};

// Styles
const categorySectionStyle = { padding: '50px 20px', textAlign: 'center', backgroundColor: '#f4f4f4' };
const categoryContainerStyle = { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' };
const categoryCardStyle = { width: '300px', textAlign: 'center' };
const imageStyle = { width: '100%', height: '200px', borderRadius: '8px' };

export default EventCategory;
