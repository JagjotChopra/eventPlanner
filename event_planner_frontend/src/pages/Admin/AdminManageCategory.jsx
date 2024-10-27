import React, { useEffect, useState } from 'react';
import './AdminManageCategory.css'; // Import the CSS file
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminManageCategory = () => {
    const [data, setData] = useState([]);

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
        alert("View Category");
    };

    const handleEdit = (category) => {
        alert("Edit Category");
    };

    const handleDelete = async (id) => {
        alert("Delete Category");
    }

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
        </div>
    );
};

export default AdminManageCategory;
