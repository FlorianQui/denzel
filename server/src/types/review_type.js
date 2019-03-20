const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const GraphQLDate = require('graphql-date');

reviewType = new GraphQLObjectType({
    name: 'Review',
    fields: {
        username: { type: GraphQLString },
        date: { type: GraphQLDate },
        review: { type: GraphQLString },
        movie_id: { type: GraphQLString }
    }
});

exports.reviewType = reviewType;