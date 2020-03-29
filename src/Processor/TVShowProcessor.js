import axios from "axios";

import { TMDB } from "../config";


class TVShowProcessor {
  // getTVShow calls the tmdb api to get informations
  // about the given title if a tv show with this name exists.
  // Else, it returns undefined.
  static getTVShow(title) {
    return axios
      .request({
        baseURL: `${TMDB.API_URL}`,
        url: `/search/tv?api_key=${TMDB.API_KEY}&query=${encodeURIComponent(
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
        return TVShowProcessor.getTVShowRuntime(result.id)
          .then(runtime => {
            return {
              title: result.name,
              posterPath: result.poster_path,
              runtime,
            };
          })
          .catch(err => {
            return Promise.reject(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // getTVShowRuntime gets details about a tv show corresponding
  // to the given id and return its runtime.
  static getTVShowRuntime(id) {
    return axios
      .request({
        baseURL: `${TMDB.API_URL}`,
        url: `/tv/${id}?api_key=${TMDB.API_KEY}`,
        responseType: "json"
      })
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }

        const { data } = response;
        if (data.episode_run_time === undefined) {
          return Promise.resolve(undefined);
        }

        // computes the average of an episode runtime
        const sum = data.episode_run_time.reduce((a,b) => a+b, 0)
        return Promise.resolve(sum/data.episode_run_time.length);
      })
      .catch(err => {
        Promise.reject(err);
      });
  }
}

export default TVShowProcessor;