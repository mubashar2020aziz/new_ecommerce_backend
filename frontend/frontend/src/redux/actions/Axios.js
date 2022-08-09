import axios from 'axios';
const URL = 'http://localhost:2000';
const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  },
});
export default axiosInstance;
