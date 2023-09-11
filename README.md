# Sogeti Assessment

This is movie app to search movies and view movie details using React for Sogeti Assessment.

## Description

The application can search movies by title using OMDB API. It displays detailed movie info upon clicking on each movie search result card.
Application also shows 'featured movies for today' on HomePage.

## Project Structure

```bash
├── src
│   ├── components
│   │   ├── Card/Card.tsx                 # Displays movie card
│   │   ├── Featured/Featured.txs         # Displays featured movies
│   │   ├── Home/Home.tsx                 # Displays Home component to search movies and display search results
│   │   ├── layout/                       # App layout - header, footer and content
│   │   ├── MovieInfo/MovieInfo.tsx       # Movie info page to display movie details
│   │   ├── NotFound/NotFound/tsx         # Displays Page not found error
│   │   ├── ReadMore/ReadMore.tsx         # Handles read more functionality
│   │   ├── StateHandler/StateHandler.tsx # Displays Home Page with collections
│   ├── utils                             # Contains helper util functions
│   │   ├── config.ts                     # api url config for all envs
│   │   ├── constants.ts                  # constants used in app
│   │   ├── helper.ts                     # helper functions
│   ├── provider                          # Contains provider
│   │   ├── OmdbProvider.tsx              # React context provider which get movie data, error and loading data.
│   ├── service/                          # contains service to search movies using OMDB API
│   ├── styles/                           # contains styles
│   ├── type/                             # data types for Movie, ServerError and Path
│   ├── App.tsx                           # This is the root component of the application
│   ├── main.tsx                          # ReactDOM.render is called
```

## Please follow below commands to run this project :

In this project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm test`

Runs vitest in the interactive watch mode.\

### `npm run coverage`

Runs vitest coverage to display coverage report from istanbul.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
