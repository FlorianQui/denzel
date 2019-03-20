//MONGODB
var mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost/denzel';
mongoose.connect(mongoURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;

//REVIEW
var reviewModel = require('../models/review')

async function reviewMovie(user, date, review, id) {
    let myReview = reviewModel({
        username: user,
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
    {
        "_id": 0,
        "__v": 0 
    },
    (err, res) => {
        if(err) throw err;
        else console.log(`${res.length} reviews found.`);
    });

    return reviews;
};

async function getReviewsByIdAndUsername(id, username) {
    let reviews = await reviewModel.find({
        "movie_id": id,
        "username": username
    },{
        "_id": 0,
        "__v": 0 
    },
    (err, res) => {
        if(err) throw err;
        else console.log(`${res.length} reviews found.`);
    });

    return reviews;
};

exports.reviewMovie = reviewMovie;
exports.getReviewsById = getReviewsById;
exports.getReviewsByIdAndUsername = getReviewsByIdAndUsername;