import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://crosslife-hml.jctechservices.net/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
