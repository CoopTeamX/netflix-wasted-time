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

    Promise.all(promises)
      .then(results => {
        const totalRuntime = results.reduce((a, b) => a + b.totalRuntime, 0);
        console.log(`total runtime: ${totalRuntime}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  // getData determines if the given title corresponds to a movie or a tv show and
  // returns title, runtime and poster
  static getData(title, nWatch) {
    // by default, it checks if a movie exists with the given title first.
    let firstPromise = MovieProcessor.getMovie(title);
    let secondPromise = TVShowProcessor.getTVShow(title);
    if (nWatch > 1) {
      firstPromise = TVShowProcessor.getTVShow(title);
      secondPromise = MovieProcessor.getMovie(title);
    }

    return firstPromise
      .then(media => {
        if (media !== undefined) {
          return Promise.resolve({
            title: media.title,
            totalRuntime:
              media.runtime !== undefined ? media.runtime * nWatch : 0,
            posterPath: media.posterPath,
            type: media.type
          });
        }

        return secondPromise.then(media => {
          if (media !== undefined) {
            return Promise.resolve({
              title: media.title,
              totalRuntime:
                media.runtime !== undefined ? media.runtime * nWatch : 0,
              posterPath: media.posterPath,
              type: media.type
            });
          }

          console.log(`media not found: ${title}`);
          return Promise.resolve({
            title: "",
            totalRuntime: 0,
            posterPath: ""
          });
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
