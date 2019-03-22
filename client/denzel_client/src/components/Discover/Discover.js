import React, { Component } from 'react';
import axios from 'axios';

import MovieCard, {} from '../MovieCard/MovieCard';

class Discover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discover: {}
        };
    }

    async componentDidMount() {
        let URL = 'http://localhost:9292/movies/discover';
        let movie = await axios.get(URL);

        this.setState({discover: movie.data});
    }

    render() {
        console.log(this.state.discover)
        return (
            <div className="Discover">
                <MovieCard movie_id={this.state.discover.id}/>
            </div>
        )
    }
}

export default Discover;