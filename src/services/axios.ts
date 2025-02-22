import axios, {AxiosError, AxiosRequestConfig} from 'axios';

const createAxios = (URL: string) => {
  const instance = axios.create({
    baseURL: `${URL}/api/`,
    headers: {
      'Content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
  });

  instance.interceptors.request.use(
    function (config) {
      //   console.log('request sent', config);
      return config;
    },
    function (error) {
      //   console.log('request sent error', error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      //   console.log(' interceptor response', response);
      return response;
    },

    async function (error: AxiosError) {
      console.log(error.response, 'error in axios response');
      return error.response;
    },
  );

  return {
    get: (config: AxiosRequestConfig) =>
      instance({
        method: 'GET',
        ...config,
        transformResponse: [
          data => {
            if (!data) {
              return {};
            }
            const json = JSON.parse(data);
            return json;
          },
        ],
      }),
    post: (config: AxiosRequestConfig) =>
      instance({
        method: 'POST',
        ...config,
        transformResponse: [
          data => {
            if (!data) {
              return {};
            }

            const json = JSON.parse(data);
            return json;
          },
        ],
      }),
    put: (config: AxiosRequestConfig) =>
      instance({
        method: 'PUT',
        ...config,
        transformResponse: [
          data => {
            if (!data) {
              return {};
            }

            const json = JSON.parse(data);

            return json;
          },
        ],
      }),
    instance,
  };
};

export default createAxios;
