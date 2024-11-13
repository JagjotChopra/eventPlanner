// components/BookingForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateTimeStep from './DateTimeStep';
import VenueStep from './VenueStep';
import GuestsStep from './GuestsStep';
import FoodStep from './FoodStep';
import ConfirmationStep from './ConfirmationStep';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../userAuth';
const BookingForm = () => {
    // Form Data State
    

    const navigate = useNavigate();
   const [formData, setFormData] = useState({
        categoryId:'',
        date: '',
        timeSlot: [],
        venueId: '',
        guestNumber: '',
        sittingArrangement: '',
        includeFoodService: false,
        menuChoice: '',
        venueCost:0,
        foodCost:0,
        totalCost: 0
    });
    console.log("formee",formData);
    // useEffect(()=>{
    //     localStorage.setItem('formData',JSON.stringify(formData));
    // },[formData.date])
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            console.log('hhelo');
            navigate('/');
        }
        if(localStorage.getItem('step')){
            setCurrentStep(Number(localStorage.getItem('step')))
        }
        
        if(!localStorage.getItem('selectedVenue')){
            navigate('/eventvenue');
        }
        if(localStorage.getItem('formData')){
            setFormData(JSON.parse(localStorage.getItem('formData')));
        }

    }, []);

    

    // Steps Control
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    console.log("Current Step",currentStep);
    // Venue Data
    const [availableVenues, setAvailableVenues] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    
    // Check venue availability
    const checkVenueAvailability = async (date) => {
        try {
            const response = await axios.post('/api/check-availability', {
                date: date
            });
            setAvailableVenues(response.data.venues);
        } catch (error) {
            setError('Failed to check venue availability');
        }
    };
    // Check timeslot availability
    const checkTimeSlotAvailability = async (date, venueId) => {
        try {
            const response = await axios.post('/api/check-timeslots', {
                date: date,
                venueId: venueId
            });
         //   setAvailableTimeSlots(response.data.timeSlots);
        } catch (error) {
            setError('Failed to check timeslot availability');
        }
    };
    // Handle form data changes
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Trigger availability checks
        if (field === 'date') {
            checkVenueAvailability(value);
        }
        if (field === 'venueId') {
            checkTimeSlotAvailability(formData.date, value);
            const venue = availableVenues.find(v => v._id === value);
          //  setSelectedVenue(venue);
        }
    };
    // Handle form submission
    const handleSubmit = async () => {
        try {
            // setIsLoading(true);
            console.log("Submitting form data:", formData);
            
            // Validate formData before proceeding
            if (!formData) {
                throw new Error("Form data is missing");
            }
            
            // Store in localStorage
            localStorage.setItem("formData", JSON.stringify(formData));
            
            // Navigate to payment page
            navigate('/payment');
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error (e.g., show error message to user)
        }
    }
    // Navigate between steps
    const nextStep = () => {
        console.log("Im clicked",currentStep)
        setCurrentStep(prev => prev + 1);
        localStorage.setItem('step',currentStep+1)
    };
    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
        localStorage.setItem('step',currentStep-1)
    };
    // Navigate between steps
    const ChangeVenue = () => {       
        navigate('/eventvenue');
    };
    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h3 style={styles.title}>Event Booking</h3>
                
                {/* Progress Bar */}
                <div style={styles.progressBar}>
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            style={{
                                ...styles.progressStep,
                                backgroundColor: step <= currentStep ? '#a2783a' : '#ddd'
                            }}
                        >
                            {step}
                        </div>
                    ))}
                </div>
              
                {currentStep === 1 && (
                    <VenueStep
                        formData={formData}
                        setFormData={setFormData}
                        onChange={handleChange}
                        availableVenues={availableVenues}
                        onNext={nextStep}
                        onPrev={ChangeVenue}
                    />
                )}
                {currentStep === 2 && (
                    <GuestsStep
                        formData={formData}
                        onChange={handleChange}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}
                {currentStep === 3 && (
                    <FoodStep
                        formData={formData}
                        onChange={handleChange}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}
                {currentStep === 4 && (
                    <ConfirmationStep
                        formData={formData}
                        onSubmit={handleSubmit}
                        setFormData={setFormData}
                        onPrev={prevStep}
                        isLoading={isLoading}
                    />
                )}
                {error && <div style={styles.error}>{error}</div>}
            </div>
        </div>
    );
};
const styles = {
    container: {
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px',
    },
    progressBar: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
        position: 'relative',
        padding: '0 20px',
    },
    progressStep: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        zIndex: 2,
    },
    error: {
        color: '#ff0000',
        textAlign: 'center',
        marginTop: '10px',
    }
};
export default BookingForm;