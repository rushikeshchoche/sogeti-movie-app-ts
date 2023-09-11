export type ServerError = { errorMessage: string };

export const isServerError = (b: unknown): b is ServerError => {
  return (b as ServerError).errorMessage !== undefined;
};
