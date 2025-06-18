import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器 - 添加重试机制
apiClient.interceptors.response.use(response => {
  return response.data;
}, async error => {
  const originalRequest = error.config;
  
  // 检查是否为超时错误或网络错误
  const isRetryable = 
    error.code === 'ECONNABORTED' || 
    error.message.includes('timeout') || 
    error.message.includes('Network Error');
  
  // 检查是否已重试过
  const retryCount = originalRequest._retryCount || 0;
  
  if (isRetryable && retryCount < 3) {
    // 设置重试计数器
    originalRequest._retryCount = retryCount + 1;
    
    // 指数退避策略
    const delay = Math.pow(2, retryCount) * 1000;
    
    // 创建新的Promise进行重试
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(apiClient(originalRequest));
      }, delay);
    });
  }
  
  if (error.response) {
    console.error('API Error:', error.response.data);
    return Promise.reject(error.response.data);
  }
  
  return Promise.reject(error);
});

export default apiClient;
