const { 
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLList
 } = require('graphql');


const { reviewType } = require('../types/review_type');

const { 
    reviewMovie,
    getReviewsById,
    getReviewsByIdAndUsername
} = require('../controllers/review_controller');

//DEFINING QUERIES
const review = {
    type: {},

    args: {
        username: { type: GraphQLString },
        date: { type: GraphQLString },
        review: { type: GraphQLString },
        movie_id: { type: GraphQLString }
    },

    resolve: async (source, args) => {
        return await reviewMovie(args.username, args.date, args.review, args.movie_id);
    } 
};

const queries = {
    name: 'Query',
    fields: {
        review: review
    }
};

const reviewQueryType = new GraphQLObjectType(queries);

exports.reviewQueryType = reviewQueryType;