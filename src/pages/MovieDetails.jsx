import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { Outlet, NavLink, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieById } from '../Api/Api';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';

const MoreLink = styled(NavLink)`
  &:hover,
  :focus {
    color: orange;
    text-decoration: underline;
  }
  &.active {
    color: orange;
  }
`;

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

  const { poster_path, original_title, vote_average, overview, genres, release_date } =
    movieDetails;

  return (
    <main>
      <NavLink to={refLocation.current} className='px-3 hover:underline hover:text-orange-300'>
        Go back
      </NavLink>
      {load && <Loader />}
      {error && <Error textError={'Movie has not founded. Please, choose another movie'} />}

      {isMovieDetailsEmpty && (
        <>
          <div className='px-3 pb-3 flex'>
            <div className='w-2/3'>
              <h2 className='text-xl py-6'>
                {original_title} ({release_date.split('-')[0]})
              </h2>
              <p>
                User Score: <span> {vote_average?.toFixed(2)} %</span>
              </p>
              <h3>Overview</h3>
              <p className='text-xs pr-6'>{overview}</p>
              <h3>Genres</h3>
              <ul className='flex gap-1'>
                {genres?.map(({ id, name }) => (
                  <li key={id} className='text-xs flex'>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-1/3'>
              {poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                  alt={`${original_title}`}
                  className='rounded-lg'
                />
              )}
            </div>
          </div>
          <div className='px-3 pb-3 border-[#3f51b5] border-y-2 shadow shadow-blue-500'>
            <h3 className='text-lg'>Additional information</h3>

            <MoreLink to={`cast`} className='mr-3'>
              Cast
            </MoreLink>
            <MoreLink to={`reviews`}>Reviews</MoreLink>
          </div>
        </>
      )}

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetails;
