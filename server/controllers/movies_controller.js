var express = require('express')
var router = express.Router();

//MONGODB
var mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost/denzel';
mongoose.connect(mongoURL, { useNewUrlParser: true });
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
        }
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

    let movies = await moviesModel.find({}, (err, res) => {
        if(err) throw err;
        else console.log(`${res.length} movies in list.`);
    });

    return movies;
}

async function getMovie(id) {
    console.log('Getting movie details...');
    console.log(id);

    let movie = await moviesModel.find({
        "id": id
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
    }, (err, res) => {
        if(err) throw err;
        else console.log(res.length + " movies found.");
    }).limit(limit);

    return result;
};

async function reviewMovie(date, review, movie_id) {
    console.log(`${date}, ${review}, ${movie_id}`);
};

router.get('/', async function (req, res) {
    res.send(await getListMovies())
});

router.get('/populate', async function (req, res) {
    res.send(await saveMovies())
});

router.get('/must_watch', async function (req, res) {
    res.send(await listMustWatch())
});

router.get('/discover', async function (req, res) {
    res.send(await getRandomMustWatch());
});

router.get('/search', async function (req, res) {
    let limit = req.query.limit;
    let metascore = req.query.metascore;

    res.send(await searchMovie( parseInt(limit), parseInt(metascore)));
}),

router.get('/:id', async function (req, res) {
    let id = req.params.id;

    console.log(`Getting details of movie ${ id }`);

    res.send(await getMovie( id ));
});

router.use('/review', require('./review_controller'));

module.exports = router;

