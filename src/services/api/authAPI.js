import request from './client';
import { API_ENDPOINTS } from '../../utils/constants';

export const login = (email, password) =>
  request(API_ENDPOINTS.auth.login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const register = (data) =>
  request(API_ENDPOINTS.auth.register, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const logout = () =>
  request(API_ENDPOINTS.auth.logout, { method: 'POST' });

export const refresh = (token) =>
  request(API_ENDPOINTS.auth.refresh, {
    method: 'POST',
    body: JSON.stringify({ refreshToken: token }),
  });

export const forgotPassword = (email) =>
  request(API_ENDPOINTS.auth.forgotPassword, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const resetPassword = (token, password) =>
  request(API_ENDPOINTS.auth.resetPassword, {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });

export default {
  login,
  register,
  logout,
  refresh,
  forgotPassword,
  resetPassword,
};
