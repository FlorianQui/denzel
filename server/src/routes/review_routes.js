var express = require('express')
var router = express.Router();

const { 
    reviewMovie,
    getReviewsById,
    getReviewsByIdAndUsername
} = require('../controllers/review_controller');

router.post('/:id', async function (req, res) {
    let id = req.params.id;
    let username = req.query.username;
    let date = req.query.date;
    let review = req.query.review;

    res.send( await reviewMovie(username, date, review, id) );
});

router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let username = req.query.username;

    if (username) res.send( await getReviewsByIdAndUsername(id, username));

    else res.send(await getReviewsById( id ));
});

module.exports = router;