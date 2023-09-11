import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { OmdbProvider } from './provider/OmdbProvider/OmdbProvider'
import { FullLayout } from './components/layout/FullLayout/FullLayout';
import { MovieInfoComponent } from './components/MovieInfo/MovieInfo';
import { NotFound } from './components/NotFound/NotFound';
import { Home } from './components/Home/Home';
import { Path } from './type/Path';
import './App.scss';

function App() {
  return (
  <BrowserRouter>
    <OmdbProvider>
      <Routes>
        <Route path={Path.default} element={<FullLayout />}>
          <Route index element={<Home />} />
          <Route path={Path.movieInfo} element={<MovieInfoComponent />} />
          <Route path={Path.notFound} element={<NotFound />} />
        </Route>
      </Routes>
    </OmdbProvider>
  </BrowserRouter>
  )
}

export default App
