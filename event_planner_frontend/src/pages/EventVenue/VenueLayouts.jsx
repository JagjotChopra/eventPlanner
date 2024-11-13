// VenueLayouts.jsx
import React from 'react';
import theatreStyle from '../../assets/theatre-style.png';  // Import your images
import uShape from '../../assets/u-shape.png';
import banquet from '../../assets/banquet.png';

const VenueLayouts = () => {
    const layoutOptions = [
        {
            title: 'ROW BASED theatre STYLE',
            image: theatreStyle,
            capacity: '100-200 people',
            bestFor: 'Conferences, Presentations, Ceremonies',
            description: 'Row-based seating arrangement ideal for large audiences and presentations.'
        },
        {
            title: 'U-SHAPE STYLE',
            image: uShape,
            capacity: '80-60 people',
            bestFor: 'Meetings, Training Sessions, Workshops',
            description: 'Interactive setup perfect for discussions and collaborative sessions.'
        },
        {
            title: 'CIRCULAR BANQUET STYLE',
            image: banquet,
            capacity: '50-150 people',
            bestFor: 'Weddings, Galas, Celebrations',
            description: 'Circular table arrangement ideal for social events and celebrations.'
        }
    ];

    return (
        <div style={styles.section}>
            <h1 style={styles.mainTitle}>AVAILABLE SEATING ARRANGEMENTS</h1>
            
            <div style={styles.cardContainer}>
                {layoutOptions.map((layout, index) => (
                    <div key={index} style={styles.card}>
                        <div style={styles.imageContainer}>
                            <img 
                                src={layout.image} 
                                alt={layout.title}
                                style={styles.image}
                            />
                        </div>
                        <div style={styles.contentContainer}>
                            <h3 style={styles.cardTitle}>{layout.title}</h3>
                            <p style={styles.description}>{layout.description}</p>
                            <div style={styles.specs}>
                                <div style={styles.specItem}>
                                    <span style={styles.specLabel}>Capacity:</span>
                                    <span style={styles.specValue}>{layout.capacity}</span>
                                </div>
                                <div style={styles.specItem}>
                                    <span style={styles.specLabel}>Best For:</span>
                                    <span style={styles.specValue}>{layout.bestFor}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    section: {
        padding: '60px 20px',
        backgroundColor: '#f8f8f8',
    },
    mainTitle: {
        textAlign: 'center',
        fontSize: '36px',
        marginBottom: '50px',
        color: '#a2783a',
        fontFamily: 'Cinzel Decorative, serif',
        letterSpacing: '2px'
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
            transform: 'translateY(-5px)',
        }
    },
    imageContainer: {
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #eee',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    contentContainer: {
        padding: '20px',
    },
    cardTitle: {
        fontSize: '24px',
        color: '#a2783a',
        marginBottom: '15px',
        fontFamily: 'Cinzel Decorative, serif',
        textAlign: 'center',
    },
    description: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '20px',
        lineHeight: '1.5',
        textAlign: 'center',
    },
    specs: {
        borderTop: '1px solid #eee',
        paddingTop: '15px',
    },
    specItem: {
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    specLabel: {
        fontSize: '14px',
        color: '#333',
        fontWeight: 'bold',
    },
    specValue: {
        fontSize: '14px',
        color: '#666',
    }
};

export default VenueLayouts;