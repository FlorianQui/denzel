//MONGODB
var mongoose = require('mongoose')

const mongoURL = 'mongodb://mongo:27017/denzel';
mongoose.connect(mongoURL, { useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    else console.log("CONNECTED TO DB");
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

//MOVIES
const moviesSandbox = require('../sandbox')
var moviesModel = require('../models/movie')


var movies = [];
var must_watch = [];
var LOADED = false;

async function saveMovies() {
    console.log('Saving movies...');
    
    if( !LOADED  ) await loadMovies();

    var total = await moviesModel.insertMany(movies);

    return { 
        "total": total.length,
        "result": "ok" 
    };
}

async function loadMovies() {
    console.log('Loading movies...');


    movies = await moviesSandbox;
    LOADED = true;
}

async function listMustWatch() {
    console.log('Listing must watch...');

    let result = await moviesModel.find({
        "metascore": {
            $gt:70
        },
    }, {
        "_id": 0,
        "__v": 0 
    }, (err, res) => {
        if(err) throw err;
        else console.log(`${res.length} must watch movies in list.`)
    });

    if ( must_watch.length === 0 ) must_watch = result;

    return result;
}

async function getRandomMustWatch() {
    console.log('Getting a random must watch...');

    if ( must_watch.length === 0 ) await listMustWatch();

    return must_watch[ Math.floor( Math.random() * must_watch.length ) ];
}

async function getListMovies() {
    console.log('Listing all movies...');

    try {
        let movies = await moviesModel.find({},
            {
                "_id": 0,
                "__v": 0 
            },
            (err, res) => {
            if(err) throw err;
            else console.log(`${res.length} movies in list.`);
        });
        return movies;
    } catch (error) {
        throw error;
    }
}

async function getMovie(id) {
    console.log('Getting movie details...');
    console.log(id);

    let movie = await moviesModel.find({
        "id": id
    },{
        "_id": 0,
        "__v": 0 
    },
    (err, res) => {
        if(err) throw err;
        else console.log('Movie found');
    });

    return movie
}

async function searchMovie(limit, metascore) {
    console.log('Searching a movie...');

    let result = await moviesModel.find({
        "metascore": {
            $gte: metascore
        }
    },{
        "_id": 0,
        "__v": 0 
    },
    (err, res) => {
        if(err) throw err;
        else console.log(res.length + " movies found.");
    }).limit(limit);

    return result;
};

async function reviewMovie(date, review, movie_id) {
    console.log(`${date}, ${review}, ${movie_id}`);
};

exports.getListMovies = getListMovies;
exports.saveMovies = saveMovies;
exports.listMustWatch = listMustWatch;
exports.getRandomMustWatch = getRandomMustWatch;
exports.searchMovie = searchMovie;
exports.getMovie = getMovie;

