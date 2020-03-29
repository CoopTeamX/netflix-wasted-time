import axios from "axios";

import { TMDB } from "../config";
import TVShowProcessor from "./TVShowProcessor";
import MovieProcessor from "./MovieProcessor";

const imageSizes = {
  w500: "w500",
  original: "original"
};

class Processor {
  // process processes the given rows
  // and return an array containing data about each rows
  static process(rows) {
    const hashTitles = {};
    // builds a hashmap where the key is the media title and the value,
    // the number of times the media has been watched.
    // For a TV show, the number of watched episodes gives the number
    // of time the show has been watched.
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const { Title: title, Date: date } = row;
      if (title !== undefined && date !== undefined) {
        const splitTitle = title.split(":")[0];
        if (hashTitles[splitTitle] === undefined) {
          hashTitles[splitTitle] = 1;
        }

        hashTitles[splitTitle] += 1;
      }
    }

    const promises = Object.keys(hashTitles).map(title => {
      return Processor.getData(title, hashTitles[title]);
    });

    Promise.all(promises).then(results => {});
  }

  // getData determines if the given title corresponds to a movie or a tv show and
  // returns title, runtime and poster
  static getData(title, nWatch) {
    return MovieProcessor.getMovie(title)
      .then(movie => {
        if (movie !== undefined) {
          console.log(
            `movie found: \
            - title: ${movie.title}, \
            - runtime: (${movie.runtime} * ${nWatch}) = ${movie.runtime *
              nWatch}, \
            - poster: ${movie.posterPath}`
          );
          return;
        }

        return TVShowProcessor.getTVShow(title.split(":")[0]).then(show => {
          if (show === undefined) {
            console.log(`show not found: ${title.split(":")[0]}`);
            return;
          }

          console.log(
            `show found: \
            - title: ${show.title}, \
            - runtime: (${show.runtime} * ${nWatch}) = ${show.runtime *
              nWatch}, \
            - poster: ${show.posterPath}`
          );
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // getImage returns the image data of the given poster path.
  static getImage(posterPath, size) {
    if (posterPath === null) {
      return Promise.resolve(undefined);
    }

    return axios
      .request({
        baseURL: `${TMDB.IMAGE_URL}`,
        url: `${size}${posterPath}`
      })
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }

        return Promise.resolve(response.data);
      })
      .catch(err => {
        return Promise.error(err);
      });
  }
}

export default Processor;
