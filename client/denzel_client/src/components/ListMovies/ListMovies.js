import React, { Component } from 'react';
import axios from 'axios';

import MovieCard, {} from '../MovieCard/MovieCard';
import './ListMovies.css';

class ListMovies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listMovies: []
        };

        this.moviesComponents = this.moviesComponents.bind(this);
    }

    async componentDidMount() {
        let URL = 'http://localhost:9292/movies/';
        let list = await axios.get(URL);

        this.setState({listMovies: list.data});
    }
 
    moviesComponents() {
        let listMovies = this.state.listMovies;

        let compenents = listMovies.map((movie, index) => {
           return (
            <li key={index}>
                <MovieCard movie_id={movie.id}/>
            </li>
           );
        });

        return ( 
            <ul>
                {compenents}
            </ul>
        );
    }

    render() {
        return (
            <div>
                {this.moviesComponents()}
            </div>
        )
    }
}
export default ListMovies;