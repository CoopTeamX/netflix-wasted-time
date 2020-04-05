import axios from "axios";
import moment from "moment";

import { TMDB, TYPE } from "../config";
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
    // builds a hashmap where the key is the media title and the value,
    // the number of times the media has been watched.
    // For a TV show, the number of watched episodes gives the number
    // of time the show has been watched.
    const hashTitles = {};
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const { Title: title, Date: date } = row;
      if (title !== undefined && date !== undefined) {
        const splitTitle = title.split(":")[0];
        if (hashTitles[splitTitle] === undefined) {
          hashTitles[splitTitle] = {
            nWatch: 0,
            dates: []
          };
        }

        hashTitles[splitTitle].nWatch += 1;
        hashTitles[splitTitle].dates.push(date);
      }
    }

    // makes one promise by title
    const promises = Object.keys(hashTitles).map(title => {
      return Processor.getData(
        title,
        hashTitles[title].nWatch,
        hashTitles[title].dates
      );
    });

    // gets movie and tv genres
    promises.push(Processor.getGenres());

    return Promise.all(promises)
      .then(results => {
        const movies = results
          .filter(result => result.type === TYPE.MOVIE)
          .sort((a, b) => b.totalRuntime - a.totalRuntime);
        const tvShows = results
          .filter(result => result.type === TYPE.TVSHOW)
          .sort((a, b) => b.totalRuntime - a.totalRuntime);

        // isolates genres
        const genres = results.splice(-1, 1)[0];
        const resume = {
          runtimes: {
            total: results.reduce((a, b) => a + b.totalRuntime, 0),
            tvShows: Processor.reduceRuntimeByType(results, TYPE.TVSHOW),
            movies: Processor.reduceRuntimeByType(results, TYPE.MOVIE)
          },
          movies,
          tvShows,
          genres: Processor.hashRuntimeByGenre(results, genres),
          nMovies: movies.length,
          nTvShows: tvShows.length,
          nEpisodes: tvShows.reduce((a, b) => a + b.nWatch, 0),
          dates: Processor.hashRuntimeByDate(results)
        };

        return resume;
        // console.log(`resume: ${JSON.stringify(resume, undefined, "  ")}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  // getData determines if the given title corresponds to a movie or a tv show and
  // returns title, runtime and poster
  static getData(title, nWatch, dates) {
    let firstPromise;
    let secondPromise;
    // If the number of viewing times is greater than 1, it assumes that it is looking for a tvshows.
    // If no tvshow is found, then it checks de movie dataset.
    // If the number of viewing times is equal to 1, it executes the opposite process.
    if (nWatch > 1) {
      firstPromise = TVShowProcessor.getTVShow(title);
      secondPromise = MovieProcessor.getMovie(title);
    } else {
      firstPromise = MovieProcessor.getMovie(title);
      secondPromise = TVShowProcessor.getTVShow(title);
    }

    return firstPromise
      .then(media => {
        if (media !== undefined) {
          return Promise.resolve({
            title: media.title,
            totalRuntime:
              media.runtime !== undefined ? media.runtime * nWatch : 0,
            runtime: media.runtime,
            posterPath: media.posterPath,
            type: media.type,
            genreIDs: media.genreIDs,
            nWatch,
            dates
          });
        }

        return secondPromise.then(media => {
          if (media !== undefined) {
            return Promise.resolve({
              title: media.title,
              totalRuntime:
                media.runtime !== undefined ? media.runtime * nWatch : 0,
              runtime: media.runtime,
              posterPath: media.posterPath,
              type: media.type,
              genreIDs: media.genreIDs,
              nWatch,
              dates
            });
          }

          console.log(`media not found: ${title}`);
          return Promise.resolve({
            title: "",
            totalRuntime: 0,
            runtime: 0,
            posterPath: "",
            type: TYPE.UNKNOWN,
            genreIDs: [],
            nWatch,
            dates
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  static getGenres() {
    return Promise.all([
      MovieProcessor.getGenres(),
      TVShowProcessor.getGenres()
    ])
      .then(genres => {
        return Promise.resolve(genres[0].concat(genres[1]));
      })
      .catch(err => {
        return Promise.reject(err);
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

  // reduceRuntimeByType filters the array of medias by type
  // and returns its reduced value.
  static reduceRuntimeByType(medias, type) {
    return medias.reduce(
      (a, b) => (b.type === type ? a + b.totalRuntime : a),
      0
    );
  }

  // hashRuntimeByGenre hashes the array of medias to a hashmap `{ genreName: totalRuntime }`
  // and returns an array of objects sorted by runtime.
  static hashRuntimeByGenre(medias, genres) {
    const runtimesByGenre = {};
    for (let i = 0; i < medias.length; i += 1) {
      const media = medias[i];
      for (let j = 0; j < media.genreIDs.length; j += 1) {
        const genreID = media.genreIDs[j];

        // gets human-readable name
        const genre = genres.find(g => g.id === parseInt(genreID, 10));
        if (runtimesByGenre[genre.name] === undefined) {
          runtimesByGenre[genre.name] = 0;
        }

        runtimesByGenre[genre.name] += media.totalRuntime;
      }
    }

    // converts to an array of objects
    const runtimes = Object.keys(runtimesByGenre).map(genre => {
      return { genre, runtime: runtimesByGenre[genre] };
    });

    // sorts by runtime: biggest runtimes first
    runtimes.sort((a, b) => b.runtime - a.runtime);
    return runtimes;
  }

  // hashRuntimeByDate hashes given medias by the weekday when they have been watched.
  // It returns an array mapping this hashmap where the value is the average of watching time by weekday.
  static hashRuntimeByDate(medias) {
    const hashDates = {};
    for (let i = 0; i < medias.length; i += 1) {
      const media = medias[i];
      for (let j = 0; j < media.dates.length; j += 1) {
        const date = media.dates[j];
        const weekDay = moment(date, "DD/MM/YYYY").isoWeekday();
        if (hashDates[weekDay] === undefined && media.runtime !== undefined) {
          hashDates[weekDay] = {
            runtime: media.runtime,
            counter: 1
          };
        } else if (media.runtime !== undefined) {
          hashDates[weekDay].runtime += media.runtime;
          hashDates[weekDay].counter += 1;
        }
      }
    }

    return Object.keys(hashDates).map(
      day => hashDates[day].runtime / hashDates[day].counter
    );
  }
}

export default Processor;
