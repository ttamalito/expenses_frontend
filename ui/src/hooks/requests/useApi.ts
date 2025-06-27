import { AxiosError } from 'axios';
import useAxiosInstance from './useAxiosInstance.ts';
import { useCallback } from 'react';
import useInstanceForLogin from './useInstanceForLogin.ts';

const useApi = () => {
  const { instance } = useAxiosInstance();
  const { loginInstance } = useInstanceForLogin();

  /**
   * This function makes a GET request to the API
   * @param endpoint The 'partial' URL of the endpoint
   * @param params The URLSearchParams object to send in the request
   * @param accept The Accept header to send in the request, defaults to 'application/json'
   * @param responseType The response type to expect, defaults to 'json'
   */
  const get = useCallback(
    async function (
      endpoint: string,
      params?: URLSearchParams,
      accept?: string,
      responseType?:
        | 'json'
        | 'text'
        | 'blob'
        | 'arraybuffer'
        | 'document'
        | 'stream',
    ) {
      try {
        const response = await instance.get(endpoint, {
          params: params,
          headers: {
            Accept: accept || 'application/json',
          },
          responseType: responseType || 'json',
        });

        return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        return Promise.reject(axiosError);
      }
    },
    [instance],
  );

  /**
   * This function makes a POST request to the API
   * @param endpoint The 'partial' URL of the endpoint
   * @param data The data to send in the request body
   * @param params The URLSearchParams object to send in the request
   * @param accept The Accept header to send in the request, defaults to 'application/json'
   * @param contentType The Content-Type header to send in the request, defaults to 'application/json'
   * @param responseType The response type to expect, defaults to 'json'
   */
  const post = useCallback(
    async function (
      endpoint: string,
      data: any,
      params?: URLSearchParams,
      accept?: string,
      contentType?: string,
      responseType?:
        | 'json'
        | 'text'
        | 'blob'
        | 'arraybuffer'
        | 'document'
        | 'stream',
    ) {
      try {
        const response = await instance.post(endpoint, data, {
          params: params,
          headers: {
            Accept: accept || 'application/json',
            'Content-Type': contentType || 'application/json',
          },
          responseType: responseType || 'json',
        });

        return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        return Promise.reject(axiosError);
      }
    },
    [instance],
  );

  /**
   * This function makes a PUT request to the API
   * @param endpoint The 'partial' URL of the endpoint
   * @param data The data to send in the request body
   * @param params The URLSearchParams object to send in the request
   * @param accept The Accept header to send in the request, defaults to 'application/json'
   * @param contentType The Content-Type header to send in the request, defaults to 'application/json'
   * @param responseType The response type to expect, defaults to 'json'
   */
  const put = useCallback(
    async function (
      endpoint: string,
      data: any,
      params?: URLSearchParams,
      accept?: string,
      contentType?: string,
      responseType?:
        | 'json'
        | 'text'
        | 'blob'
        | 'arraybuffer'
        | 'document'
        | 'stream',
    ) {
      try {
        const response = await instance.put(endpoint, data, {
          params: params,
          headers: {
            Accept: accept || 'application/json',
            'Content-Type': contentType || 'application/json',
          },
          responseType: responseType || 'json',
        });

        return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        return Promise.reject(axiosError);
      }
    },
    [instance],
  );

  /**
   * This function makes a DELETE request to the API
   * @param endpoint The 'partial' URL of the endpoint
   * @param data The data to send in the request body
   * @param params The URLSearchParams object to send in the request
   * @param accept The Accept header to send in the request, defaults to 'application/json'
   * @param contentType The Content-Type header to send in the request, defaults to 'application/json'
   * @param responseType The response type to expect, defaults to 'json'
   */
  const Delete = useCallback(
    async function (
      endpoint: string,
      accept?: string,
      params?: URLSearchParams,
      responseType?:
        | 'json'
        | 'text'
        | 'blob'
        | 'arraybuffer'
        | 'document'
        | 'stream',
    ) {
      try {
        const response = await instance.delete(endpoint, {
          params: params,
          headers: {
            Accept: accept || 'application/json',
          },
          responseType: responseType || 'json',
        });

        return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        return Promise.reject(axiosError);
      }
    },
    [instance],
  );

  /**
   * This function makes a POST request to the API
   * This should only be used for login requests, since the instance does not have the interceptor
   * @param endpoint The 'partial' URL of the endpoint
   * @param data The data to send in the request body
   * @param params The URLSearchParams object to send in the request
   * @param accept The Accept header to send in the request, defaults to 'application/json'
   * @param contentType The Content-Type header to send in the request, defaults to 'application/json'
   * @param responseType The response type to expect, defaults to 'json'
   */
  const postLogin = useCallback(
    async function (
      endpoint: string,
      data: any,
      params?: URLSearchParams,
      accept?: string,
      contentType?: string,
      responseType?:
        | 'json'
        | 'text'
        | 'blob'
        | 'arraybuffer'
        | 'document'
        | 'stream',
    ) {
      try {
        const response = await loginInstance.post(endpoint, data, {
          params: params,
          headers: {
            Accept: accept || 'application/json',
            'Content-Type': contentType || 'application/json',
          },
          responseType: responseType || 'json',
        });

        return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        return Promise.reject(axiosError);
      }
    },
    [loginInstance],
  );

  return { get, post, put, Delete, postLogin };
};

export default useApi;
