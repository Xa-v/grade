import React, { useState } from 'react';
import axios from 'axios';

const UpdateGrade = () => {
  const [gradeid, setGradeid] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    a1: '',
    a2: '',
    e1: ''
    // Include all other fields similarly
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/grades/${gradeid}`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error updating grade');
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <h2>Update Grade</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Grade ID:</label>
          <input
            type="text" value={gradeid} onChange={(e) => setGradeid(e.target.value)} required/>
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>A1:</label>
          <input
            type="number"
            name="a1"
            value={formData.a1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>A2:</label>
          <input
            type="number"
            name="a2"
            value={formData.a2}
            onChange={handleInputChange}
          />
        </div>
        {/* Add input fields for all other attributes similarly */}
        <div>
          <label>E1:</label>
          <input
            type="number"
            name="e1"
            value={formData.e1}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateGrade;
