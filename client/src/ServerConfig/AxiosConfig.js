
import axios from 'axios';

const AxiosBase = axios.create({
  baseURL: 'http://localhost:8000', 
 
});

export default AxiosBase;
