import axios from "axios";

import { TMDB, TYPE } from "../config";

class MovieProcessor {
  // getMovie calls the tmdb api to get informations
  // about the given title if a movie with this name exists.
  // Else, it returns undefined.
  static getMovie(title) {
    return axios
      .request({
        baseURL: `${TMDB.API_URL}`,
        url: `/search/movie?api_key=${TMDB.API_KEY}&query=${encodeURIComponent(
          title
        )}`,
        responseType: "json"
      })
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }

        const { data } = response;
        if (data.total_results === 0) {
          return Promise.resolve(undefined);
        }

        // gets runtime and image
        const result = data.results[0];
        return MovieProcessor.getMovieRuntime(result.id)
          .then(runtime => {
            return Promise.resolve({
              title: result.title,
              posterPath: result.poster_path,
              runtime: runtime !== undefined && runtime !== null ? runtime : 0,
              type: TYPE.MOVIE,
              genreIDs: result.genre_ids !== undefined ? result.genre_ids : []
            });
          })
          .catch(err => {
            console.error(err);
            return Promise.resolve({
              title: result.title,
              posterPath: result.poster_path,
              runtime: 0,
              type: TYPE.MOVIE,
              genreIDs: result.genre_ids !== undefined ? result.genre_ids : []
            });
          });
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  // getMovieRuntime gets details about a movie corresponding
  // to the given id and return its runtime.
  static getMovieRuntime(id) {
    return axios
      .request({
        baseURL: `${TMDB.API_URL}`,
        url: `/movie/${id}?api_key=${TMDB.API_KEY}`,
        responseType: "json"
      })
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }

        const { data } = response;
        return Promise.resolve(data.runtime);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  // getGenres gets movie genres and returns them.
  static getGenres() {
    return axios
      .request({
        baseURL: `${TMDB.API_URL}`,
        url: `/genre/movie/list?api_key=${TMDB.API_KEY}`,
        responseType: "json"
      })
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }

        const { genres } = response.data;
        return Promise.resolve(genres);
      })
      .catch(err => {
        Promise.reject(err);
      });
  }
}

export default MovieProcessor;
