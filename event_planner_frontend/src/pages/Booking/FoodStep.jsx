import React, { useEffect, useState} from 'react';
import corporateMenu from '../../assets/Corporate Event Food Menu.pdf';
import socialMenu from '../../assets/Party Event Food Menu.pdf';
const FoodStep = ({ formData, onChange, onNext, onPrev }) => {
    const downloadPDF = (pdfFile, fileName) => {
        const link = document.createElement('a');
        link.href = pdfFile;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const [showFoodOptions, setShowFoodOptions] = useState(false);
    const [foodDropDownValue, setFoodDropDownValue] = useState();
    useEffect(() => {
        if(formData.includeFoodService) {
            setShowFoodOptions(true);
        }
    }, []);
    const handleFoodOptionChange = (value) => {
        console.log(value);
        onChange('includeFoodService', value);
        setShowFoodOptions(value);
        // Reset menu choice when switching to "No"
        if (!value) {
            onChange('menuChoice', '');
        }
    };
    // Validation function to determine if Next button should be disabled
    const isNextDisabled = () => {
        if (formData.includeFoodService === undefined) {
            return true; // Disable if no option is selected
        }
        if (formData.includeFoodService === true && !formData.menuChoice) {
            return true; // Disable if Yes is selected but no menu is chosen
        }
        return false; // Enable in all other cases
    };
    return (
        <div style={styles.stepContainer}>
            <h3 style={styles.heading}>Food & Beverages</h3>
        
            <div style={styles.optionGroup}>
                <label style={styles.label}>Would you like to include food service?</label>
                <div style={styles.radioGroup}>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="foodService"
                            checked={formData.includeFoodService === true}
                            onChange={() => handleFoodOptionChange(true)}
                            style={styles.radioInput}
                            required
                        />
                        Yes
                    </label>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="foodService"
                            checked={formData.includeFoodService === false}
                            onChange={() => handleFoodOptionChange(false)}
                            style={styles.radioInput}
                            required
                        />
                        No
                    </label>
                </div>
            </div>
        
            {showFoodOptions && (
                <div style={styles.menuOptions}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Select Menu Type</label>
                        <select
                            value={formData.menuChoice || ""}
                            onChange={(e) => onChange('menuChoice', e.target.value)}
                            style={styles.select}
                            required
                        >
                            <option value="">Select a menu</option>
                            <option value="Corporate">Corporate Menu</option>
                            <option value="Social">Social Menu</option>
                        </select>
                        <p style={styles.helperText}>Choose from our curated menu selections</p>
                    </div>
        
                    {formData.menuChoice === "Social" && (
                        <button
                            style={{
                                backgroundColor: '#a2783a',
                                color: '#fff',
                                padding: '15px 25px',
                                fontSize: '16px',
                                fontWeight: '600',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                            }}
                            onClick={() => downloadPDF(socialMenu, 'Party Event Food Menu.pdf')}
                        >
                            Download our Social Menu
                        </button>
                    )}
        
                    {formData.menuChoice === "Corporate" && (
                        <button
                            style={{
                                backgroundColor: '#a2783a',
                                color: '#fff',
                                padding: '15px 25px',
                                fontSize: '16px',
                                fontWeight: '600',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                            }}
                            onClick={() => downloadPDF(corporateMenu, 'Corporate Event Food Menu.pdf')}
                        >
                            Download our Corporate Menu
                        </button>
                    )}
                </div>
            )}
        
            <div style={styles.buttonGroup}>
                <button style={styles.prevButton} onClick={onPrev}>Previous</button>
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
    // ... (styles remain the same as in your original code)
    stepContainer: {
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    optionGroup: {
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #eee'
    },
    radioGroup: {
        display: 'flex',
        gap: '30px',
        marginTop: '15px'
    },
    radioLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '16px',
        color: '#333',
        cursor: 'pointer',
        padding: '10px 15px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: '1px solid #ddd',
        transition: 'all 0.3s ease',
        '&:hover': {
            borderColor: '#a2783a'
        }
    },
    menuOptions: {
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #eee',
        animation: 'fadeIn 0.3s ease'
    },
    inputGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
        marginBottom: '10px'
    },
    select: {
        width: '100%',
        padding: '12px 15px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
        color: '#333',
        cursor: 'pointer',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        '&:focus': {
            borderColor: '#a2783a'
        },
        '&:hover': {
            borderColor: '#a2783a'
        }
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
    heading: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '25px',
        textAlign: 'center',
        fontWeight: '600'
    },
    radioInput: {
        width: '18px',
        height: '18px',
        accentColor: '#a2783a',
        cursor: 'pointer'
    },
    helperText: {
        fontSize: '14px',
        color: '#666',
        marginTop: '5px',
        marginLeft: '15px'
    }
};
export default FoodStep;