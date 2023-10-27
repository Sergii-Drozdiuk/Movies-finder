import { MovieItem } from './MovieItem';
import PropTypes from 'prop-types';

export const MoviesList = ({ moviesList, location }) => {
  return (
    <ul className='mx-auto grid grid-cols-2 gap-6 pl-1 pr-4 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7'>
      {moviesList.map(({ id, title, name, poster_path }) => (
        <MovieItem
          key={id}
          id={id}
          title={title}
          name={name}
          poster_path={poster_path}
          location={location}
        />
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  location: PropTypes.object.isRequired,
  moviesList: PropTypes.array.isRequired,
};
