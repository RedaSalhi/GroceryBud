import request from './client';
import { API_ENDPOINTS } from '../../utils/constants';

export const getLists = () => request(API_ENDPOINTS.lists.getAll);

export const createList = (data) =>
  request(API_ENDPOINTS.lists.create, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateList = (id, data) =>
  request(API_ENDPOINTS.lists.update.replace(':id', id), {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteList = (id) =>
  request(API_ENDPOINTS.lists.delete.replace(':id', id), { method: 'DELETE' });

export const shareList = (id, data) =>
  request(API_ENDPOINTS.lists.share.replace(':id', id), {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const unshareList = (id, data) =>
  request(API_ENDPOINTS.lists.unshare.replace(':id', id), {
    method: 'POST',
    body: JSON.stringify(data),
  });

export default {
  getLists,
  createList,
  updateList,
  deleteList,
  shareList,
  unshareList,
};
