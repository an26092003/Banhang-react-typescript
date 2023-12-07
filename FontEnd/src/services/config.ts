import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  // timeout: 1000,
});

// Define types for request and response interceptors
type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;

// Add a request interceptor
const requestInterceptor: RequestInterceptor = (config) => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Do something before the request is sent
  return config;
};

instance.interceptors.request.use(requestInterceptor, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
const responseInterceptor: ResponseInterceptor = (response) => {
  // Any status code in the range 2xx will trigger this function
  // Do something with the response data
  if (response && response.data) {
    return response;
  }
  return response;
};

instance.interceptors.response.use(responseInterceptor, (error) => {
  // Any status code outside the range 2xx will trigger this function
  // Do something with the response error
  return Promise.reject(error);
});

export default instance;
