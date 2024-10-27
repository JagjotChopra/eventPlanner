import React, { useEffect, useState } from 'react';
import './AdminManageCategory.css'; // Import the CSS file
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminManageCategory = () => {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [error, setError] = useState({ status: false, message: '' });
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewCategory, setViewCategory] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:9000/api/v1/admin/EventCategory', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log(response);
            if (response.status == "200") {
                setData(response.data.data);
            }
        } catch (error) {
            console.error('Error Fetching Event category Data:', error);
            // Handle different response statuses
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

                alert("Need To Login Again");
                localStorage.removeItem('token');
                navigate('/login');

            } else {
                alert("Server is Down. Please Try Later");
            }
        }
    };

    const handleView = (category) => {
        setViewCategory(category);
        setIsViewModalOpen(true); // Open the view modal
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setName(category.name);
        setDescription(category.description);
        setImage(category.image);
        setIsModalOpen(true); // Open the modal
    };

    const handleDelete = async (id) => {
        alert("Delete Category");
    }

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (newImage) {
            formData.append('image', newImage);
        }
        console.log(formData);

        try {
            const response = await axios.put(`http://localhost:9000/api/v1/admin/EventCategory/${selectedCategory._id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },

            });
            console.log(response);
            if (response.status == 200) {
                alert("Event Category is Updated Successfully")
                setIsModalOpen(false);
                fetchData();
            }
        }
        catch (error) {
            console.error('Error Fetching Event category Data:', error);
            // Handle different response statuses
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

            } else {
                alert("Server is Down. Please Try Later");
            }
        }
    };

    return (
        <div className="eventCategory-container">
            <p className="eventCategory-title" style={{ marginTop: "0px" }}>Event Categories</p>

            <div className="eventCategory-box-container">
                {data.map(item => (
                    <div key={item._id} className="eventCategory-box">
                        <img src={item.image} alt={item.name} className="eventCategory-box-image" />
                        <h3 className="eventCategory-box-title" style={{ color: "black" }}>{item.name}</h3>
                        <p className="eventCategory-box-description">{item.description.substring(0, 50)}...</p>
                        <div className="eventCategory-box-actions">
                            <button className="eventCategory-button eventCategory-view-button" onClick={() => handleView(item)}><FaEye /></button>
                            <button className="eventCategory-button eventCategory-edit-button" onClick={() => handleEdit(item)}><FaEdit /></button>
                            <button className="eventCategory-button eventCategory-delete-button" onClick={() => handleDelete(item._id)}><MdDelete /></button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="eventCategory-modal">
                    <div className="eventCategory-modal-content">
                        {/* Close Icon */}
                        <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </button>

                        <h3>Edit Category</h3>
                        <form onSubmit={handleSubmit} className="reset-form" style={{ marginTop: '10px' }}>
                            <input
                                type="text"
                                placeholder="Enter Category Name"
                                className="reset-input-password"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Enter the Category description"
                                className="reset-input-password"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ marginTop: '20px' }}
                                required
                            ></textarea>

                            <img src={image} className="eventCategory-image" style={{ height: '200px', objectFit: 'cover' }} />

                            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', width: '100%' }}>
                                <label>Upload Category Image</label>
                                <input type="file" onChange={handleImageChange} accept="image/*" />
                            </div>

                            <button type="submit" className="submit-btn" style={{ marginTop: '40px', marginBottom: '40px' }}>
                                Update Category
                            </button>
                            {error.status && <p style={{ color: 'red' }}>{error.message}</p>}
                        </form>
                    </div>
                </div>
            )}


            {isViewModalOpen && (
                <div className="eventCategory-modal">
                    <div className="eventCategory-modal-content">
                        {/* Close Icon */}
                        <button className="close-modal-btn" onClick={() => setIsViewModalOpen(false)}>
                            &times;
                        </button>

                        <h3>View Category</h3>
                        {viewCategory && (
                            <div className="viewSpecificEvent">
                                <img src={viewCategory.image} alt={viewCategory.name} style={{ width: '500px', height: '300px', objectFit: 'cover' }} className="eventCategory-image" />
                                <p style={{ fontSize: "20px" }}> {viewCategory.name}</p>
                                <p> {viewCategory.description}</p>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManageCategory;
