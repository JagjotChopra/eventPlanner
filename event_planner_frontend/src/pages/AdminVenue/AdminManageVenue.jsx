import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
const AdminManageVenue = () => {
    const [venues, setVenues] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [editVenue, setEditVenue] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [error, setError] = useState("");
    const [imagesToRemove, setImagesToRemove] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9000/api/v1/admin/GetEventVenue',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log(response);

        try {
            setVenues(response.data);
        } catch (error) {
            console.log(error);
            if (error.response) {
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

    // Open the edit modal with the selected venue data
    const openEditModal = (venue) => {
        setError('');
        setEditVenue(venue);
        setImagePreviews(venue.image_upload.map(img => `http://localhost:9000/uploads/${img}`)); // Preview images from database
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
        setEditVenue(null);
        setImagePreviews([]);
    };

    // Handle form changes
    const handleChange = (e) => {
        setEditVenue({ ...editVenue, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setEditVenue({
            ...editVenue,
            address: { ...editVenue.address, [e.target.name]: e.target.value },
        });
    };

    const handleSittingArrangementChange = (e) => {
        const { value, checked } = e.target;
        setEditVenue((prevVenue) => {
            const sittingArr = prevVenue.sitting_arrangement || [];
            return {
                ...prevVenue,
                sitting_arrangement: checked
                    ? [...sittingArr, value]
                    : sittingArr.filter((arr) => arr !== value),
            };
        });
    };

    // Handle file change for new image uploads
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));

        // Debug: Log the files and previews
        console.log("New files selected:", files);
        console.log("New previews generated:", previews);

        setImagePreviews(prevPreviews => {
            const updatedPreviews = [...prevPreviews, ...previews];
            console.log("Updated image previews:", updatedPreviews);
            return updatedPreviews;
        });
    };

    const handleRemoveImage = (image) => {
        setImagesToRemove(prev => [...prev, image]); // Mark the image for removal
        setImagePreviews(prev => prev.filter(img => img !== image)); // Update previews
    };


    const validateForm = () => {
        setError('');
        if (
            !editVenue?.venue_name ||
            !editVenue?.address?.street ||
            !editVenue?.address?.city ||
            !editVenue?.address?.postalcode ||
            !editVenue?.address?.province ||
            !editVenue?.address?.postalcode ||
            !editVenue?.address?.country ||
            !editVenue?.size ||
            !editVenue?.max_capacity ||
            !editVenue?.min_capacity ||
            !editVenue?.venue_price
        ) {
            alert('All Fields are Required');
            return false; // Validation failed
        }

        if (imagePreviews.length === 0) {
            setError('At least 1 image is required.');
            return false;
        }

        if (imagePreviews.length > 5) {
            setError('At Most 5 image Can be Added.');
            return false;
        }

        const sizePattern = /^\s*\d+\s*x\s*\d+\s*$/;
        if (!sizePattern.test(editVenue.size)) {
            setError('Size must be in the format "5 x 6".');
            return false;
        }
        if (isNaN(editVenue.max_capacity) || isNaN(editVenue.min_capacity)) {
            setError('Capacity must be Number');
            return false;
        }
        if ((editVenue.max_capacity % 1 !== 0) || (editVenue.min_capacity % 1 !== 0)) {
            setError('Capacity must be Number');
            return false;
        }

        if (Number(editVenue.max_capacity) < Number(editVenue.min_capacity)) {
            setError('Maximum capacity must be greater than minimum capacity.');
            return false;
        }

        if (isNaN(editVenue.venue_price) || editVenue.venue_price < 0) {
            setError('Hall price must be a positive number.');
            return false;
        }

        if (editVenue.sitting_arrangement.length == 0) {
            setError('Choose atleast one sitting arrangement.');
            return false;
        }

        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare FormData to send both the edited data and the images
        const formData = new FormData();

        // Add other venue data to the FormData object
        Object.keys(editVenue).forEach(key => {
            if (key === 'address') {
                // Add nested address fields separately
                Object.keys(editVenue.address).forEach(subKey => {
                    formData.append(`address.${subKey}`, editVenue.address[subKey]);
                });
            } else if (key !== 'image_upload') { // Ignore existing images
                formData.append(key, editVenue[key]);
            }
        });



        // Append existing images only if they are not empty
        if (editVenue.image_upload && editVenue.image_upload.length > 0) {
            editVenue.image_upload.forEach(img => {
                // Only add the image if it's not marked for removal
                if (!imagesToRemove.includes(img)) {
                    formData.append('existingImages', img);
                }
            });
        }

        // Append new images to FormData only if files are selected
        const fileInput = document.querySelector('input[type="file"]');
        const newFiles = fileInput.files;

        if (newFiles.length > 0) {
            for (let i = 0; i < newFiles.length; i++) {
                const file = newFiles[i];
                if (file) formData.append('newImages', file);
            }
        }

        // Append images to be removed (those marked for deletion)
        imagesToRemove.forEach(image => {
            formData.append('imagesToRemove', image); // Add images marked for removal
        });

        

        if (!validateForm()) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:9000/api/v1/admin/UpdateVenue/${editVenue._id}`,formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status == "201") {
                closeEditModal();
                alert('Venue updated successfully');
               
                fetchVenues(); 
              }
            else {
                setError("Failed to update the venue.");
            }
        } catch (error) {
            console.error('Error adding category:', error.response);
            // Handle different response statuses
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
            
           
              setError('Server is Down. Please Try Later');
          
          }
      

      
    };





    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h3 style={{ textAlign: 'center' }}>Venue Management</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
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
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{venue.address.street}, {venue.address.city}, {venue.address.postalcode},  {venue.address.province}, {venue.address.country}</td>
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
                                <button onClick={() => openEditModal(venue)} style={{ margin: '5px', padding: '5px', backgroundColor: '#FFC107', color: '#000', border: 'none', cursor: 'pointer' }}>Edit</button>
                                <button style={{ margin: '5px', padding: '5px', backgroundColor: '#F44336', color: '#FFF', border: 'none', cursor: 'pointer' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Image modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Modal">
                <button onClick={closeModal} style={{ alignContent: 'right' }}>X</button>
                {selectedImage && <img src={"http://localhost:9000/uploads/" + selectedImage} alt="Large view" style={{ height: '90vh', width: "100%", objectFit: 'cover' }} />}
            </Modal>

            {/* Edit modal */}
            <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} contentLabel="Edit Venue Modal">
                <button onClick={closeEditModal}>Close</button>
                <form style={{ width: '70%', margin: '0px auto', background: 'white', padding: '20px 50px' }}>
                    <h3 style={{ textAlign: 'center' }}>Edit Event Venue</h3>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Venue Name:
                        <input type="text" name="venue_name" value={editVenue?.venue_name || ''} onChange={handleChange} required
                            style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                        /></label>

                    <label style={{ display: 'block', marginBottom: '10px' }}>Street: <input type="text" name="street" value={editVenue?.address?.street || ''} onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} /></label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>City: <input type="text" name="city" value={editVenue?.address?.city || ''} onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} /></label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Postal Code: <input type="text" name="province" value={editVenue?.address?.postalcode || ''} onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} /></label>

                    <label style={{ display: 'block', marginBottom: '10px' }}>Province: <input type="text" name="province" value={editVenue?.address?.province || ''} onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} /></label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Country: <input type="text" name="country" value={editVenue?.address?.country || ''} onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} /></label>

                    <label style={{ display: 'block', marginBottom: '10px' }}>Size: <input type="text" name="size" value={editVenue?.size || ''} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} /></label>

                    <label style={{ display: 'block', marginBottom: '10px' }}>Sitting Arrangement:
                        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                            {['circle', 'rows', 'U-Shape'].map((arrangement) => (
                                <label key={arrangement}>
                                    <input
                                        type="checkbox"
                                        value={arrangement}
                                        checked={editVenue?.sitting_arrangement?.includes(arrangement) || false}
                                        onChange={handleSittingArrangementChange}
                                    />
                                    {arrangement}
                                </label>
                            ))}
                        </div>
                    </label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Max Capacity: <input type="text" name="max_capacity" value={editVenue?.max_capacity || ''} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} /></label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Min Capacity: <input type="text" name="min_capacity" value={editVenue?.min_capacity || ''} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} /></label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Price: <input type="text" name="venue_price" value={editVenue?.venue_price || ''} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} /></label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Status:
                        <select name="availability_status" value={editVenue?.availability_status || ''} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
                            <option value="available">Available</option>
                            <option value="unavailable">Not Available</option>
                        </select>
                    </label>

                    <label style={{ display: 'block', marginBottom: '10px' }}>Upload Images:
                        <input type="file" accept="image/*" onChange={handleFileChange} multiple style={{ marginTop: '5px' }} />
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                        {imagePreviews.map((preview, index) => (
                            <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                                <img src={preview} alt={`Preview ${index}`} style={{ width: '50px', height: '50px' }} />
                                <button type='button' onClick={() => handleRemoveImage(preview)} style={{ position: 'absolute', top: '0', right: '0', background: 'red', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>x</button>
                            </div>
                        ))}
                    </div>
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                    <button type="button" onClick={handleSubmit} className='submit-btn' style={{ marginTop: '40px', marginBottom: '40px' }}>Update Venue</button>

                </form>
            </Modal>
        </div>
    );
};

export default AdminManageVenue;

