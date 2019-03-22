import React, { Component } from 'react';
import axios from 'axios';

import './MovieCard.css'

class MovieCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {},
            hover: false
        };

        this.displayContent = this.displayContent.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseClick = this.mouseClick.bind(this);
    }

    mouseEnter() {
        this.setState({hover: true});
    }

    mouseLeave() {
        this.setState({hover: false});
    }

    mouseClick() {
        window.open(this.state.movie.link, '_blank')
    }

    displayContent() {
        if (this.state.hover){
            return (
                <div class="container">
                    <h4> {this.state.movie.title} </h4>
                    <p class="mini-info"> {this.state.movie.year} </p>
                    <p> {this.state.movie.synopsis} </p>
                </div>
            )
        }
    }

    async componentDidMount() {
        let URL = 'http://localhost:9293/movies/' + this.props.movie_id
        let movie = await axios.get(URL);
        console.log(movie.data)
        this.setState({movie: movie.data[0]});
    }

    render() {
        return (
            <div className="MovieCard card" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.mouseClick}>
                <img src={this.state.movie.poster} alt="POSTER"/>

                {this.displayContent()}
            </div>
        )
    }
}

export default MovieCard;