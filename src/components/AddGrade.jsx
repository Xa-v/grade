import React, { useState } from 'react';
import axios from 'axios';

const AddGrade = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/grades', { name });
      setMessage(response.data.message);
      setName(''); // Clear the input field
    } catch (error) {
      setMessage('Error adding grade');
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
    <h2>Add Student</h2>


 <form onSubmit={handleSubmit}>
      
<label>Name:</label>
<input 
  type="text"
  class="form-control mb-3 w-50"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>



<button type="submit" class="btn btn-primary">Add</button>
</form>
{message && <p>{message}</p>} 



  
    </div>
  );
};

export default AddGrade;



