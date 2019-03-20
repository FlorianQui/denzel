var express = require('express');
var app = express();

var moviesRoutes = require('./src/routes/movies_routes')

const graphqlHTTP = require('express-graphql');
const {GraphQLSchema} = require('graphql');

const { queryType } = require('./src/query/movies_query');
const { reviewQueryType } = require('./src/query/review_query');

const schema = new GraphQLSchema({ query: queryType });

const PORT = 9293;

app.use('/movies', moviesRoutes);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})