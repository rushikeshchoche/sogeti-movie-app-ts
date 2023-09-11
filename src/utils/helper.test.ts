import { afterEach, describe, expect, it, vi } from 'vitest';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ServerError } from '../type/ServerError';
import { convertStringToArray, handleError } from './helper';
import { DEFAULT_ERROR_MSG } from './constants';

vi.mock('axios');

describe('helper', () => {
  const stubError: ServerError = {
    errorMessage: 'Bad request',
  };

  const response: AxiosResponse = {
    data: stubError,
    status: 500,
  } as AxiosResponse;

  const axiosError = {
    config: {},
    request: {},
    response,
  } as AxiosError<ServerError>;

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  describe('handleError()', () => {
    it('should return ServerError', () => {
      vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
      const serverError = handleError(axiosError);
      expect(axios.isAxiosError).toHaveBeenCalledWith(axiosError);
      expect(serverError).toEqual(stubError);
    });

    it('should return default error', () => {
      vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);
      const serverError = handleError(axiosError);
      expect(axios.isAxiosError).toHaveBeenCalledWith(axiosError);
      expect(serverError).toEqual({
        errorMessage: DEFAULT_ERROR_MSG,
      });
    });

    it('should return default error', () => {
      vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);
      const serverError = handleError('Too many results');
      expect(serverError).toEqual({
        errorMessage: 'Too many results',
      });
    });
  });

  describe('convertStringToArray', () => {
    it('should return converted array', () => {
      const arr = convertStringToArray('Action, Adventure, Comedy');
      expect(arr).toEqual(['Action', 'Adventure', 'Comedy']);
    });

    it('should return blank array', () => {
      const arr = convertStringToArray('');
      expect(arr).toEqual([]);
    });
  });
});
