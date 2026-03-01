import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(config => {
  const session = localStorage.getItem('session');
  if (session) {
    const parsed = JSON.parse(session);
    config.headers.Authorization = `Bearer ${parsed.access_token}`;
  }
  return config
});

export default api