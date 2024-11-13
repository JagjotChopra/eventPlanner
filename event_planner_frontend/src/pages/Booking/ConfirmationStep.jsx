import React, { useEffect, useState } from 'react';
const ConfirmationStep = ({ formData,setFormData, onSubmit, onPrev, isLoading }) => {
    
    const [totalCost,setTotalCost]=useState(0);
    const selectedVenue=JSON.parse(localStorage.getItem("selectedVenue"));
    const calculateTotal = () => {
        let venueCost = selectedVenue.venue_price;
        let foodCost = 0; // Default food cost to 0
    
        // If includeFoodService is true, calculate the food cost
        if (formData.includeFoodService) {
            foodCost = formData.guestNumber * 20; // Assuming $20 per person for food
        }
    
        // Calculate the total cost including venue and (if applicable) food cost
        const total = venueCost + foodCost;
    
        // Update formData with calculated values
        setFormData({
            ...formData,
            venueCost: venueCost,
            foodCost: foodCost,
            totalCost: total.toFixed(2),
        });
    
        // Set total cost state
        setTotalCost(total.toFixed(2));
    };
    
    useEffect(()=>{
        calculateTotal();
    },[])
    return (
        <div style={styles.stepContainer}>
            <h3 style={styles.heading}>Booking Summary</h3>
            <div style={styles.summaryContainer}>
                {/* Booking Details Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>Date & Time</h4>
                    <div style={styles.summaryItem}>
                        <span style={styles.label}>Date:</span>
                        <span style={styles.value}>{new Date(formData.date).toLocaleDateString()}</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.label}>Time Slot:</span>
                        <span style={styles.value}>{formData.timeSlot}</span>
                    </div>
                </div>
                {/* Venue Details Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>Venue Details</h4>
                    <div style={styles.summaryItem}>
                        <span style={styles.label}>Venue:</span>
                        <span style={styles.value}>{selectedVenue.venue_name}</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.label}>Location:</span>
                        <span style={styles.value}>{selectedVenue.address?.street}, {selectedVenue.address?.city}, {selectedVenue.address?.province}, {selectedVenue.address?.postalcode}</span>
                    </div>
                </div>
                {/* Guest Details Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>Guest Details</h4>
                    <div style={styles.summaryItem}>
                        <span style={styles.label}>Number of Guests:</span>
                        <span style={styles.value}>{formData.guestNumber}</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.label}>Seating Arrangement:</span>
                        <span style={styles.value}>{formData.sittingArrangement}</span>
                    </div>
                </div>
                {/* Food Service Section */}
                {formData.includeFoodService && (
                    <div style={styles.section}>
                        <h4 style={styles.sectionTitle}>Food Service Details</h4>
                        <div style={styles.summaryItem}>
                            <span style={styles.label}>Menu Type:</span>
                            <span style={styles.value}>{formData.menuChoice}</span>
                        </div>
                        <div style={styles.summaryItem}>
                            <span style={styles.label}>Per Person Cost:</span>
                            <span style={styles.value}>$20</span>
                        </div>
                    </div>
                )}
                {/* Cost Breakdown */}
                <div style={styles.costSection}>
                    <div style={styles.summaryItem}>
                        <span style={styles.label}>Venue Cost: <span style={{color:'grey',fontSize:'10px'}}>(Incl. Decoration cost)</span></span>
                        <span style={styles.value}>${selectedVenue.venue_price}</span>
                    </div>
                    {formData.includeFoodService && (
                        <div style={styles.summaryItem}>
                            <span style={styles.label}>Food Service Cost:</span>
                            <span style={styles.value}>${formData.guestNumber * 20}</span>
                        </div>
                    )}
                    <div style={styles.totalCost}>
                        <span style={styles.totalLabel}>Total Cost:</span>
                        <span style={styles.totalValue}>${totalCost}</span>
                    </div>
                </div>
            </div>
            <div style={styles.buttonGroup}>
                <button style={styles.prevButton} onClick={onPrev}>
                    Previous
                </button>
                <button 
                    style={styles.submitButton} 
                    onClick={onSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span style={styles.loadingText}>Processing...</span>
                    ) : (
                        'Confirm Booking'
                    )}
                </button>
            </div>
        </div>
    );
};
const styles = {
    stepContainer: {
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    heading: {
        fontSize: '28px',
        color: '#333',
        textAlign: 'center',
        marginBottom: '30px',
        fontWeight: '600'
    },
    summaryContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '30px'
    },
    section: {
        marginBottom: '25px',
        paddingBottom: '20px',
        borderBottom: '1px solid #eee'
    },
    sectionTitle: {
        fontSize: '18px',
        color: '#a2783a',
        marginBottom: '15px',
        fontWeight: '600'
    },
    summaryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        fontSize: '16px'
    },
    label: {
        color: '#666',
        fontWeight: '500'
    },
    value: {
        color: '#333',
        fontWeight: '500'
    },
    costSection: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
    },
    totalCost: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '2px solid #eee',
        fontSize: '20px'
    },
    totalLabel: {
        color: '#333',
        fontWeight: '600'
    },
    totalValue: {
        color: '#a2783a',
        fontWeight: '700',
        fontSize: '24px'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        marginTop: '30px'
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
    submitButton: {
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
        position: 'relative',
        '&:hover': {
            backgroundColor: '#8f6930'
        },
        '&:disabled': {
            backgroundColor: '#cccccc',
            cursor: 'not-allowed'
        }
    },
    loadingText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        '&::after': {
            content: '""',
            width: '20px',
            height: '20px',
            border: '3px solid #fff',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
    }
};
export default ConfirmationStep;