// components/VenueCard.jsx
import React from 'react';

const VenueCard = ({ venue, onClick }) => {
    return (
        <div style={styles.card} onClick={onClick}>
            <img 
                src={venue.image_upload[0]} 
                alt={venue.venue_name}
                style={styles.image}
            />
            <div style={styles.content}>
                <h3 style={styles.title}>{venue.venue_name}</h3>
                <p style={styles.location}>{venue.address.city}, {venue.address.province}</p>
                <p style={styles.capacity}>Capacity: {venue.min_capacity} - {venue.max_capacity} guests</p>
                <p style={styles.price}>Starting from ${venue.venue_price}</p>
                <div style={styles.status}>
                    <span style={{
                        ...styles.statusDot,
                        backgroundColor: venue.availability_status === 'available' ? '#4CAF50' : '#f44336'
                    }}></span>
                    {venue.availability_status}
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #eee',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },
    content: {
        padding: '15px'
    },
    title: {
        margin: '0 0 10px 0',
        fontSize: '20px',
        color: '#333'
    },
    location: {
        color: '#666',
        marginBottom: '10px'
    },
    capacity: {
        color: '#666',
        marginBottom: '5px'
    },
    price: {
        color: '#2196F3',
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    status: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%'
    }
};

export default VenueCard;