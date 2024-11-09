import React from 'react';
const GuestsStep = ({ formData, onChange, onNext, onPrev }) => {
    const selectedVenue = JSON.parse(localStorage.getItem("selectedVenue"));
    
    // Validation function to determine if guest number is valid
    const isGuestNumberValid = () => {
        const guestNumber = parseInt(formData.guestNumber);
        return guestNumber >= selectedVenue?.min_capacity 
            && guestNumber <= selectedVenue?.max_capacity;
    };
    // Validation function to determine if Next button should be disabled
    const isNextDisabled = () => {
        return !formData.guestNumber || // Check if guest number exists
               !isGuestNumberValid() || // Check if guest number is within range
               !formData.sittingArrangement; // Check if seating arrangement is selected
    };
    return (
        <div style={styles.stepContainer}>
            <h3 style={styles.heading}>Guest Details & Seating</h3>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Number of Guests*</label>
                <input
                    type="number"
                    value={formData.guestNumber || ''}
                    onChange={(e) => onChange('guestNumber', e.target.value)}
                    min={selectedVenue?.min_capacity}
                    max={selectedVenue?.max_capacity}
                    style={{
                        ...styles.input,
                        borderColor: formData.guestNumber && !isGuestNumberValid() ? '#dc3545' : '#ddd'
                    }}
                    required
                />
                <small style={styles.helper}>
                    Required Capacity Range: {selectedVenue?.min_capacity} - {selectedVenue?.max_capacity} guests
                </small>
                {formData.guestNumber && !isGuestNumberValid() && (
                    <div style={styles.errorMessage}>
                        Please enter a number between {selectedVenue?.min_capacity} and {selectedVenue?.max_capacity}
                    </div>
                )}
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Seating Arrangement*</label>
                <div style={styles.arrangementOptions}>
                    {selectedVenue?.sitting_arrangement.map((arrangement, index) => (
                        <button
                            key={index}
                            style={{
                                ...styles.arrangementButton,
                                ...(formData.sittingArrangement === arrangement && styles.selectedArrangement)
                            }}
                            onClick={() => onChange('sittingArrangement', arrangement)}
                            type="button"
                        >
                            {arrangement}
                        </button>
                    ))}
                </div>
                {!formData.sittingArrangement && formData.guestNumber && (
                    <small style={styles.errorMessage}>
                        Please select a seating arrangement
                    </small>
                )}
            </div>
            <div style={styles.buttonGroup}>
                <button style={styles.prevButton} onClick={onPrev}>
                    Previous
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
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    heading: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '25px',
        textAlign: 'center',
        fontWeight: '600'
    },
    inputGroup: {
        marginBottom: '30px',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #eee'
    },
    label: {
        display: 'block',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
        marginBottom: '10px'
    },
    input: {
        width: '92%',
        padding: '12px 15px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        backgroundColor: '#fff',
        '&:focus': {
            borderColor: '#a2783a'
        },
        '&:hover': {
            borderColor: '#a2783a'
        },
        '&::-webkit-inner-spin-button': {
            opacity: 1,
            padding: '10px'
        }
    },
    helper: {
        display: 'block',
        fontSize: '14px',
        color: '#666',
        marginTop: '8px',
        fontStyle: 'italic'
    },
    arrangementOptions: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginTop: '15px'
    },
    arrangementButton: {
        padding: '15px 20px',
        fontSize: '15px',
        border: '2px solid #a2783a',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: '#fff',
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: '#a2783a',
            color: '#fff'
        },
        '&:disabled': {
            backgroundColor: '#f5f5f5',
            borderColor: '#ddd',
            color: '#999',
            cursor: 'not-allowed'
        }
    },
    selectedArrangement: {
        backgroundColor: '#a2783a',
        color: '#fff'
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
    errorMessage: {
        color: '#dc3545',
        fontSize: '14px',
        marginTop: '5px',
        marginLeft: '5px'
    }
};
export default GuestsStep;