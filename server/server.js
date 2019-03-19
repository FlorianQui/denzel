var express = require('express');
var app = express();

var moviesController = require('./controllers/movies_controller')

var { getListMovies, getMovie, saveMovies, listMustWatch } = moviesController;



const PORT = 9293;

app.use('/movies', require('./controllers/movies_controller'));
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})