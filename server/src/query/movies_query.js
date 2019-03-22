const { 
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLList
 } = require('graphql');

const { movieType } = require('../types/movie_type');
const { reviewType } = require('../types/review_type');

const { 
    getListMovies,
    saveMovies,
    listMustWatch,
    getRandomMustWatch,
    searchMovie,
    getMovie
} = require('../controllers/movies_controller');

const { 
    reviewMovie,
    getReviewsById,
    getReviewsByIdAndUsername
} = require('../controllers/review_controller');

//DEFINING QUERIES
const movieByID = {
    type: movieType,

    args: {
        id: {
            type:GraphQLString
        }
    },

    resolve: async (source, args) => {
        return await getMovie(args.id)
    } 
};

const listMovies = {
    type: GraphQLList(movieType),

    resolve: async () => {
        return await getListMovies();
    }
};

const populate = {
    type: GraphQLString,

    resolve: async () => {
        let result = "false";
        if (await saveMovies().populate) result = "true";
        return result;
    }
};

const must_watch = {
    type: GraphQLList(movieType),

    resolve: async () => {
        return await listMustWatch();
    }
};

const discover = {
    type: movieType,

    resolve: async () => {
        return await getRandomMustWatch();
    }
};

const search = {
    type: GraphQLList(movieType),

    args: {
        limit: { type: GraphQLInt },
        metascore: { type: GraphQLFloat }
    },

    resolve: async (source, args) => {
        return await searchMovie(args.limit, args.metascore);
    }
};

const review = {
    type: GraphQLString,

    args: {
        username: { type: GraphQLString },
        date: { type: GraphQLString },
        review: { type: GraphQLString },
        movie_id: { type: GraphQLString }
    },

    resolve: async (source, args) => {
        await reviewMovie( args.username, Date.parse(args.date), args.review, args.movie_id);
        return "ok";
    } 
};

const reviewByID = {
    type: GraphQLList(reviewType),

    args: {
        movie_id: { type: GraphQLString }
    },

    resolve: async (source, args) => {
        return await getReviewsById(args.movie_id);
    }
}

const reviewByIDAndUsername = {
    type: GraphQLList(reviewType),

    args: {
        username: { type: GraphQLString },
        movie_id: { type: GraphQLString }
    },

    resolve: async (source, args) => {
        return await getReviewsByIdAndUsername(args.movie_id, args.username);
    }
}

const queries = {
    name: 'Query',
    fields: {
        getMovieByID: movieByID ,
        listMovies: listMovies,
        populate: populate,
        must_watch: must_watch,
        discover: discover,
        search: search,
        review: review,
        getReviewsByID: reviewByID,
        getReviewsByIDAndUsername: reviewByIDAndUsername
    }
};

const queryType = new GraphQLObjectType(queries);

exports.queryType = queryType;