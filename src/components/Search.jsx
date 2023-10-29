import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const Search = ({ getQuery }) => {
  const { register, handleSubmit } = useForm();
  const [prevQuery, setPrevQuery] = useState('');

  const submitForm = ({ query }) => {
    const searchQuery = query.toLowerCase().trim();
    if (!searchQuery) {
      toast.info('Please enter a search query');
      return;
    }
    if (prevQuery === searchQuery) {
      toast.info('This query has done');
      return;
    }
    setPrevQuery(searchQuery);
    getQuery({ query: searchQuery });
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='flex items-center justify-center gap-3 py-3'
    >
      <input
        {...register('query')}
        autoFocus
        placeholder='Search movies'
        className='border-2 border-[#3f51b5] px-3 rounded-lg'
      />
      <button
        type='submit'
        className='px-1 border-2 border-[#3f51b5] rounded-lg hover:bg-[#3f51b5] hover:text-white'
      >
        Search
      </button>
    </form>
  );
};

Search.propTypes = {
  location: PropTypes.object,
  getQuery: PropTypes.func,
};
