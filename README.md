# DENZEL WEB APP

## Installation

- Install docker & docker-compose
- `$ cd {DENZEL_REPO}/`
- `$ sudo docker-compose build`
- `$ sudo docker-compose up`

## ServerSide

You can access to the API server with `http://localhost:9292/` (on linux-based system)

### API Endpoints :

###### Movies

- GET `/movies/` --> get the list of denzel's movies.
- GET `/movies/populate` --> add all denzel's movies into mongodb.
- GET `/movies/must_watch` --> get a list of 'must_watch' movies.
- GET `/movies/discover` --> get a random 'must_watch' movie.
- GET `/movies/search?limit={INT}&metascore={INT}` --> get a list of movies that have a metascore higher than arguments.
- GET `/movies/:id` --> get a movie by id.

<br/>

###### Review
- GET `/movies/review/:id` --> get all reviews for a given movie.
- POST `/movies/review/:id?username={STRING}&date={DATE}&review={STRING}` --> add a review for a given film.

###### GraphQl
- GET `/graphql?query={QUERY}`
  - `listMovies{ id, title, ... }` --> get the list of denzel's movies.
  - `populate` --> add all denzel's movies into mongodb.
  - `must_watch{ id, title, ... }` --> get a list of 'must_watch' movies.
  - `discover{ id, title, ... }` --> get a random 'must_watch' movie.
  - `search(limit:{INT}, metascore:{INT}) { id, title, ... }` --> get a list of movies that have a metascore higher than arguments.
  
  <br/>
  
  - `review(username:"{STRING}", date:"{DATE}", review:"{STRING}")` add a review for a given film.
  - `getReviewsByID(movie_id:"{:ID}") {username, date, review, movie_id}` get all reviews for a given movie.
  
### Examples

###### Discover a movie
`localhost:9292/movies/discover`  
```
{
    link: "https://www.imdb.com/title/tt0097880/?ref_=nm_flmg_act_45",
    id: "tt0097880",
    metascore: 71,
    poster: "https://m.media-amazon.com/images/M/MV5BMjEyOTgwMzk1MV5BMl5BanBnXkFtZTcwNjUzNzA2NA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    rating: 6.1,
    synopsis: "When police officer Xavier Quinn's childhood friend, Maubee, becomes associated with murder and a briefcase full of ten thousand dollar bills, The Mighty Quinn must clear his name. Or try to catch him, which could be even trickier.",
    title: "The Mighty Quinn (1989)",
    votes: 4.303,
    year: 1989
}
```

###### Add a review
`localhost:9292/movies/review/tt0765429?username=Florian Quibel&date=2019-03-21&review=Très bon film`
```
{
    username: "Florian Quibel",
    date: "2019-03-21T00:00:00.000Z",
    review: "Très bon film",
    movie_id: "tt0765429"
}
```

###### Get all reviews of a movie
`localhost:9292/movies/review/tt0765429`
```
[
  {
    username: "Florian Quibel",
    date: "2019-03-21T00:00:00.000Z",
    review: "Très bon film",
    movie_id: "tt0765429"
  }
]
```

##### Search 2 movie that's metascore higher than 75

`http://localhost:9292/graphql?query={search(limit:2,metascore:75){id,title,metascore,rating}}`

```
{
  data: {
    search: [
      {
        id: "tt2671706",
        title: "Fences (2016)",
        metascore: 79,
        rating: 7.2
        },
        {
        id: "tt1907668",
        title: "Flight (2012)",
        metascore: 76,
        rating: 7.3
      }
    ]
  }
}
```

## ClientSide

You can access to the client by typing `http://localhost:3000/` in your browser.
