import axios from "axios";

import { TMDB } from "../config";

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
              runtime,
              type: "movie",
            });
          })
          .catch(err => {
            return Promise.reject(err);
          });
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  // getMovieRuntime get details about a movie corresponding
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
        Promise.reject(err);
      });
  }
}

export default MovieProcessor;