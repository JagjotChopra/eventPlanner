import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Footer from '../Homepage/Footer';
import HeaderHome from '../Homepage/Header';

const stripePromise = loadStripe('pk_test_51OKFJrK06xPy6xcd28sE98ibkqridwPfqMMNDQYAaFJmwyT9ppiSXWbTdAOAHSQeO5z614izaVUIaMpdr8FBlLot002h7v1yJu');

const PaymentsPage = () => {
    return (
        <>
        <HeaderHome/>
         <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '48px 16px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div style={{ maxWidth: '500px', width: '100%' }}>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
        <Footer/>
        </>
       
    );
};

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const formData = JSON.parse(localStorage.getItem("formData")) || {};
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const totalAmount = formData.totalCost || 0;
    const [bookingData, setBookingData] = useState(null); // Store booking data for receipt
    const [paymentData, setPaymentData] = useState(null); // Store payment data

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        try {
            const paymentResponse = await fetch('http://localhost:9000/api/v1/payments/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ totalAmount: totalAmount * 100 }),
            });
            const { clientSecret } = await paymentResponse.json();

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: 'User Name' },
                },
            });

            if (error) {
                console.error('Payment error:', error);
                setLoading(false);
            } else if (paymentIntent.status === 'succeeded') {
                try {
                    const token = localStorage.getItem('token');
                    const bookingResponse = await axios.post(
                        'http://localhost:9000/api/v1/booking/create-booking',
                        formData,
                        { headers: { authorization: `Bearer ${token}` } }
                    );
                    console.log('Booking successful:', bookingResponse.data);
                    setPaymentSuccess(true);
                    setPaymentData(paymentIntent);
                    setBookingData(bookingResponse.data); // Set booking data for the receipt
                    localStorage.removeItem('selectedVenue');
                    localStorage.removeItem('formData');
                    localStorage.removeItem('step');

                    
                } catch (error) {
                    alert("Error creating booking");
                }
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        } finally {
            setLoading(false);
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

    const downloadReceipt = () => {
        if (!bookingData || !paymentData) return; // Ensure data is available

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
        doc.text(`Booking ID: ${bookingData.booking._id}`, 14, 35);
        doc.text(`Amount Paid: $${bookingData.booking.total_cost}`, 14, 42);
        doc.text(`Payment Date: ${new Date(paymentData.created * 1000).toLocaleString()}`, 14, 49);

        if (paymentData.payment_method_details && paymentData.payment_method_details.card) {
            doc.text(`Card Last 4 Digits: ${paymentData.payment_method_details.card.last4}`, 14, 56);
        }

        // Customer and Booking Details
        doc.setFontSize(16);
        doc.setTextColor(50, 50, 180);
        doc.text("Booking Details", 14, 70);

        const bookingDetails = [
            ["Customer Name", bookingData.name],
            ["Email", bookingData.email],
            ["Event Category", bookingData.category.name],
            ["Venue", bookingData.venue.venue_name],
            ["Venue Address", `${bookingData.venue.address.street}, ${bookingData.venue.address.city}, ${bookingData.venue.address.province} ${bookingData.venue.address.postalcode}, ${bookingData.venue.address.country}`],
            ["Event Date", formatDate(bookingData.event.date) ],
              ["Time Slot", bookingData.event.time_slot.join(", ")],
            ["Guest Number", bookingData.event.guest_number.toString()],
            ["Sitting Arrangement", bookingData.event.sitting_arrangement],
            ["Menu Choice", bookingData.event.menu_choice || "N/A"],
            ["Venue Cost (Incl Decoration)", `$${bookingData.booking.venue_cost}`],
            ["Food Cost", `$${bookingData.booking.food_cost || "0.00"}`],
            ["Total Cost", `$${bookingData.booking.total_cost}`],
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
        doc.text("Thank you for choosing our event services! For questions, contact support@events.com", 14, doc.lastAutoTable.finalY + 20);
        doc.save(`booking-receipt-${bookingData.booking._id}.pdf`);
        
    };

    const cardStyle = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
                padding: '16px',
            },
            invalid: { color: '#9e2146' },
        },
    };

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
            {paymentSuccess ? (
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#a2783a', marginBottom: '8px' }}>Payment Successful</h2>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>Thank you for your payment!</p>
                    <button
                        onClick={() => {
                            downloadReceipt();
                            localStorage.removeItem("formData");
                        }}
                        style={{
                            backgroundColor: '#a2783a',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                        }}
                    >
                        Download Receipt
                    </button>
                </div>
            ) : (
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '24px'
                }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '24px'
                    }}>
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: '#a2783a',
                            marginBottom: '8px'
                        }}>Complete Your Payment</h2>
                        <p style={{
                            color: '#666',
                            fontSize: '14px'
                        }}>Secure payment processing powered by Stripe</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '8px'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '16px'
                            }}>
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#666'
                                }}>Total Amount</span>
                                <span style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>${totalAmount}</span>
                            </div>

                            <div style={{
                                height: '1px',
                                backgroundColor: '#e0e0e0',
                                margin: '16px 0'
                            }} />

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#666',
                                    marginBottom: '8px'
                                }}>
                                    Card Details
                                </label>
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    border: '1px solid #e0e0e0'
                                }}>
                                    <CardElement options={cardStyle} />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!stripe || loading}
                            style={{
                                backgroundColor: loading ? '#94a3b8' : '#a2783a',
                                color: 'white',
                                padding: '16px',
                                borderRadius: '8px',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s',
                                ':hover': {
                                    backgroundColor: loading ? '#94a3b8' : '#a2783a'
                                }
                            }}
                        >
                            {loading ? 'Processing...' : `Pay $${totalAmount}`}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PaymentsPage;