import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    config.baseURL = "http://localhost:3000/api/";

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
