import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const BookingsList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchBookings();
    }, []);
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
    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:9000/api/v1/booking/user-bookings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error fetching bookings');
            }
            console.log('Fetched bookings:', data.bookings);
            setBookings(data.bookings);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const getStatusStyle = (status) => {
        const baseStyle = {
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500'
        };
        switch(status) {
            case 'booked':
                return {
                    ...baseStyle,
                    backgroundColor: '#def7ec',
                    color: '#03543f'
                };
            case 'pending':
                return {
                    ...baseStyle,
                    backgroundColor: '#fef3c7',
                    color: '#92400e'
                };
            default:
                return {
                    ...baseStyle,
                    backgroundColor: '#fde8e8',
                    color: '#9b1c1c'
                };
        }
    };
    if (loading) return <div style={styles.loadingText}>Loading...</div>;
    if (error) return <div style={styles.errorText}>Error: {error}</div>;
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>My Bookings</h2>
            
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {['Booking ID', 'Event', 'Venue', 'Date', 'Status', 'Total Cost', 'Actions'].map((header) => (
                                <th key={header} style={styles.tableHeader}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} style={styles.tableRow}>
                                <td style={styles.tableCell}>{booking._id}</td>
                                <td style={styles.tableCell}>
                                    {booking.event?.category?.name || 'N/A'}
                                </td>
                                <td style={styles.tableCell}>
                                    {booking.event?.venue?.venue_name || 'N/A'}
                                </td>
                                <td style={styles.tableCell}>
                                    {booking.event?.date ? 
                                        formatDate(booking.event.date) 
                                        : 'N/A'}
                                </td>
                                <td style={styles.tableCell}>
                                    <span style={getStatusStyle(booking.status)}>
                                        {booking.status || 'N/A'}
                                    </span>
                                </td>
                                <td style={styles.tableCell}>
                                    ${booking.total_cost || '0.00'}
                                </td>
                                <td style={styles.tableCell}>
                                    <Link 
                                        to={`/booking-details/${booking._id}`}
                                        style={styles.viewLink}
                                    >
                                        View Details
                                    </Link>
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
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333'
    },
    loadingText: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '18px',
        color: '#666'
    },
    errorText: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '18px',
        color: '#dc2626'
    },
    tableContainer: {
        overflowX: 'auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: '800px'
    },
    tableHeader: {
        padding: '12px 16px',
        textAlign: 'left',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #e9ecef',
        color: '#495057',
        fontWeight: '600'
    },
    tableRow: {
        borderBottom: '1px solid #e9ecef',
        '&:hover': {
            backgroundColor: '#f8f9fa'
        }
    },
    tableCell: {
        padding: '12px 16px',
        color: '#495057'
    },
    viewLink: {
        color: '#3b82f6',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    // sectionTitle: {
    //     fontSize: '18px',
    //     fontWeight: '600',
    //     marginBottom: '16px',
    //     color: '#333'
    // },
    // infoGroup: {
    //     display: 'grid',
    //     gap: '8px'
    // },
    // label: {
    //     fontSize: '14px',
    //     color: '#666',
    //     marginBottom: '4px'
    // },
    // value: {
    //     fontSize: '16px',
    //     color: '#333',
    //     marginBottom: '12px'
    // },
    // totalLabel: {
    //     fontSize: '16px',
    //     fontWeight: '600',
    //     color: '#333',
    //     marginTop: '12px'
    // },
    // totalValue: {
    //     fontSize: '20px',
    //     fontWeight: 'bold',
    //     color: '#333'
    // },
    // costSection: {
    //     borderTop: '1px solid #e9ecef',
    //     paddingTop: '20px',
    //     marginTop: '20px'
    // },
    // statusSection: {
    //     borderTop: '1px solid #e9ecef',
    //     paddingTop: '20px',
    //     marginTop: '20px'
    // },
    // statusBadge: {
    //     display: 'inline-block',
    //     padding: '6px 12px',
    //     borderRadius: '9999px',
    //     fontSize: '14px',
    //     fontWeight: '500'
    // }
};
export default  BookingsList;