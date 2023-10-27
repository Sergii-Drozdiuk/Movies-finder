import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { Outlet, NavLink, useLocation, useParams } from 'react-router-dom';
import { getMovieById } from '../Api/Api';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';

const MovieDetails = () => {
  const location = useLocation();
  const refLocation = useRef(location.state?.from ?? '/');
  const [movieDetails, setMovieDetails] = useState({});
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const getDetailsForMovie = async () => {
      try {
        setLoad(true);
        setError(false);
        const response = await getMovieById(id, controller.signal);
        setMovieDetails(response);
        setLoad(false);
      } catch (error) {
        if (error && error.message !== 'canceled') {
          setLoad(false);
          setError(true);
        }
      }
    };

    getDetailsForMovie();

    return () => {
      controller.abort();
    };
  }, [id]);

  const isMovieDetailsEmpty = useMemo(
    () => Boolean(Object.keys(movieDetails).length),
    [movieDetails]
  );

  const { poster_path, original_title, vote_average, overview, genres } = movieDetails;

  return (
    <>
      <NavLink to={refLocation.current} className='hover:underline'>
        {refLocation.current ? <p>Go back</p> : <p>Go home</p>}
      </NavLink>
      {load && <Loader />}
      {error && <Error textError={'Movie has not founded. Please, choose another movie'} />}

      {isMovieDetailsEmpty && (
        <div className='p-3'>
          <div>
            {poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                alt={`${original_title}`}
                className='m-auto rounded-lg'
              />
            )}

            <div>
              <h2 className='m-auto text-lg'>{original_title}</h2>
              <p>
                User Score: <span> {vote_average?.toFixed(2)} %</span>
              </p>
              <h3>Overview</h3>
              <p className='text-xs'>{overview}</p>
              <h3>Genres</h3>
              <ul>
                {genres?.map(({ id, name }) => (
                  <li key={id} className='text-xs'>
                    {' '}
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <div>
              <NavLink to={`cast`}>Cast</NavLink>
              <NavLink to={`reviews`}>Reviews</NavLink>
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
