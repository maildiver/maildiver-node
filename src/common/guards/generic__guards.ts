import { ErrorResponse } from '../types';

export const isKnownError = (res: unknown): res is ErrorResponse => {
  if (typeof res !== 'object' || res === null) {
    return false;
  }

  const error = res as ErrorResponse;

  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const { message, code } = error;

  if (typeof message !== 'string' || typeof code !== 'string') {
    return false;
  }

  return true;
};
