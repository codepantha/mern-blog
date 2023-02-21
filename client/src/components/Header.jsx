import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      credentials: 'include'
    }).then((res) => {
      res.json().then((userData) => setUsername(userData.username));
    });
  }, [username]);

  const logout = async () => {
    const res = await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include'
    })

    if (res.ok) setUsername(null);
  }

  return (
    <header>
      <a href="/" className="logo">
        Codepantha's Blog
      </a>
      <nav>
        {username ? (
          <>
            <Link to="/create-post">Create New Post</Link>
            <a href="#" onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
