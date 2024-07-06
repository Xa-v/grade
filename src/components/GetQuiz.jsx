import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get('http://localhost:4000/grades');
        setGrades(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  const handleInputChange = (e, gradeid) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [gradeid]: {
        ...formData[gradeid],
        [name]: value
      }
    });
  };

  const handleInputFocus = (e) => {
    e.target.select();

    
  };

  const handleSave = async (gradeid) => {
    try {
      const response = await axios.put(`http://localhost:4000/grades/${gradeid}`, formData[gradeid]);
      setMessage(response.data.message);
      // Refresh grades data after update
      const updatedGrades = await axios.get('http://localhost:4000/grades');
      setGrades(updatedGrades.data);
   
    } catch (error) {
      setMessage('Error updating grade');
      console.error('There was an error!', error);
    }
  };

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>There was an error: {error.message}</p>
      ) : (
        <table className="table table-bordered" style={{ maxHeight: '100vh' }}>
        <thead>
          <tr>
            <th class="name" ></th>
            <th colSpan="12" className="text-center flex-fill">QUIZZES</th>
            <th></th>
          </tr>
          <tr>
            <td></td>
            <td class="inputgrade bg-success ">Q1</td>
            <td class="inputgrade bg-success ">Q2</td>
            <td class="inputgrade bg-success ">Q3</td>
            <td class="inputgrade bg-success ">Q4</td>
            <td class="inputgrade bg-success ">Q5</td>
            <td class="inputgrade bg-success ">Q6</td>
            <td class="inputgrade bg-success ">Q7</td>
            <td class="inputgrade bg-success ">Q8</td>
            <td class="inputgrade bg-success ">Q9</td>
            <td class="inputgrade bg-success "> Q10</td>
            <td class="inputgrade bg-success ">TOTAL</td>
            <td class="inputgrade bg-success ">%</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.gradeid}>
              <td>{grade.name}</td>
              {['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'].map((field) => (
                <td key={field}>
                  <input
                    type="number"
                    name={field}
                    value={formData[grade.gradeid]?.[field] ?? grade[field]}
                    onFocus={(e) => handleInputFocus(e, grade.gradeid)}
                    onChange={(e) => handleInputChange(e, grade.gradeid)}
                  />
                </td>
              ))}
              <td>{grade.q_total}</td>
              <td>{grade.q_percentage}</td>
              <td class="savebutton">
                <button onClick={() => handleSave(grade.gradeid)}>Save</button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {message && <p>{message}</p>}
    </main>
  );
};

export default Grades;
