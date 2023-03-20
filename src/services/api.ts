import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const api = axios.create({
    baseURL: 'http://crosslife-hml.jctechservices.net/api',
    headers,
});
