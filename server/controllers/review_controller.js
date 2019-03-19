var express = require('express')
var router = express.Router();

//MONGODB
var mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost/denzel';
mongoose.connect(mongoURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;

//REVIEW
var reviewModel = require('../models/review')

async function reviewMovie(username, date, review, id) {
    let myReview = reviewModel({
        username: username,
        date: date,
        review: review,
        movie_id: id
    });

    await myReview.save((err, res) => {
        if(err) throw err;
        else console.log(`Inserted : ${myReview}`)
    });

    return { "id": myReview.movie_id };
};

async function getReviewsById(id) {
    let reviews = await reviewModel.find({
        "movie_id": id
    },
    (err, res) => {
        if(err) throw err;
        else console.log(`${res.length} reviews found.`);
    });

    return reviews;
}

async function getReviewsByIdAndUsername(id, username) {
    let reviews = await reviewModel.find({
        "movie_id": id,
        "username": username
    },
    (err, res) => {
        if(err) throw err;
        else console.log(`${res.length} reviews found.`);
    });

    return reviews;
}

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