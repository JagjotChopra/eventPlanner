// components/AddCategoryForm.js
import React, { useState } from 'react';
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

  }

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
        </form>

      </div>
    </div>

  );
};

export default AdminAddCategory;
