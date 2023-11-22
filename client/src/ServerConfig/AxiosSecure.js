
import axios from 'axios';

const AxiosSecure= axios.create({
  baseURL: 'http://localhost:8000', 
 
});

export default AxiosSecure;
