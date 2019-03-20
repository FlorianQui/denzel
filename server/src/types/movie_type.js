const {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLString,
    GraphQLInt
} = require('graphql');

movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        link: { type: GraphQLString },
        id: { type: GraphQLString },
        metascore: { type: GraphQLInt },
        poster: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        synopsis: { type: GraphQLString },
        title: { type: GraphQLString },
        votes: { type: GraphQLInt },
        year: { type: GraphQLInt }
    }
});

exports.movieType = movieType;