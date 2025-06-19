// Basic API client using fetch
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const request = async (endpoint, options = {}) => {
  const config = {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();
  if (!response.ok) {
    const error = typeof data === 'string' ? { message: data } : data;
    throw Object.assign(new Error(error.message || 'Request failed'), {
      status: response.status,
      data,
    });
  }
  return data;
};

export default request;
