import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; 
import { useNavigate } from 'react-router-dom';
const AdminManageVenue = () => {
    const [venues, setVenues] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9000/api/v1/admin/GetEventVenue',
           { headers: {
                'Authorization': `Bearer ${token}`
            }}
        );
        
        console.log(response);
       
        try {
            setVenues(response.data);
        } catch (error) {
            console.log(error);
            if (error.response ) {
                const { status } = error.response;
                let message;
        
                // Set messages based on response status
                switch (status) {
                  case 401:
                    message = "Invalid token or no token provided.";
                    break;
                  case 403:
                    message = "Access denied. You do not have permission to perform this action.";
                    break;
                  default:
                    message = "An error occurred.";
                    break;
                }
        
                alert("Need To Login Again"); // Show the message to the user
                localStorage.removeItem('token');
                navigate('/login');
             
              }
              
             
  alert('Server is Down. Please Try Later');
           
        }
    };

 // Open the image modal
    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

 
    const handleDelete = async (venue_id) => {
       
    };

    const handleEdit = (venue) => {
    
    };

    

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h3 style={{ textAlign:'center' }}>Venue Management</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor:'white',boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Venue Name</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Address</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Size</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Sitting Arrangement</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Max Capacity</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Min Capacity</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Price</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Status</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Images</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {venues.map((venue) => (
                        <tr key={venue.venue_name}>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{venue.venue_name}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{venue.address.street}, {venue.address.city}, {venue.address.province}, {venue.address.country}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{venue.size}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{venue.sitting_arrangement.join(', ')}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{venue.max_capacity}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{venue.min_capacity}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{venue.venue_price}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{venue.availability_status}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                                        {venue.image_upload.map((image, index) => (
                                            <img
                                                key={index}
                                                src={"http://localhost:9000/uploads/" + image}
                                                alt={`Venue ${venue.venue_name}`}
                                                onClick={() => openModal(image)}
                                                style={{ cursor: 'pointer', width: '50px', height: '50px', margin: '5px' }}
                                            />
                                        ))}
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                                <button style={{ margin: '5px', padding: '5px', backgroundColor: '#FFC107', color: '#000', border: 'none', cursor: 'pointer' }}>Edit</button>
                                <button  style={{ margin: '5px', padding: '5px', backgroundColor: '#F44336', color: '#FFF', border: 'none', cursor: 'pointer' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             {/* Image modal */}
             <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Modal">
                       <button onClick={closeModal} style={{alignContent:'right'}}>X</button>
                        {selectedImage && <img src={"http://localhost:9000/uploads/" + selectedImage} alt="Large view" style={{ height:'90vh',width:"100%",objectFit:'cover' }} />}
                </Modal>
        </div>
    );
};

export default AdminManageVenue;

