import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getMovieByQuery } from '../Api/Api';
import { Error } from '../components/Error';
import { Loader } from '../components/Loader';
import { MoviesList } from '../components/MoviesList';
import { Search } from '../components/Search';

const Movies = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) {
      return;
    }

    const controller = new AbortController();
    const getMovies = async () => {
      try {
        setLoad(true);
        setError(false);
        const response = await getMovieByQuery(query, controller.signal);
        setMovies(response);
        setLoad(false);
      } catch (error) {
        if (error && error.message !== 'canceled') {
          setLoad(false);
          setError(true);
        }
      }
    };

    getMovies();

    return () => {
      controller.abort();
    };
  }, [searchParams]);

  return (
    <main>
      <Search getQuery={setSearchParams} />
      {load && <Loader />}
      {error && <Error textError={'Something went wrong. Please, try reloading the page.'} />}
      {movies.length !== 0 && <MoviesList moviesList={movies} location={location} />}
      {movies && !movies.length && searchParams.get('query') && (
        <p className='mt-3 text-center'>
          Sorry, but no results were found for your query. Try changing your search query.
        </p>
      )}
    </main>
  );
};

export default Movies;
