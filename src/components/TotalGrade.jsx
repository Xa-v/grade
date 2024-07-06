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
            <th className="name" ></th>
            <th colSpan="12" className="text-center flex-fill">QUIZZES</th>
        
          </tr>
          <tr>
            <td></td>
            <td className="inputgrade bg-success ">activity total</td>
            <td className="inputgrade bg-success ">%</td>
            <td className="inputgrade bg-success ">participation total</td>
            <td className="inputgrade bg-success ">%</td>
            <td className="inputgrade bg-success ">quiz total</td>
            <td className="inputgrade bg-success ">%</td>
            <td className="inputgrade bg-success ">activity/project total</td>
            <td className="inputgrade bg-success ">%</td>
            <td className="inputgrade bg-success ">Major exam total</td>
            <td className="inputgrade bg-success ">%</td>
            <td className="inputgrade bg-success ">FINAL GRADE</td>
            <td className="inputgrade bg-success ">REMARKS</td>
           
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.gradeid}>
              <td>{grade.name}</td>
              {['a_total', 'a_percentage', 'p_total', 'p_percentage', 'q_total', 'q_percentage', 'ap_total', 'ap_percentage', 'e_total', 'e_percentage','finalgrade'  ].map((field) => (
                <td key={field}>
                  <input
                    type="number"
                    name={field}
                    value={formData[grade.gradeid]?.[field] ?? grade[field]}
                    onFocus={(e) => handleInputFocus(e, grade.gradeid)}
                    onChange={(e) => handleInputChange(e, grade.gradeid)}
                 disabled />
                </td>
              ))}

<td>
  {grade.finalgrade < 75 ? (
    <p className="bg-danger">FAILED</p>
  ) : (
    <p className="bg-success">PASSED</p>
  )}
</td>
             
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
