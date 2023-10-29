import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../Api/Api';
import { Loader } from './Loader';
import { Error } from './Error';

const Reviews = () => {
  const [reviewsMovies, setReviewsMovies] = useState(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const getReviewsForMovie = async () => {
      try {
        setLoad(true);
        setError(false);
        const response = await getMovieReviews(id, controller.signal);
        setReviewsMovies(response.results);
        setLoad(false);
      } catch (error) {
        if (error && error.message !== 'canceled') {
          setLoad(false);
          setError(true);
        }
      }
    };
    getReviewsForMovie();
    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <>
      {load && <Loader />}
      {error && <Error textError={'Review has not founded'} />}
      <ul>
        {reviewsMovies &&
          Boolean(reviewsMovies.length) &&
          reviewsMovies?.map(({ id, author, content }) => (
            <li key={id} className='px-3 pb-3'>
              <h4 className='text-xm mb-1'>{author}</h4>
              <p className='text-xs'>{content}</p>
            </li>
          ))}
        {reviewsMovies && !reviewsMovies.length && (
          <p className='px-3 pb-3'>Sorry, but we did not find any reviews</p>
        )}
      </ul>
    </>
  );
};

export default Reviews;
