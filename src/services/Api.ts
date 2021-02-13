import axios, { AxiosRequestConfig as LibAxiosRequestConfig } from 'axios';

export interface AxiosRequestConfig extends LibAxiosRequestConfig {}

export const request = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  request,
};
