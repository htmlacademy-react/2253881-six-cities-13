import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

import { getToken } from './token';
import { BASE_BACKEND_URL, REQUEST_TIMEOUT } from '../consts';
import { IOffer } from '../types/offers';

interface IDetailMessageType {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<IDetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;

        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};

export const getRandomElemsFromArr = (arr: Array<IOffer>, count: number) => {
  const result: Array<IOffer> = [];

  while (result.length < count) {
    const current = arr[Math.floor(Math.random() * arr.length)];

    if (!result.some((el) => el.id === current.id)) {
      result.push(current);
    }
  }

  return result;
};
