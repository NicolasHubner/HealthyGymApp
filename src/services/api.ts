import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const api = axios.create({
    baseURL: 'http://crosslife-hml.jctechservices.net/api',
    headers,
});

export const ApiFile = axios.create({
    baseURL: 'http://crosslife-hml.jctechservices.net/api',
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
    },
});
