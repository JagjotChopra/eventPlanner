import React, { useState } from 'react';
import axios from 'axios';

const AdminAddVenue = () => {
  const [formData, setFormData] = useState({
    venue_name: '',
    address: { street: '', city: '', province: '', country: '',postalcode:'' },
    size: '',
    sitting_arrangement: [],
    max_capacity: '',
    min_capacity: '',
    hall_price: '',
    availability_status: 'avaiable',
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleSittingArrangementChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      sitting_arrangement: checked
        ? [...prev.sitting_arrangement, value]
        : prev.sitting_arrangement.filter(item => item !== value)
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Limit to 5 images
    if (images.length + files.length > 5) {
      setError('Maximum 5 images are allowed.');
      return;
    }

    // Add new images without replacing existing ones
    setImages(prevImages => [...prevImages, ...files]);

    // Generate previews for the new images and keep previous previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    setError(''); // Clear error
  };

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (images.length === 0) {
      setError('At least 1 image is required.');
      return false;
    }

    const sizePattern = /^[5] x [6]$/; // Check if size matches "5 x 6"
    if (!sizePattern.test(formData.size)) {
      setError('Size must be in the format "5 x 6".');
      return false;
    }
    if (isNaN(formData.max_capacity) || isNaN(formData.min_capacity) ) {
        setError('Capacity must be Number');
        return false;
    }
    if ((formData.max_capacity % 1 !== 0) || (formData.min_capacity % 1 !== 0)) {
        setError('Capacity must be Number');
        return false;
    }

    if (formData.max_capacity <= formData.min_capacity){
      setError('Maximum capacity must be greater than minimum capacity.');
      return false;
    }

    if (isNaN(formData.hall_price) || formData.hall_price < 0) {
      setError('Hall price must be a positive number.');
      return false;
    }

    if(formData.sitting_arrangement.length==0){
        setError('Choose atleast one sitting arrangement.');
        return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
    console.log(formData);
   
  };

  return (
   <div style={{padding:'25px 0px'}}> 
   
 <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0px auto', background:'white', padding: '20px 50px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      
      <h3 style={{textAlign:'center'}}>Add Event Venue</h3>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Venue Name:
        <input type="text" name="venue_name" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Street Address:
        <input type="text" name="street" onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        City:
        <input type="text" name="city" onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Postal Code:
        <input type="text" name="postalcode" onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Province:
        <input type="text" name="province" onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Country:
        <input type="text" name="country" onChange={handleAddressChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Size (Format: 5 x 6):
        <input type="text" name="size" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Sitting Arrangement:
        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
          <label>
            <input type="checkbox" value="circle" onChange={handleSittingArrangementChange} /> Circle
          </label>
          <label>
            <input type="checkbox" value="rows" onChange={handleSittingArrangementChange} /> Rows
          </label>
          <label>
            <input type="checkbox" value="ushaped" onChange={handleSittingArrangementChange} /> Ushaped
          </label>
        </div>
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Max Capacity:
        <input type="text" name="max_capacity" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Min Capacity:
        <input type="text" name="min_capacity" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Hall Price:
        <input type="text" name="hall_price" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Availability Status:
        <select name="availability_status" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <option value="available" >Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Upload Images (max 5):
        <input type="file" accept="image/*" onChange={handleFileChange} multiple style={{ marginTop: '5px' }} />
      </label>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
        {imagePreviews.map((preview, index) => (
          <div key={index} style={{ position: 'relative', width: '100px', height: '100px', overflow: 'hidden', border: '1px solid #ccc', borderRadius: '4px' }}>
            <img src={preview} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button type="button" onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>X</button>
          </div>
        ))}
      </div>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <button type="submit"  className='submit-btn' style={{ marginTop: '40px', marginBottom: '40px' }}>
        Add Venue
      </button>
    </form> 
    </div>
   
  );
};

export default AdminAddVenue;

