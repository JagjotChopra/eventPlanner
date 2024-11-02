import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VenueSection = () => {
    const [venues, setVenues] = useState([]);
    // Base URL for your images
    const BASE_URL = 'http://localhost:9000/uploads/';
     // Fetch categories from the backend
     useEffect(() => {
        const fetchVenue = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/eventvenue/venues');
                setVenues(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchVenue();
    }, []);

    return (
        <section className = 'venue' style={{
            padding: '8px 20px',
            background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
        }}>
            <div style={{
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto 60px',
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    color: '#333',
                    marginBottom: '20px',
                    fontWeight: '600',
                }}>Our Stunning Venues</h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    lineHeight: '1.6',
                }}>Discover our collection of magnificent spaces perfect for your special occasions</p>
            </div>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                maxWidth: '1200px',
                margin: '0 auto 20px',
            }}>
                {venues.map((venue) => (
                    <div key={venue._id} style={{
                        background: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}>
                        <div style={{
                            width: '100%',
                            height: '250px',
                            overflow: 'hidden',
                        }}>
                            <img
                                src={`${BASE_URL}${venue.image_upload[0]}`}
                                alt={venue.venue_name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease',
                                }}
                            />
                        </div>
                        <div style={{
                            padding: '20px',
                        }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                color: '#333',
                                marginBottom: '10px',
                                fontWeight: '500',
                            }}>{venue.venue_name}</h3>
                            <p style={{
                                color: '#666',
                                marginBottom: '15px',
                                lineHeight: '1.5',
                            }}>{venue.description || venue.address.street}</p>
                            <span style={{
                                display: 'inline-block',
                                background: '#f0f2f5',
                                padding: '8px 15px',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                color: '#555',
                            }}>Capacity: {venue.min_capacity} - {venue.max_capacity} guests</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VenueSection;
