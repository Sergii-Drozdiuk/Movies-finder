import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const MoviesList = ({ moviesList, location }) => {
  return (
    <>
      <ul className='mx-auto grid grid-cols-2 gap-6 p-4 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7'>
        {moviesList.map(({ id, title, name, poster_path, release_date }) => (
          <li
            key={id}
            className='h-full w-full rounded-lg border-black p-1 shadow-md shadow-blue-500 transition-transform hover:scale-[1.02]'
          >
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                  alt={title ?? name}
                  className='rounded-xl object-cover pb-1'
                />
              )}
              <h3 className='text-xs'>
                {title ?? name} ({release_date.split('-')[0]})
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

MoviesList.propTypes = {
  location: PropTypes.object.isRequired,
  moviesList: PropTypes.array.isRequired,
};
