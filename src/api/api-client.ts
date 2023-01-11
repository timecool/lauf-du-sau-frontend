import axios from 'axios';

const baseURL = 'http://localhost:8080/api/';
const version = 'v1';

export const api = axios.create({
  baseURL: `${baseURL}${version}`,
  withCredentials: true,
});
