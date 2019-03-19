/* eslint-disable no-console, no-process-exit */
const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';

async function getMoviesList (actor) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);

    console.log(`🍿 ${movies.length} movies found.`);

    return movies
  } 
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = getMoviesList(DENZEL_IMDB_ID);
