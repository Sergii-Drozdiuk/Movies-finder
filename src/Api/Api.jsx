/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWE0MDc4N2NmNWI5NTExOWI3Y2RkY2RiY2U3ZmM3YiIsInN1YiI6IjY1MzZkMTdhNDA4M2IzMDBlMGYwZjAxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2JaUQGtj0edWG0LjhQAEV3KtYfVeFe7-HMIAZNsh8zQ';

const trending = 'trending/movie/day';
const movie = 'movie/';
const credits = '/credits';
const reviews = '/reviews';
const search = 'search/movie';

export async function getMovies(signal) {
  const response = await axios.get(trending, { signal });
  return response.data.results;
}

export async function getMovieById(id, signal) {
  const response = await axios.get(movie + id, { signal });
  return response.data;
}

export async function getMovieCast(id, signal) {
  const response = await axios.get(movie + id + credits, { signal });
  return response.data.cast;
}

export async function getMovieReviews(id, signal) {
  const response = await axios.get(movie + id + reviews, { signal });
  return response.data;
}

export async function getMovieByQuery(query, signal) {
  const params = {
    query: query,
  };

  const response = await axios.get(search, { params, signal });
  return response.data.results;
}
