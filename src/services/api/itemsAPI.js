import request from './client';
import { API_ENDPOINTS } from '../../utils/constants';

export const getItems = () => request(API_ENDPOINTS.items.getAll);

export const createItem = (data) =>
  request(API_ENDPOINTS.items.create, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateItem = (id, data) =>
  request(API_ENDPOINTS.items.update.replace(':id', id), {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteItem = (id) =>
  request(API_ENDPOINTS.items.delete.replace(':id', id), { method: 'DELETE' });

export const toggleItem = (id) =>
  request(API_ENDPOINTS.items.toggle.replace(':id', id), { method: 'PATCH' });

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  toggleItem,
};
