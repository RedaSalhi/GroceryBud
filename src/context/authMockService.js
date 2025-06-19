import AsyncStorage from '../services/storage/AsyncStorage.js';
import { generateUUID } from '../utils/helpers.js';

const USERS_KEY = 'MOCK_USERS_DB';

export const getMockUsers = async () => {
  const users = await AsyncStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const forgotPasswordRequest = async (email) => {
  const users = await getMockUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    return { success: false, message: 'No account found with that email.' };
  }
  const token = generateUUID();
  await AsyncStorage.setItem(`RESET_TOKEN_${email}`, token);
  return { success: true, message: 'Password reset email sent.', token };
};

export const resetPasswordRequest = async (email, newPassword) => {
  const tokenKey = `RESET_TOKEN_${email}`;
  const storedToken = await AsyncStorage.getItem(tokenKey);
  if (!storedToken) {
    return { success: false, message: 'Invalid or expired reset request.' };
  }
  const users = await getMockUsers();
  const index = users.findIndex(u => u.email === email);
  if (index === -1) {
    return { success: false, message: 'No account found with that email.' };
  }
  users[index].password = newPassword;
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  await AsyncStorage.removeItem(tokenKey);
  return { success: true, message: 'Password has been reset.' };
};

export default { getMockUsers, forgotPasswordRequest, resetPasswordRequest };
