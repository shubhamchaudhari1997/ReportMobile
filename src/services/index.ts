/**
 * This api will provide axios instance with specific end point with http method and params
 * so we can manage error easly at one place
 *
 * @author Saurabh Jadhav
 */

import axios from 'axios';
import createAxios from './axios';
import {BASE_URL} from './urls';
import getLogingApi from './apis/login';
import getClientApi from './apis/client';

const {instance: clientInstance, ...client} = createAxios(
  BASE_URL.CLIENT,
);

const api = {
  login: getLogingApi(client),
  client: getClientApi(client),
};

const setToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  clientInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`;
};

const getToken = () => {
  return axios.defaults.headers.common['Authorization'];
};

const refreshToken = async () => {};

export {refreshToken, setToken, getToken};

export default api;
