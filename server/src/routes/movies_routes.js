var express = require('express')
var router = express.Router();

const { 
    getListMovies,
    saveMovies,
    listMustWatch,
    getRandomMustWatch,
    searchMovie,
    getMovie
} = require('../controllers/movies_controller')

router.get('/', async function (req, res) {
    res.send(await getListMovies())
});

router.get('/populate', async function (req, res) {
    res.send(await saveMovies());
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

router.use('/review', require('../routes/review_routes'));

module.exports = router;