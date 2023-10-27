import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const MovieItem = ({ id, title, name, poster_path, location }) => {
  return (
    <li className='h-full w-full p-1 rounded-lg border-black shadow-md shadow-blue-500 transition-transform hover:scale-[1.02]'>
      <Link to={`/movies/${id}`} state={{ from: location }} className='h-full w-full'>
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt={`${title ?? name}`}
            className='rounded-xl object-cover'
          />
        )}
        <p>{title ?? name}</p>
      </Link>
    </li>
  );
};

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  poster_path: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};
