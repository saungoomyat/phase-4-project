import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/User';

const NavBar = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        {user ? (
          <>
            <div>
              <Link to="/review">Reviews</Link>
            </div>
            <div>
              <Link to="/create">Create Review</Link>
            </div>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <div>
            <div>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
