import React, { Component } from 'react';
import axios from 'axios';

class MovieCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "TEST HELLO"
        }
    }

    render() {
        axios.get('http://localhost:9293/movies/discover').then(response => {
            console.log(response);
            this.setState({
                title: response.data
            });
        });

        return (
            <div className="MovieCard">
                <h1>
                    {this.state.title}
                </h1>
            </div>
        )
    }
}

export default MovieCard