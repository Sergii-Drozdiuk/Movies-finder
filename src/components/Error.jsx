import PropTypes from 'prop-types';

export const Error = ({ errorText }) => {
  return <p className='text-lg text-red-500'>{errorText}</p>;
};

Error.propTypes = {
  errorText: PropTypes.string.isRequired,
};
