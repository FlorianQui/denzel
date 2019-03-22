var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

var moviesRoutes = require('./src/routes/movies_routes')

const graphqlHTTP = require('express-graphql');
const {GraphQLSchema} = require('graphql');

const { queryType } = require('./src/query/movies_query');
const { reviewQueryType } = require('./src/query/review_query');

const schema = new GraphQLSchema({ query: queryType });

const PORT = 9292;

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use('/movies', moviesRoutes);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: false
}));

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})