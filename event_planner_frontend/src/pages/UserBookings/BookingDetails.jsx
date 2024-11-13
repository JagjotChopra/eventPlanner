import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
const BookingDetails = () => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetchBookingDetails();
    }, [id]);
    const downloadReceipt = () => {
        if (!booking) return;
        const doc = new jsPDF();
        // Header
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 30, 100);
        doc.text("Refined Stack Co: Event Booking Receipt", 14, 20);
        // Payment Details Section
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text(`Booking ID: ${booking._id}`, 14, 35);
        doc.text(`Amount Paid: $${booking.total_cost}`, 14, 42);
        doc.text(`Booking Date: ${new Date(booking.booking_date).toLocaleString()}`, 14, 49);
        // Customer and Booking Details
        doc.setFontSize(16);
        doc.setTextColor(50, 50, 180);
        doc.text("Booking Details", 14, 70);
        const bookingDetails = [
            ["Event Category", booking.event?.category?.name || 'N/A'],
            ["Venue", booking.event?.venue?.venue_name || 'N/A'],
            ["Venue Address", booking.event?.venue?.address ?
                `${booking.event.venue.address.street}, 
                 ${booking.event.venue.address.city}, 
                 ${booking.event.venue.address.province} 
                 ${booking.event.venue.address.postalcode}` : 'N/A'
            ],
            ["Event Date", booking.event?.date ?
                new Date(booking.event.date).toLocaleDateString() : 'N/A'],
            ["Time Slot", booking.event?.time_slot?.join(", ") || 'N/A'],
            ["Guest Number", booking.event?.guest_number?.toString() || 'N/A'],
            ["Sitting Arrangement", booking.event?.sitting_arrangement || 'N/A'],
            ["Menu Choice", booking.event?.menu_choice || "N/A"],
            ["Venue Cost", `$${booking.venue_cost?.toFixed(2) || "0.00"}`],
            ["Food Cost", `$${booking.food_cost?.toFixed(2) || "0.00"}`],
            ["Total Cost", `$${booking.total_cost || "0.00"}`],
        ];
        // Table for detailed booking information
        doc.autoTable({
            head: [["Field", "Details"]],
            body: bookingDetails,
            startY: 80,
            theme: "grid",
            headStyles: {
                fillColor: [30, 30, 100],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            bodyStyles: { cellPadding: 4, fontSize: 10 },
            styles: { lineWidth: 0.1, lineColor: [100, 100, 100] },
        });
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(120);
        doc.text("Thank you for choosing our event services!", 14, doc.lastAutoTable.finalY + 20);
        doc.save(`booking-receipt-${booking._id}.pdf`);
    };
    const getStatusStyle = (status) => {
        const baseStyle = {
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500'
        };
        switch (status) {
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
    const fetchBookingDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:9000/api/v1/booking/user-booking/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log('Fetched booking details:', data);
            if (!response.ok) {
                throw new Error(data.message || 'Error fetching booking details');
            }
            setBooking(data.booking);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <div style={styles.loadingText}>Loading...</div>;
    if (error) return <div style={styles.errorText}>Error: {error}</div>;
    if (!booking) return <div style={styles.errorText}>Booking not found</div>;
    return (
        <div style={styles.container}>
            <button
                onClick={() => navigate(-1)}
                style={styles.backButton}
            >
                ← Back to Bookings
            </button>
            <div style={styles.detailsCard}>
                <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>Booking Details</h2>
                </div>
                <div style={styles.cardBody}>
                    <div style={styles.twoColumnGrid}>
                        <div style={styles.column}>
                            <h3 style={styles.sectionTitle}>Event Information</h3>
                            <div style={styles.infoGroup}>
                                <label style={styles.label}>Event Type</label>
                                <div style={styles.value}>
                                    {booking.event?.category?.name || 'N/A'}
                                </div>
                                <label style={styles.label}>Date</label>
                                <div style={styles.value}>
                                    {booking.event?.date ?
                                        formatDate(booking.event.date)
                                        : 'N/A'}
                                </div>
                                <label style={styles.label}>Time Slots</label>
                                <div style={styles.value}>
                                    {booking.event?.time_slot?.join(', ') || 'N/A'}
                                </div>
                                <label style={styles.label}>Number of Guests</label>
                                <div style={styles.value}>
                                    {booking.event?.guest_number || 0}
                                </div>
                                <label style={styles.label}>Seating Arrangement</label>
                                <div style={styles.value}>
                                    {booking.event?.sitting_arrangement || 'N/A'}
                                </div>
                                <label style={styles.label}>Menu Choice</label>
                                <div style={styles.value}>
                                    {booking.event?.menu_choice || 'N/A'}
                                </div>
                            </div>
                        </div>
                        <div style={styles.column}>
                            <h3 style={styles.sectionTitle}>Venue Information</h3>
                            <div style={styles.infoGroup}>
                                <label style={styles.label}>Venue Name</label>
                                <div style={styles.value}>
                                    {booking.event?.venue?.venue_name || 'N/A'}
                                </div>
                                <label style={styles.label}>Address</label>
                                <div style={styles.value}>
                                    {booking.event?.venue?.address ?
                                        `${booking.event.venue.address.street || ''},
                                         ${booking.event.venue.address.city || ''},
                                         ${booking.event.venue.address.province || ''}
                                         ${booking.event.venue.address.postalcode || ''}`
                                        : 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.costSection}>
                        <h3 style={styles.sectionTitle}>Cost Breakdown</h3>
                        <div style={styles.infoGroup}>
                            <label style={styles.label}>Venue Cost</label>
                            <div style={styles.value}>
                                ${booking.venue_cost?.toFixed(2) || '0.00'}
                            </div>
                            <label style={styles.label}>Food Cost</label>
                            <div style={styles.value}>
                                ${booking.food_cost?.toFixed(2) || '0.00'}
                            </div>
                            <label style={styles.totalLabel}>Total Cost</label>
                            <div style={styles.totalValue}>
                                ${booking.total_cost || '0.00'}
                            </div>
                        </div>
                    </div>
                    <div style={styles.statusSection}>
                        <div style={styles.statusHeader}>
                            <div style={styles.statusInfo}>
                                <h3 style={styles.sectionTitle}>Booking Status</h3>
                                <div style={{
                                    ...styles.statusBadge,
                                    ...getStatusStyle(booking.status)
                                }}>
                                    {(booking.status || 'N/A').toUpperCase()}
                                </div>
                            </div>
                            <button
                                onClick={downloadReceipt}
                                style={styles.downloadButton}
                            >
                                
                                <span>Download Receipt</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '110px 20px',
        fontFamily: 'Arial, sans-serif'
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333'
    },
    statusSection: {
        borderTop: '1px solid #e9ecef',
        paddingTop: '20px',
        marginTop: '20px'
    },
    statusHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    statusInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px' // Space between title and status badge
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
        margin: 0 // Remove default margin
    },
    statusBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 12px',
        borderRadius: '9999px',
        fontSize: '14px',
        fontWeight: '500',
        height: 'fit-content'
    },
    downloadButton: {
        backgroundColor: '#a2783a',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px', // Space between icon and text
        '&:hover': {
            backgroundColor: '#8f6930',
            transform: 'translateY(-1px)'
        },
        '&:active': {
            transform: 'translateY(0)'
        }
    },
    downloadIcon: {
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
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
    backButton: {
        background: 'none',
        border: 'none',
        color: '#3b82f6',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '20px',
        padding: '0'
    },
    detailsCard: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
    },
    cardHeader: {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderBottom: '1px solid #e9ecef'
    },
    cardTitle: {
        margin: '0',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333'
    },
    cardBody: {
        padding: '20px'
    },
    twoColumnGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
    },
    column: {
        padding: '20px'
    },
    infoGroup: {
        display: 'grid',
        gap: '8px'
    },
    label: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '4px'
    },
    value: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '12px'
    },
    totalLabel: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        marginTop: '12px'
    },
    totalValue: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333'
    },
    costSection: {
        borderTop: '1px solid #e9ecef',
        paddingTop: '20px',
        marginTop: '20px'
    }
};
export default BookingDetails;