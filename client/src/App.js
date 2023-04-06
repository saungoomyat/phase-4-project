import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Review from './components/Review';
import Movies from './components/Movies';
import UserMoviesList from './components/UserMoviesList';
import CreateReview from './components/CreateReview';
import EditReview from './components/EditReview';
import Error from './components/Error';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { UserContext } from "./Context/User";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/movies")
      .then((r) => r.json())
      .then((data) => setMovies(data));

  }, []);

  console.log(movies)
  console.log(users)


  // useEffect(() => {
  //   fetch("/users")
  //     .then((r) => r.json())
  //     .then((data) => setUsers(data));
  // }, []);


  // useEffect(() => {
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, [setUser]);

  function handleAddMovies(newMovie) {
    setMovies([newMovie, ...movies]);
  }

  function handleAddReview(newReview) {

    const updatemovies = movies.map((movie) => {
      if (movie.id === newReview.movie_id) {
        return {
          ...movie,
          reviews: [newReview, ...movie.reviews],
        };
      }
      return movie;
    });

    const updateUser = { ...user, reviews: [...user.reviews, newReview] };

    setMovies(updatemovies);

    setUser(updateUser);
  }

  function handleDeleteReview(deletedReview) {

    const updateUser = {
      ...user,
      reviews: user.reviews.filter((review) => review.id !== deletedReview.id),
    };

    const updateMovies = movies.map((movie) => {
      if (movie.id === deletedReview.movie_id) {
        return {
          ...movie,
          reviews: movie.reviews.filter(
            (review) => review.id !== deletedReview.id
          ),
        };
      }
      return movie;
    });

    setUser(updateUser);

    setMovies(updateMovies);
  }

  function handleEditReview(editReview) {

    const updateMovies = movies.map((movie) => {
      if (movie.id === editReview.movie_id) {
        return {
          ...movie,
          reviews: movie.reviews.map((review) => {
            if (review.id === editReview.id) {
              return editReview;
            }
            return review;
          }),
        };
      }
      return movie;
    });

    const updateUser = {
      ...user,
      reviews: user.reviews.map((review) => {
        if (review.id === editReview.id) {
          return editReview;
        }
        return review;
      }),
    };

    setUser(updateUser);

    setMovies(updateMovies);
  }

  return (
    <div className="App">
      <Router>
        <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signup">
              <SignupForm />
            </Route>
            {user && (
            <Route path="/movies">
              <Movies 
              movies={movies} 
              onAddMovie={handleAddMovies} />
            </Route>
          
          )}
          <Route path="/movies/:id">
              <Review movies={movies} 
              onAddReview={handleAddReview} />
          </Route>
          <Route path="/users/:id">
            <UserMoviesList users={users} /> 
          </Route>
          {user && (
            <Route path="/my-reviews">
              <CreateReview
              onDeleteReview={handleDeleteReview} 
              onEditReview={handleEditReview} />
            </Route>
              
          )}
        </Switch>
      </Router>
    </div>
  );
};



export default App;
