import React, { useEffect, useState } from 'react';
import './AdminManageCategory.css'; // Import the CSS file
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminManageCategory = () => {
    const [data, setData] = useState([
        {
            _id: '1',
            name: 'Music Festival',
            description: 'A grand music festival with multiple artists.',
            image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439'
        },
        {
            _id: '2',
            name: 'Tech Conference',
            description: 'Conference showcasing the latest in technology.',
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df'
        },
        {
            _id: '3',
            name: 'Food Expo',
            description: 'An expo for food lovers to enjoy a variety of cuisines.',
            image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9'
        }]);
        
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

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
