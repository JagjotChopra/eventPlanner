// components/BookingSteps/VenueStep.jsx
import React, { useEffect, useState } from 'react';
import DateTimeStep from './DateTimeStep';
const VenueStep = ({ formData, setFormData, onChange, availableVenues, onNext, onPrev }) => {
    const [venue, setVenue] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    useEffect(() => {
        const selectedVenue = JSON.parse(localStorage.getItem("selectedVenue"));
        if (selectedVenue) {
            setFormData({ ...formData, venueId: selectedVenue._id });
            setVenue(selectedVenue);
        }
    }, []);

    // Validation function to check if all required fields are filled
    const isNextDisabled = () => {
        console.log("Vapidation first chec",formData);
        const hasErrors = Object.values(validationErrors).some(error => error);
        return !formData.venueId || 
               !formData.categoryId || 
               !formData.date || 
               formData.timeSlot.length === 0 ||
               hasErrors;
    };
    return (
        <div style={styles.stepContainer}>
            <h3 style={styles.heading}>Select Venue</h3>
            
            <div style={styles.contentWrapper}>
                <div style={styles.venueCard}>
                    {venue ? (
                        <div style={styles.card}>
                            <div style={styles.imageContainer}>
                                <img
                                    src={venue.image_upload[0]}
                                    alt={venue.venue_name}
                                    style={styles.image}
                                />
                            </div>
                            <div style={styles.cardContent}>
                                <h3 style={styles.venueName}>{venue.venue_name}</h3>
                                <p style={styles.venueDescription}>
                                    {venue.description || venue.address.street}
                                </p>
                                <span style={styles.capacityBadge}>
                                    Capacity: {venue.min_capacity} - {venue.max_capacity} guests
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div style={styles.noVenue}>
                            Please select a venue first
                        </div>
                    )}
                </div>
                <div style={styles.dateTimeContainer}>
                    <DateTimeStep
                        setFormData={setFormData}
                        formData={formData}
                        venue_id={venue?._id}
                        setValidationErrors={setValidationErrors}
                        isNextDisabled={isNextDisabled}
                    />
                </div>
            </div>
            <div style={styles.buttonGroup}>
                <button style={styles.prevButton} onClick={onPrev}>
                    Change Venue
                </button>
                <button 
                    style={{
                        ...styles.nextButton,
                        backgroundColor: isNextDisabled() ? '#cccccc' : '#a2783a',
                        cursor: isNextDisabled() ? 'not-allowed' : 'pointer'
                    }}
                    onClick={onNext}
                    disabled={isNextDisabled()}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
const styles = {
    stepContainer: {
        padding: '30px',
    },
    heading: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '25px',
        textAlign: 'center',
        fontWeight: '600'
    },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px 10px',
        gap: '30px'
    },
    venueCard: {
        flex: '0 0 300px'
    },
    dateTimeContainer: {
        flex: '1'
    },
    card: {
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    imageContainer: {
        width: '100%',
        height: '200px',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease'
    },
    cardContent: {
        padding: '20px'
    },
    venueName: {
        fontSize: '1.5rem',
        color: '#333',
        marginTop: '0px',
        marginBottom: '10px',
        fontWeight: '500'
    },
    venueDescription: {
        color: '#666',
        marginBottom: '15px',
        lineHeight: '1.5'
    },
    capacityBadge: {
        display: 'inline-block',
        background: '#f0f2f5',
        padding: '8px 15px',
        borderRadius: '20px',
        fontSize: '0.9rem',
        color: '#555'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
        gap: '20px'
    },
    prevButton: {
        flex: '1',
        padding: '15px',
        backgroundColor: '#fff',
        color: '#a2783a',
        border: '2px solid #a2783a',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#f9f9f9'
        }
    },
    nextButton: {
        flex: '1',
        padding: '15px',
        backgroundColor: '#a2783a',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#8f6930'
        },
        '&:disabled': {
            backgroundColor: '#cccccc',
            cursor: 'not-allowed'
        }
    },
    errorText: {
        color: '#dc3545',
        fontSize: '14px',
        marginTop: '5px'
    },
    noVenue: {
        textAlign: 'center',
        padding: '40px',
        color: '#666',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px'
    }
};
export default VenueStep;