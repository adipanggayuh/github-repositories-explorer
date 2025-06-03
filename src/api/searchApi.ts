import apiClient from './apiClient';
import { SEARCH_USER_URL } from '../constants/apiEndPoint';

const getUserByName = (name:string) => {
  return apiClient.get(`${SEARCH_USER_URL}?q=${name}`);
};

export { getUserByName };
