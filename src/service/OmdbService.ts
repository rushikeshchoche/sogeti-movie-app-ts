import axios from 'axios';
import { getEnvironment } from '../utils/config';
import { Movie, MovieSearchResults, Plot } from '../type/Movie';
import { ServerError } from '../type/ServerError';
import { handleError } from '../utils/helper';

const OmdbApiUrl = `${getEnvironment.apiBaseUrl}`;

export const searchMoviesByTitle = async (
  title: string
): Promise<MovieSearchResults | ServerError> => {
  try {
    const response = await axios.get<MovieSearchResults>(`${OmdbApiUrl}`, {
      params: {
        s: title,
        apiKey: getEnvironment.apiKey,
      },
    });
    if (response.data.Error) {
      throw response.data.Error;
    }
    return response.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const searchMovieById = async (
  imdbId: string,
  plot: Plot = 'full'
): Promise<Movie | ServerError> => {
  try {
    const response = await axios.get<Movie>(`${OmdbApiUrl}`, {
      params: {
        i: imdbId,
        plot,
        apiKey: getEnvironment.apiKey,
      },
    });
    return response.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};
