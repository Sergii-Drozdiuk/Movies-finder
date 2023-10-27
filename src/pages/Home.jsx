import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovies } from '../Api/Api';
import { MoviesList } from '../components/MoviesList';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getTrendingMovies() {
      try {
        setLoad(true);
        setError(false);
        const resp = await getMovies(controller.signal);
        setMovies(resp);
        setLoad(false);
      } catch (error) {
        if (error && error.message !== 'canceled') {
          setLoad(false);
          setError(true);
        }
      }
    }

    getTrendingMovies();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main>
      <h2 className='text-lg text-center pb-3'>Trending today</h2>
      {load && <Loader />}
      {error && <Error errorText={'Something went wrong. Please, try reloading the page.'} />}
      {movies.length !== 0 && <MoviesList moviesList={movies} location={location} />}
    </main>
  );
};

export default Home;
