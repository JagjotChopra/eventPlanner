// components/VenuePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VenueCard from './VenueCard.jsx';
import VenueModal from './VenueModal.jsx';
import VenueLayouts from './VenueLayouts.jsx';
import eventHomeImage from '../../assets/venue1 (1).jpg';

const VenuePage = () => {
    const [venues, setVenues] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchVenues();
        fetchCities();
    }, []);

    const fetchVenues = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/v1/eventvenue/eventvenues');
            setVenues(response.data);
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
    };

    const fetchCities = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/v1/eventvenue/eventvenues/cities');
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const filteredVenues = selectedCity
        ? venues.filter(venue => venue.address.city === selectedCity)
        : venues;

    return (
        <div style={styles.mainContainer}>
            {/* Hero Section */}
            <div style={styles.heroSection}>
                <img src={eventHomeImage} alt="event background" style={styles.backgroundImage} />
                <div style={styles.overlayContainer}>
                    <h3 style={styles.subheading}>Event Venues</h3>
                    <h1 style={styles.mainHeading}>Find Your Perfect Venue</h1>
                    <p style={styles.paragraph}>
                        Discover exceptional spaces for your special occasions
                    </p>
                    
                    {/* Filter Section integrated into hero */}
                    <select 
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        style={styles.filterSelect}
                    >
                        <option value="">All Cities</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Venues Grid Section */}
            <div style={styles.venuesContainer}>
                <h2 style={styles.sectionTitle}>Available Venues</h2>
                <div style={styles.venuesGrid}>
                    {filteredVenues.map(venue => (
                        <VenueCard 
                            key={venue._id}
                            venue={venue}
                            onClick={() => {
                                setSelectedVenue(venue);
                                setShowModal(true);
                            }}
                        />
                    ))}
                </div>
            </div>
            
              {/* Add the Layouts Section */}
              <VenueLayouts />

            {/* Modal */}
            {showModal && selectedVenue && (
                <VenueModal
                    venue={selectedVenue}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedVenue(null);
                    }}
                />
            )}
        </div>
    );
};

const styles = {
    mainContainer: {
        margin: '0',
        padding: '0',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heroSection: {
        position: 'relative',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '-1',
        filter: 'brightness(50%)',
    },
    overlayContainer: {
        textAlign: 'center',
        zIndex: '2',
        maxWidth: '800px',
        padding: '40px',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
    },
    subheading: {
        fontSize: '36px',
        letterSpacing: '2px',
        fontWeight: '500',
        marginBottom: '2px',
        color: '#a2783a',
    },
    mainHeading: {
        fontSize: '48px',
        fontWeight: '700',
        marginBottom: '20px',
        letterSpacing: '3px',
        color: '#fff',
    },
    paragraph: {
        fontSize: '20px',
        lineHeight: '1.5',
        color: '#f0f0f0',
        marginBottom: '30px',
    },
    filterSelect: {
        padding: '15px 30px',
        fontSize: '18px',
        backgroundColor: '#fff',
        color: '#a2783a',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '250px',
        outline: 'none',
    },
    venuesContainer: {
        padding: '60px 20px',
        backgroundColor: '#f5f5f5',
    },
    sectionTitle: {
        textAlign: 'center',
        color: '#a2783a',
        fontSize: '36px',
        marginBottom: '40px',
        fontWeight: '600',
    },
    venuesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    }
};

export default VenuePage;