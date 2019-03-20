var mongoose = require('mongoose');
var Schema = mongoose.Schema

var reviewSchema = new Schema({
    username: String,
    date: Date,
    review: String,
    movie_id: String
});

module.exports = mongoose.model('Review', reviewSchema, 'review');