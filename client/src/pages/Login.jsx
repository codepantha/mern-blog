import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formInput, setFormInput] = useState({
    username: '',
    password: ''
  });
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formInput;
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    if (res.ok) setRedirect(true);
    else setError('Invalid credentials');
  };

  if (redirect) return navigate('/');

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
