export const isProduction = process.env.NODE_ENV === 'production';

const ENV = {
  develop: {
    apiBaseUrl: 'https://www.omdbapi.com/',
    apiKey: '6c3a2d45',
  },
  production: {
    apiBaseUrl: 'https://www.omdbapi.com/',
    apiKey: '6c3a2d45',
  },
};

export const getEnvironment = isProduction ? ENV.production : ENV.develop;
