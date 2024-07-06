import axios from 'axios';

const API_URL = 'http://localhost:4000/years';

export async function fetchYears() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching years:', error);
    throw error;
  }
}

export async function fetchYearById(year) {
  try {
    const response = await axios.get(`${API_URL}/${year}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching year ${year}:`, error);
    throw error;
  }
}
