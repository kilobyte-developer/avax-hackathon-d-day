// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  constructor() {
    // Create axios instance with default configuration
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000, // 10 seconds timeout
      withCredentials: true, // Important for session cookies
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`Response received from ${response.config.url}: ${response.status}`);
        return response;
      },
      (error) => {
        console.error('Response interceptor error:', {
          url: error.config?.url,
          status: error.response?.status,
          message: error.message
        });

        // Handle specific error cases
        if (error.response?.status === 401) {
          // Unauthorized - redirect to login
          window.location.href = '/login';
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        status: error.response.status,
        message: error.response.data?.message || 'Server error occurred',
        data: error.response.data,
        type: 'SERVER_ERROR'
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        status: 0,
        message: 'Network error - please check your connection',
        type: 'NETWORK_ERROR'
      };
    } else {
      // Something else happened
      return {
        status: 0,
        message: error.message || 'An unexpected error occurred',
        type: 'UNKNOWN_ERROR'
      };
    }
  }

  // GET request
  async get(endpoint, config = {}) {
    try {
      const response = await this.client.get(endpoint, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error,
        status: error.status || 0
      };
    }
  }

  // POST request
  async post(endpoint, data = {}, config = {}) {
    try {
      const response = await this.client.post(endpoint, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error,
        status: error.status || 0
      };
    }
  }

  // PUT request
  async put(endpoint, data = {}, config = {}) {
    try {
      const response = await this.client.put(endpoint, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error,
        status: error.status || 0
      };
    }
  }

  // PATCH request
  async patch(endpoint, data = {}, config = {}) {
    try {
      const response = await this.client.patch(endpoint, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error,
        status: error.status || 0
      };
    }
  }

  // DELETE request
  async delete(endpoint, config = {}) {
    try {
      const response = await this.client.delete(endpoint, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error,
        status: error.status || 0
      };
    }
  }

  // Set default headers
  setDefaultHeader(key, value) {
    this.client.defaults.headers.common[key] = value;
  }

  // Remove default header
  removeDefaultHeader(key) {
    delete this.client.defaults.headers.common[key];
  }

  // Set authorization header (if needed for token-based auth)
  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  // Get base URL
  getBaseURL() {
    return API_BASE_URL;
  }

  // Health check
  async healthCheck() {
    try {
      const startTime = Date.now();
      const response = await this.get('/');
      const responseTime = Date.now() - startTime;
      
      return {
        success: response.success,
        status: response.status,
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Generic request method with retry logic
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      data = null,
      config = {},
      maxRetries = 3,
      retryDelay = 1000
    } = options;

    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        let response;
        
        switch (method.toUpperCase()) {
          case 'GET':
            response = await this.get(endpoint, config);
            break;
          case 'POST':
            response = await this.post(endpoint, data, config);
            break;
          case 'PUT':
            response = await this.put(endpoint, data, config);
            break;
          case 'PATCH':
            response = await this.patch(endpoint, data, config);
            break;
          case 'DELETE':
            response = await this.delete(endpoint, config);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }

        if (response.success) {
          return response;
        }

        lastError = response.error;
        
        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          break;
        }

      } catch (error) {
        lastError = error;
      }

      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        console.log(`Retrying request to ${endpoint} (attempt ${attempt + 1}/${maxRetries})`);
      }
    }

    return {
      success: false,
      error: lastError,
      message: `Failed after ${maxRetries} attempts`
    };
  }
}

// Create and export singleton instance
const apiService = new ApiService();
export default apiService;