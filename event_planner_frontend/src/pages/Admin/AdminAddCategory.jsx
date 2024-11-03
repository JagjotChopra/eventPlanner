// components/AddCategoryForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdminAddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState({ status: false, message: '' })
  const navigate = useNavigate(); 
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError({ status: false, message: "" })
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:9000/api/v1/admin/EventCategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log(response);
      if (response.status == "201") {
        alert("New Event Category is Added Successfully");
        setName('');
        setDescription('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error adding category:', error);
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
        setError({ status: true, message: "Server is Down. Please Try Later" });
      }


      // setError({status:true,message:"Error Occured"})
    }
  };

  return (

    <div className="reset-container" style={{ height: '90vh' }}>
      <div className="reset-box" style={{ width: '50%' }}>
        <h3>Add Event Category</h3>
        <form onSubmit={handleSubmit} className='reset-form' style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Enter Category Name"
            className='reset-input-password'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea placeholder="Enter the Category description "
            className='reset-input-password'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginTop: '20px' }}
            required
          ></textarea>


          <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', width: '100%' }}>
            <label >Upload Category Image</label>
            <input type="file" onChange={handleImageChange} required accept="image/*" />
          </div>

          <button type="submit" className='submit-btn' style={{ marginTop: '40px', marginBottom: '40px' }}>Add New Category</button>
          {error.status == true ? <p style={{ color: 'red' }}>{error.message}</p> : null}
       
        </form>

      </div>
    </div>

  );
};

export default AdminAddCategory;
