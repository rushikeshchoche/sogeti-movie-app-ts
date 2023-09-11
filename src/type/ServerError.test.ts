import { describe, expect, it } from 'vitest';
import { ServerError, isServerError } from '../type/ServerError';

describe('ServerError', () => {
  const stubError: ServerError = {
    errorMessage: 'Bad request',
  };

  describe('isServerError()', () => {
    it('should return true for valid server error', () => {
      const serverError = isServerError(stubError);
      expect(serverError).toBe(true);
    });

    it('should return false for invaid error', () => {
      const serverError = isServerError('Not a server error');
      expect(serverError).toBe(false);
    });
  });
});
