import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      credentials: 'include'
    }).then((res) => {
      res.json().then((userData) => setUserInfo(userData));
    });
  }, []);

  const logout = async () => {
    const res = await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (res.ok) setUserInfo(null);

    return navigate('/login');
  };

  const username = userInfo?.username;

  return (
    <header>
      <a href="/" className="logo">
        Codepantha's Blog
      </a>
      <nav>
        {username && (
          <>
            <Link to="/create-post">Create New Post</Link>
            <a href="#" onClick={logout}>
              Logout
            </a>
          </>
        )}
        {!username && (
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
