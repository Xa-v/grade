import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get("http://localhost:4000/grades");
        setGrades(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);
  const inputNumber = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };

  const handleInputChange = (e, gradeid) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [gradeid]: {
        ...formData[gradeid],
        [name]: value,
      },
    });
  };

  const handleInputFocus = (e) => {
    e.target.select();
  };

  const handleSave = async (gradeid) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/grades/${gradeid}`,
        formData[gradeid]
      );
      setMessage(response.data.message);
      // Refresh grades data after update
      const updatedGrades = await axios.get("http://localhost:4000/grades");
      setGrades(updatedGrades.data);
    } catch (error) {
      setMessage("Error updating grade");
      console.error("There was an error!", error);
    }
  };

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>There was an error: {error.message}</p>
      ) : (
        <table className="table table-bordered" style={{ maxHeight: "100vh" }}>
          <thead>
            <tr>
              <th class="name"></th>
              <th colSpan="12" className="text-center flex-fill">
                ATTENDANCE
              </th>
              <th></th>
            </tr>
            <tr>
              <td></td>
              <td class="inputgrade bg-success text-light text-center ">A1</td>
              <td class="inputgrade bg-success text-light text-center">A2</td>
              <td class="inputgrade bg-success text-light text-center">A3</td>
              <td class="inputgrade bg-success text-light text-center">A4</td>
              <td class="inputgrade bg-success text-light text-center">A5</td>
              <td class="inputgrade bg-success text-light text-center">A6</td>
              <td class="inputgrade bg-success text-light text-center">A7</td>
              <td class="inputgrade bg-success text-light text-center">A8</td>
              <td class="inputgrade bg-success text-light text-center">A9</td>
              <td class="inputgrade bg-success text-light text-center"> A10</td>
              <td class="inputgrade bg-success text-light text-center">
                TOTAL
              </td>
              <td class="inputgrade bg-success text-light text-center">%</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.gradeid}>
                <td>{grade.name}</td>
                {[
                  "a1",
                  "a2",
                  "a3",
                  "a4",
                  "a5",
                  "a6",
                  "a7",
                  "a8",
                  "a9",
                  "a10",
                ].map((field) => (
                  <td key={field}>
                    <input
                      type="text"
                      onInput={inputNumber}
                      name={field}
                      value={formData[grade.gradeid]?.[field] ?? grade[field]}
                      onFocus={(e) => handleInputFocus(e, grade.gradeid)}
                      onChange={(e) => handleInputChange(e, grade.gradeid)}
                    />
                  </td>
                ))}
                <td class="text-center">{grade.a_total}</td>
                <td class="text-center">{grade.a_percentage}</td>
                <td class="d-flex gap-2">
                  <button
                    onClick={() => handleSave(grade.gradeid)}
                    class="btn btn-success"
                  >
                    Save
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Add
                  </button>
                  <button type="submit" class="btn btn-secondary">
                    Edit
                  </button>
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
