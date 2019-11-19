import axios from 'axios';
import config from '../config.json';

const configureApi = () => {
  const api = axios.create({
    baseURL: config.api.invokeUrl,
    contentType: 'application/json'
  });

  api.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
  return api;
}

const api = configureApi();

export default api;