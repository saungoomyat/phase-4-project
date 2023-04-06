import React from 'react';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <br></br>
      <LoginForm />
      <br></br>
      <br></br>
      <Link to="/signup"><button>Sign Up</button></Link>
    </div>
  );
};

export default Home;
