import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PiUserFocusThin } from 'react-icons/pi';
import { getMovieCast } from '../Api/Api';
import { Loader } from './Loader';
import { Error } from './Error';

const Cast = () => {
  const [castMovies, setCastMovies] = useState(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const getCastForMovie = async () => {
      try {
        setLoad(true);
        setError(false);
        const response = await getMovieCast(id, controller.signal);
        setCastMovies(response);
        setLoad(false);
      } catch (error) {
        if (error && error.message !== 'canceled') {
          setLoad(false);
          setError(true);
        }
      }
    };
    getCastForMovie();

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <>
      {load && <Loader />}
      {error && <Error textError={'Something went wrong. Please, try reloading the page.'} />}
      {castMovies && Boolean(castMovies.length) && (
        <ul className='mx-auto grid grid-cols-3 gap-2 p-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8'>
          {castMovies?.map(({ credit_id, profile_path, name, character }) => (
            <li key={credit_id} className='flex flex-col justify-between px-1 pb-1'>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300/${profile_path}`}
                  alt={name}
                  className='rounded-lg'
                />
              ) : (
                <PiUserFocusThin style={{ width: '100%', height: 'auto' }} />
              )}
              <div>
                <p className='text-xs'>Name: {name}</p>
                <p className='text-xs'>Character: {character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {castMovies && !castMovies.length && <p>Sorry, no cast information available at this time</p>}
    </>
  );
};

export default Cast;
