import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [isUpdating, setIsUpdating] = useState({});
    const [editingDate, setEditingDate] = useState({});
    const [availableTimeSlots, setAvailableTimeSlots] = useState({});
    const [newTimeSlot, setNewTimeSlot] = useState({});
    const [checkingAvailability, setCheckingAvailability] = useState({});

    useEffect(() => {
        fetchBookings();
    }, []);

    const isPastDate = (dateString) => {
        const eventDate = new Date(dateString);
        eventDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate < today;
    };

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:9000/api/v1/admin/all-bookings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error fetching bookings');
            }

            // Sort bookings: upcoming first, then past events
            const sortedBookings = data.bookings.sort((a, b) => {
                const dateA = new Date(a.event_id?.date);
                const dateB = new Date(b.event_id?.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // If one is past and one is upcoming, upcoming comes first
                const aIsPast = dateA < today;
                const bIsPast = dateB < today;
                if (aIsPast !== bIsPast) {
                    return aIsPast ? 1 : -1;
                }

                // If both are past or both are upcoming, sort by date
                return dateA - dateB;
            });

            setBookings(sortedBookings);
            const initialStatuses = {};
            sortedBookings.forEach(booking => {
                initialStatuses[booking._id] = booking.status;
            });
            setSelectedStatus(initialStatuses);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
            toast.error('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };
    const checkAvailability = async (bookingId, newDate) => {
        setCheckingAvailability(prev => ({ ...prev, [bookingId]: true }));
        try {
            const token = localStorage.getItem('token');
            const booking = bookings.find(b => b._id === bookingId);
            const venueId = booking.event_id?.venue_id?._id;

            const response = await fetch('http://localhost:9000/api/v1/admin/check-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    venue_id: venueId,
                    date: newDate
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error checking availability');
            }

            setAvailableTimeSlots(prev => ({
                ...prev,
                [bookingId]: data.availableSlots
            }));

        } catch (error) {
            console.error("Availability check error:", error);
            toast.error('Failed to check availability');
        } finally {
            setCheckingAvailability(prev => ({ ...prev, [bookingId]: false }));
        }
    };

    const updateBookingDateTime = async (bookingId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:9000/api/v1/admin/update-datetime/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    date: editingDate[bookingId],
                    time_slot: newTimeSlot[bookingId]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error updating date and time');
            }

            toast.success('Booking date and time updated successfully');
            setEditingDate(prev => ({ ...prev, [bookingId]: null }));
            setNewTimeSlot(prev => ({ ...prev, [bookingId]: null }));
            setAvailableTimeSlots(prev => ({ ...prev, [bookingId]: null }));
            fetchBookings();

        } catch (error) {
            console.error("Update datetime error:", error);
            toast.error('Failed to update booking date and time');
        }
    };

    const updateBookingStatus = async (bookingId) => {
        setIsUpdating(prev => ({ ...prev, [bookingId]: true }));
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:9000/api/v1/admin/update-status/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    status: selectedStatus[bookingId]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error updating status');
            }

            toast.success('Booking status updated successfully');
            fetchBookings();
        } catch (error) {
            console.error("Update error:", error);
            toast.error('Failed to update booking status');
            setError(error.message);
        } finally {
            setIsUpdating(prev => ({ ...prev, [bookingId]: false }));
        }
    };

    const getStatusStyle = (status) => {
        const baseStyle = {
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500'
        };

        switch(status?.toLowerCase()) {
            case 'booked':
                return {
                    ...baseStyle,
                    backgroundColor: '#def7ec',
                    color: '#03543f'
                };
            case 'cancelled':
                return {
                    ...baseStyle,
                    backgroundColor: '#fde8e8',
                    color: '#9b1c1c'
                };
            default:
                return {
                    ...baseStyle,
                    backgroundColor: '#fef3c7',
                    color: '#92400e'
                };
        }
    };
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            // Create a Date object and increment the day by 1
            const date = new Date(dateString);
            date.setDate(date.getDate() + 1);
    
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    const renderDateTimeCell = (booking) => {
        const isEventPast = isPastDate(booking.event_id?.date);

        if (isEventPast) {
            return (
                <div style={styles.dateInfo}>
                    <div style={styles.date}>
                        {formatDate(booking.event_id?.date)}
                    </div>
                    <div style={styles.timeSlot}>
                        {Array.isArray(booking.event_id?.time_slot) ?
                            booking.event_id.time_slot.join(', ') : 'N/A'}
                    </div>
                    <div style={styles.arrangement}>
                        Seating: {booking.event_id?.sitting_arrangement || 'N/A'}
                    </div>
                    <div style={styles.pastEventNote}>
                        Past event - Cannot modify
                    </div>
                </div>
            );
        }

        if (editingDate[booking._id]) {
            return (
                <div style={styles.dateEditContainer}>
                    <input
                        type="date"
                        value={editingDate[booking._id]}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                            setEditingDate(prev => ({
                                ...prev,
                                [booking._id]: e.target.value
                            }));
                            checkAvailability(booking._id, e.target.value);
                        }}
                        style={styles.dateInput}
                    />
                    {checkingAvailability[booking._id] ? (
                        <div style={styles.checkingText}>Checking availability...</div>
                    ) : availableTimeSlots[booking._id]?.length > 0 ? (
                        <div style={styles.timeSlotSelect}>
                            <select
                                value={newTimeSlot[booking._id] || ''}
                                onChange={(e) => setNewTimeSlot(prev => ({
                                    ...prev,
                                    [booking._id]: e.target.value
                                }))}
                                style={styles.select}
                            >
                                <option value="">Select time slot</option>
                                {availableTimeSlots[booking._id].map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                            <div style={styles.dateActionButtons}>
                                <button
                                    onClick={() => updateBookingDateTime(booking._id)}
                                    disabled={!newTimeSlot[booking._id]}
                                    style={styles.saveButton}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingDate(prev => ({ ...prev, [booking._id]: null }));
                                        setNewTimeSlot(prev => ({ ...prev, [booking._id]: null }));
                                        setAvailableTimeSlots(prev => ({ ...prev, [booking._id]: null }));
                                    }}
                                    style={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : availableTimeSlots[booking._id]?.length === 0 ? (
                        <div style={styles.noSlotsText}>
                            No available slots for this date
                            <button
                                onClick={() => {
                                    setEditingDate(prev => ({ ...prev, [booking._id]: null }));
                                    setAvailableTimeSlots(prev => ({ ...prev, [booking._id]: null }));
                                }}
                                style={styles.cancelButton}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : null}
                </div>
            );
        }

        return (
            <>
                <div style={styles.date}>
                    {formatDate(booking.event_id?.date)}
                </div>
                <div style={styles.timeSlot}>
                    {Array.isArray(booking.event_id?.time_slot) ?
                        booking.event_id.time_slot.join(', ') : 'N/A'}
                </div>
                <div style={styles.arrangement}>
                    Seating: {booking.event_id?.sitting_arrangement || 'N/A'}
                </div>
                <button
                    onClick={() => setEditingDate(prev => ({
                        ...prev,
                        [booking._id]: booking.event_id?.date?.split('T')[0]
                    }))}
                    style={styles.editButton}
                >
                    Change Date/Time
                </button>
            </>
        );
    };

    if (loading) return <div style={styles.loadingText}>Loading bookings...</div>;
    if (error) return <div style={styles.errorText}>Error: {error}</div>;
    if (!bookings?.length) return <div style={styles.noData}>No bookings found</div>;
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Event Bookings Management</h2>
                <div style={styles.headerInfo}>
                    <span style={styles.headerNote}>
                        * Past events cannot be modified
                    </span>
                    <button
                        onClick={fetchBookings}
                        style={styles.refreshButton}
                    >
                        Refresh List
                    </button>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Booking ID</th>
                            <th style={styles.th}>Event Details</th>
                            <th style={styles.th}>Customer</th>
                            <th style={styles.th}>Date & Time</th>
                            <th style={styles.th}>Amount</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.bookingId}>{booking._id}</div>
                                    <div style={styles.bookingDate}>
                                        Booked: {new Date(booking.booking_date).toLocaleString()}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.eventDetails}>
                                        <div style={styles.eventType}>
                                            {booking.event_id?.category_id?.name || 'N/A'}
                                        </div>
                                        <div style={styles.venueName}>
                                            {booking.event_id?.venue_id?.venue_name || 'N/A'}
                                        </div>
                                        <div style={styles.guestCount}>
                                            Guests: {booking.event_id?.guest_number || 0}
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.customerInfo}>
                                        <div style={styles.customerName}>
                                            {booking.user_id?.name || 'N/A'}
                                        </div>
                                        <div style={styles.customerEmail}>
                                            {booking.user_id?.email || 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.dateInfo}>
                                        {renderDateTimeCell(booking)}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.costDetails}>
                                        <div style={styles.costItem}>
                                            <span>Venue:</span> ${booking.venue_cost || 0}
                                        </div>
                                        <div style={styles.costItem}>
                                            <span>Food:</span> ${booking.food_cost || 0}
                                        </div>
                                        <div style={styles.totalAmount}>
                                            Total: ${booking.total_cost || '0.00'}
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{
                                        ...styles.statusBadge,
                                        ...getStatusStyle(booking.status)
                                    }}>
                                        {booking.status?.toUpperCase() || 'N/A'}
                                    </div>
                                    {!isPastDate(booking.event_id?.date) && (
                                        <select
                                            value={selectedStatus[booking._id] || booking.status}
                                            onChange={(e) => setSelectedStatus({
                                                ...selectedStatus,
                                                [booking._id]: e.target.value
                                            })}
                                            style={styles.statusSelect}
                                        >
                                            <option value="booked">Booked</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    )}
                                </td>
                                <td style={styles.td}>
                                    {!isPastDate(booking.event_id?.date) ? (
                                        <button
                                            onClick={() => updateBookingStatus(booking._id)}
                                            disabled={isUpdating[booking._id] || selectedStatus[booking._id] === booking.status}
                                            style={{
                                                ...styles.updateButton,
                                                ...(isUpdating[booking._id] || selectedStatus[booking._id] === booking.status
                                                    ? styles.buttonDisabled
                                                    : {})
                                            }}
                                        >
                                            {isUpdating[booking._id] ? 'Updating...' : 'Update Status'}
                                        </button>
                                    ) : (
                                        <div style={styles.pastEventMessage}>Past event</div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
const styles = {
    container: {
        padding: '24px',
        maxWidth: '1400px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    },
    headerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    headerNote: {
        color: '#666',
        fontSize: '14px',
        fontStyle: 'italic'
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333'
    },
    refreshButton: {
        backgroundColor: '#a2783a',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s ease'
    },
    tableContainer: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: '1200px'
    },
    th: {
        padding: '12px 16px',
        textAlign: 'left',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #e9ecef',
        color: '#495057',
        fontWeight: '600',
        whiteSpace: 'nowrap'
    },
    tr: {
        borderBottom: '1px solid #e9ecef',
        '&:hover': {
            backgroundColor: '#f8f9fa'
        }
    },
    td: {
        padding: '16px',
        verticalAlign: 'top'
    },
    bookingId: {
        fontFamily: 'monospace',
        color: '#666',
        fontSize: '14px'
    },
    bookingDate: {
        color: '#666',
        fontSize: '12px',
        marginTop: '4px'
    },
    eventDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    eventType: {
        fontWeight: '500',
        color: '#333',
        fontSize: '14px'
    },
    venueName: {
        color: '#666',
        fontSize: '13px'
    },
    guestCount: {
        color: '#666',
        fontSize: '13px'
    },
    customerInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    customerName: {
        fontWeight: '500',
        color: '#333',
        fontSize: '14px'
    },
    customerEmail: {
        color: '#666',
        fontSize: '13px'
    },
    dateInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    dateEditContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    dateInput: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px',
        width: '100%'
    },
    timeSlotSelect: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    select: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px',
        width: '100%'
    },
    dateActionButtons: {
        display: 'flex',
        gap: '8px',
        marginTop: '8px'
    },
    saveButton: {
        backgroundColor: '#10B981',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        '&:disabled': {
            backgroundColor: '#ccc',
            cursor: 'not-allowed'
        }
    },
    cancelButton: {
        backgroundColor: '#EF4444',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    editButton: {
        backgroundColor: '#a2783a',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        marginTop: '8px',
        width: 'fit-content'
    },
    checkingText: {
        color: '#666',
        fontSize: '14px',
        fontStyle: 'italic'
    },
    noSlotsText: {
        color: '#EF4444',
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    pastEventNote: {
        color: '#dc2626',
        fontSize: '12px',
        fontStyle: 'italic',
        marginTop: '8px'
    },
    pastEventMessage: {
        color: '#666',
        fontSize: '14px',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    date: {
        fontWeight: '500',
        color: '#333',
        fontSize: '14px'
    },
    timeSlot: {
        color: '#666',
        fontSize: '13px'
    },
    arrangement: {
        color: '#666',
        fontSize: '13px',
        marginTop: '4px'
    },
    costDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    costItem: {
        fontSize: '13px',
        color: '#666',
        display: 'flex',
        justifyContent: 'space-between'
    },
    totalAmount: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#333',
        borderTop: '1px solid #eee',
        marginTop: '4px',
        paddingTop: '4px'
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px',
        textAlign: 'center'
    },
    statusSelect: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        cursor: 'pointer',
        fontSize: '14px'
    },
    updateButton: {
        backgroundColor: '#a2783a',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        width: '100%',
        transition: 'all 0.2s ease'
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
        cursor: 'not-allowed',
        opacity: 0.7
    },
    loadingText: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '18px',
        color: '#666'
    },
    errorText: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '18px',
        color: '#dc2626'
    },
    noData: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '18px',
        color: '#666'
    }
};

export default AdminBookings;