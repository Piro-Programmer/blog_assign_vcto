import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';

// ✅ Create Axios Instance
const api: AxiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Request Interceptor (Typed)
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor (Typed)
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('API Error:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
