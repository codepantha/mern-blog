import React, { useState } from 'react';

const Register = () => {
  const [formInput, setFormInput] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const { username, password } = formInput;
    e.preventDefault();
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    if (!res.ok) {
      alert('registration failed')
      return;
    }

    alert('registration successful');
  }

  return (
    <form onSubmit={handleSubmit} className="register">
      <h1>Register</h1>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
