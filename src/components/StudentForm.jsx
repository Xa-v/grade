import axios from "axios";
import { useState } from 'react';


export const addStudent = async (student) => {
    try {
        const response = await axios.post("http://localhost:4000/grades", student);
        return response.data;
    } catch (error) {
        console.error("Error adding student:", error);
        throw error;
    }
}

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: ''
 
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await addStudent(formData);
      if (response) {
          setSuccess(true);
          setFormData({
            name: ''
          });
    }
      
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            setError("Failed to add student: ", err.response.data.message);
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
    //   setError('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Add New Student</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Student added successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Student:</label>
          <input type="text" name="student_name" value={formData.name} onChange={handleChange} required />
        </div>
    
      
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
