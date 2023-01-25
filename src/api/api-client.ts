import axios from 'axios';
import { isEqual } from 'lodash';

const baseURL = 'https://run-backend.com/api/';
const version = 'v1';

export const api = axios.create({
  baseURL: `${baseURL}${version}`,
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const path = window.location.pathname;
      if (!isEqual(path, '/sign-up/') && !isEqual(path, '/'))
        window.location.href = '/';
    }
    throw error;
  }
);
