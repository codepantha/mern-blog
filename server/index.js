require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('./models/User');

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }));
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ msg: 'invalid username ' });

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) return res.status(400).json({ msg: 'invalid password' });

  jwt.sign(
    { username, id: user._id },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_LIFETIME },
    (err, token) => {
      if (err) throw err;
      res.cookie('token', token, { sameSite: 'none', secure: true }).json({
        id: user._id,
        username: user.username
      });
    }
  );
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, info) => {
      if (err) throw err;
      return res.json(info);
    });
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok');
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connected to db');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`app running on port http://localhost:${PORT}`)
    );
  })
  .catch((e) => console.log(e));
