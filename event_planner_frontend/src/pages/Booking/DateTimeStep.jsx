import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DateTimeStep = ({ formData, venue_id, setFormData, isNextDisabled }) => {
    const [selectedDate, setSelectedDate] = useState(formData.date || '');
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState(formData.timeSlot || []);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(formData.categoryId || '');
    const [formError, setFormError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log("availableTimeSlots updated:", availableTimeSlots);
    }, [availableTimeSlots]);
    // Fetch event categories and restore selections from localStorage
    useEffect(() => {
        const fetchDataAndRestore = async () => {
            try {
                // Fetch event categories
                const response = await fetch('http://localhost:9000/api/v1/eventcategories');
                const data = await response.json();
                setOptions(data);
                // Restore data from localStorage
                const savedFormData = JSON.parse(localStorage.getItem('formData') || '{}');

                // Restore category selection
                if (savedFormData.categoryId) {
                    setSelectedOption(savedFormData.categoryId);
                    setFormData(prevData => ({
                        ...prevData,
                        categoryId: savedFormData.categoryId
                    }));
                }
                // Restore date and fetch time slots if date exists
                if (savedFormData.date) {
                    setSelectedDate(savedFormData.date);
                    await fetchTimeSlots(savedFormData.date);
                }
                // Restore time slots
                if (savedFormData && Array.isArray(savedFormData.timeSlot) && savedFormData.timeSlot.length > 0) {
                    console.log("-----", savedFormData.date)
                    setSelectedSlots(savedFormData.timeSlot);
                    setFormData(prevData => ({
                        ...prevData,
                        timeSlot: savedFormData.timeSlot
                    }));

                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };
        fetchDataAndRestore();
    }, []);




    const fetchTimeSlots = async (date) => {
        try {
            let data = {
                venue_id: formData.venueId,
                date: date
            }
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:9000/api/v1/booking/check-availability", data, {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${token}`
                },

            });
            console.log(response);
            if (response.status == "200") {
                const data = response.data;
                console.log("I'm Here", data.availableSlots, "venue id ", venue_id)
                if (data.availableSlots.length > 0) {
                    setAvailableTimeSlots(data.availableSlots);
                    setFormData({ ...formData, timeSlot: [] });
                    setSelectedSlots([])
                }
                else {
                    setAvailableTimeSlots([]);
                    alert("The venue is fully booked on this date");
                    setFormData({ ...formData, timeSlot: [] });

                    setSelectedSlots([])

                }
            }
        } catch (error) {
            if (error.response) {
                const { status } = error.response;
                let message;

                // Set messages based on response status
                switch (status) {
                    case 401:
                        message = "Invalid token or no token provided.";
                        alert("Need To Login Again"); // Show the message to the user
                        localStorage.removeItem('token');
                        navigate('/login');
                        break;
                    case 403:
                        message = "Access denied. You do not have permission to perform this action.";
                        alert("Need To Login Again"); // Show the message to the user
                        localStorage.removeItem('token');
                        navigate('/login');
                        break;
                }



            } else {
                console.log("err",error)
                alert("Server is Down. Please Try Later");
            }
            console.error("Error fetching time slots:", error);
        }
    };
    const handleSelectChange = (event) => {
        const categoryId = event.target.value;
        setSelectedOption(categoryId);
        setFormData(prevData => {
            const newData = { ...prevData, categoryId };
            localStorage.setItem('formData', JSON.stringify(newData));
            return newData;
        });
    };
    const handleDateChange = async (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        await fetchTimeSlots(date);

        setFormData(prevData => {
            const newData = { ...prevData, date };
            localStorage.setItem('formData', JSON.stringify(newData));
            return newData;
        });
    };
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedSlots(prevSelectedSlots => {
            let newSlots;
            if (checked) {
                newSlots = [...prevSelectedSlots, value];
            } else {
                newSlots = prevSelectedSlots.filter(slot => slot !== value);
            }
            setFormData(prevData => {
                const newData = { ...prevData, timeSlot: newSlots };
                localStorage.setItem('formData', JSON.stringify(newData));
                return newData;
            });
            return newSlots;
        });
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let isValid = true;
    //     // Validate category selection
    //     if (!selectedOption) {
    //         setFormError(prevError => ({
    //             ...prevError,
    //             categoryId: 'Please select an event category'
    //         }));
    //         isValid = false;
    //     } else {
    //         setFormError(prevError => ({
    //             ...prevError,
    //             categoryId: ''
    //         }));
    //     }
    //     // Validate date selection
    //     if (!selectedDate) {
    //         setFormError(prevError => ({
    //             ...prevError,
    //             date: 'Please select a date for your event'
    //         }));
    //         isValid = false;
    //     } else {
    //         setFormError(prevError => ({
    //             ...prevError,
    //             date: ''
    //         }));
    //     }
    //     // Validate time slot selection
    //     if (selectedSlots.length === 0) {
    //         setFormError(prevError => ({
    //             ...prevError,
    //             timeSlot: 'Please select at least one time slot'
    //         }));
    //         isValid = false;
    //     } else {
    //         setFormError(prevError => ({
    //             ...prevError,
    //             timeSlot: ''
    //         }));
    //     }
    //     if (isValid) {
    //         // Form is valid, you can proceed with the submission
    //         console.log('Form is valid:', formData);
    //     }
    // };
    return (
        <>
            <form >
                <div style={styles.stepContainer}>
                    <h3 style={styles.heading}>Select Event Category</h3>
                    <select
                        id="dropdown"
                        style={styles.select}
                        value={selectedOption}
                        onChange={handleSelectChange}
                        required
                    >
                        <option value="" disabled>Select an option</option>
                        {options.map((option) => (
                            <option key={option._id} value={option._id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    {formError.categoryId && (
                        <p style={styles.errorText}>{formError.categoryId}</p>
                    )}
                </div>
                <div style={styles.stepContainer}>
                    <h3 style={styles.heading}>Select Date & Time</h3>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Event Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={new Date().toISOString().split('T')[0]}
                            style={styles.input}
                            required
                        />
                        {formError.date && (
                            <p style={styles.errorText}>{formError.date}</p>
                        )}
                        <p style={styles.helperText}>Please select a date for your event</p>
                    </div>

                    {availableTimeSlots.length > 0 && (
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Time Slot</label>
                            <div style={styles.timeSlotContainer}>
                                {availableTimeSlots.map((slot) => (
                                    <div key={slot} style={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            id={`timeslot-${slot}`}
                                            value={slot}
                                            onChange={handleCheckboxChange}
                                            checked={selectedSlots.includes(slot)}
                                            style={styles.checkbox}
                                            required
                                        />
                                        <label htmlFor={`timeslot-${slot}`} style={styles.checkboxLabel} required>
                                            {slot}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {formError.timeSlot && (
                                <p style={styles.errorText}>{formError.timeSlot}</p>
                            )}
                            <p style={styles.helperText}>Select your preferred time slots</p>
                        </div>
                    )}
                </div>

            </form>
        </>
    );
};
const styles = {
    errorText: {
        color: '#dc3545',
        fontSize: '14px',
        marginTop: '5px'
    },
    stepContainer: {
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginLeft: '20px',
        marginBottom: '10px'
    },
    inputGroup: {
        marginBottom: '25px'
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
    input: {
        width: '90%',
        padding: '12px 15px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        '&:focus': {
            borderColor: '#a2783a'
        },
        '&:hover': {
            borderColor: '#a2783a'
        }
    },
    timeSlotContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginTop: '10px'
    },
    timeSlotButton: {
        padding: '15px 20px',
        fontSize: '15px',
        border: '2px solid #a2783a',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: '500',
        color: '#333',
        background: '#fff',
        outline: 'none',
        width: '100%',
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
    nextButton: {
        display: 'block',
        width: '100%',
        padding: '15px',
        backgroundColor: '#a2783a',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '30px',
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
    selectedTimeSlot: {
        backgroundColor: '#a2783a',
        color: '#fff'
    },
    helperText: {
        fontSize: '14px',
        color: '#666',
        marginTop: '5px'
    },
    errorText: {
        color: '#dc3545',
        fontSize: '14px',
        marginTop: '5px'
    }
};
export default DateTimeStep;