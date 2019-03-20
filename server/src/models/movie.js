var mongoose = require('mongoose');
var Schema = mongoose.Schema

var movieSchema = new Schema({
    link: String,
    id: String,
    metascore: Number,
    poster: String,
    rating: Number,
    synopsis: String,
    title: String,
    votes: Number,
    year: Number
});

module.exports = mongoose.model('Movie', movieSchema, 'movies');