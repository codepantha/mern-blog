import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { baseUrl } from '../utils';

const Login = () => {
  const [formInput, setFormInput] = useState({
    username: '',
    password: ''
  });
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const { setUserInfo } = useContext(UserContext);

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formInput;
    const res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    const data = await res.json();

    if (res.ok) {
      setUserInfo(data)
      setRedirect(true);
    }
    else setError('Invalid credentials');
  };

  if (redirect) return <Navigate to={'/'} />

  return (
    <form onSubmit={handleSubmit} className="login">
      <h1>Login</h1>
      <span className="error">{error}</span>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
