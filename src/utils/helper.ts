import axios, { AxiosError } from 'axios';
import { ServerError } from '../type/ServerError';
import { DEFAULT_ERROR_MSG } from './constants';

export const handleError = (error: unknown): ServerError => {
  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<ServerError>;
    if (serverError && serverError.response) {
      return serverError.response.data;
    }
  }
  return {
    errorMessage: typeof error === 'string' ? error : DEFAULT_ERROR_MSG,
  };
};

export const convertStringToArray = (str: string, char = ','): string[] => {
  if (!str) return [];
  return str.split(char).map((item) => item.trim());
};
