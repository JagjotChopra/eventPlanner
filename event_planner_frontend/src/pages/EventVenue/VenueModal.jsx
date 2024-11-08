// components/VenueModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../userAuth';

const VenueModal = ({ venue, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === venue.image_upload.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? venue.image_upload.length - 1 : prev - 1
        );
    };
    const navigate = useNavigate();
    // Function to handle booking
    const handleBooking = () => {
        // checking user is login or not.
        if(UserAuth()=="admin"){
            alert("You Login with Admin Account. So you can't book a venue")
        }
        else if(UserAuth()=="client"){
            localStorage.setItem('selectedVenue', JSON.stringify(venue));
            navigate('/booking');
        }
        else{
            alert("Need To Login in your Account");
            localStorage.setItem('selectedVenue', JSON.stringify(venue));
            localStorage.setItem('lastNavigationPath','/eventvenue');
            navigate('/login');
        }

       
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <button style={styles.closeButton} onClick={onClose}>×</button>

                {/* Image Slideshow */}
                <div style={styles.slideshow}>
                    <button style={{ ...styles.slideshowButton, left: '10px' }} onClick={prevImage}>❮</button>
                    <img 
                        src={venue.image_upload[currentImageIndex]}
                        alt={`${venue.venue_name} - ${currentImageIndex + 1}`}
                        style={styles.slideshowImage}
                    />
                    <button style={{ ...styles.slideshowButton, right: '10px' }} onClick={nextImage}>❯</button>
                </div>

                {/* Venue Details */}
                <div style={styles.details}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <h3 style={styles.title}>{venue.venue_name}</h3>
                    <button style={styles.bookNowButton} onClick={handleBooking}>
                        Book Now
                    </button>
                    </div>
                  
                    <h4 style={styles.sectionTitle}><strong>Location</strong></h4>
                    <p>{venue.address.street}</p>
                    <p>{venue.address.city}, {venue.address.province}</p>
                    <p>{venue.address.country}, {venue.address.postalcode}</p>

                    <h4 style={styles.sectionTitle}>Venue Details</h4>
                    <p>Size: {venue.size}</p>
                    <p>Capacity: {venue.min_capacity} - {venue.max_capacity} guests</p>
                    <p>Price: ${venue.venue_price}</p>
                    <p>Status: {venue.availability_status}</p>

                    <h4 style={styles.sectionTitle}>Seating Arrangements Available</h4>
                    <ul style={styles.arrangementsList}>
                        {venue.sitting_arrangement.map((arrangement, index) => (
                            <li key={index}>{arrangement}</li>
                        ))}
                    </ul>

                    {/* Book Now Button */}
                    
                </div>
            </div>
        </div>
    );
};


const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
    },
    closeButton: {
        position: 'absolute',
        right: '20px',
        top: '20px',
        background: 'white',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 2
    },
    slideshow: {
        position: 'relative',
        width: '100%',
        height: '400px',
        backgroundColor: '#f8f9fa'
    },
    slideshowButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(255, 255, 255, 0.8)',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        zIndex: 1
    },
    slideshowImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    details: {
        padding: '24px 32px'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '16px'
    },
    title: {
        fontSize: '28px',
        fontWeight: '600',
        color: '#1a1a1a',
        margin: 0
    },
    bookNowButton: {
        backgroundColor: '#a2783a',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        ':hover': {
            backgroundColor: '#45a049'
        }
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    section: {
        marginBottom: '20px'
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: '12px'
    },
    text: {
        fontSize: '16px',
        color: '#4a5568',
        marginBottom: '8px',
        lineHeight: '1.5'
    },
    arrangementsList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    listItem: {
        fontSize: '16px',
        color: '#4a5568',
        padding: '8px 0',
        borderBottom: '1px solid #f0f0f0'
    }
};

export default VenueModal;
