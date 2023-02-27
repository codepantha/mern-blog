require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');

const uploadMiddleware = multer({ dest: 'uploads/' });

const User = require('./models/User');
const Post = require('./models/Post');

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

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
      if (err) return res.status(401).json('Unathenticated user.');
      return res.json(info);
    });
  }
});

app.post('/posts', uploadMiddleware.single('file'), async (req, res, next) => {
  const { originalname, path } = req.file;

  const fileExtension = originalname.split('.')[1];
  const newFilePath = path + '.' + fileExtension;

  // rename the file
  fs.renameSync(path, newFilePath);

  // save the post
  const { title, summary, content } = req.body;

  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, info) => {
      if (err) throw err;
      const post = await Post.create({
        title,
        summary,
        content,
        cover: newFilePath,
        author: info.id
      });

      if (!post) throw new Error('something bad happened. Try later');
      return res.status(201).json(post);
    });
  }
});

app.patch(
  '/posts/:id',
  uploadMiddleware.single('file'),
  async (req, res, next) => {
    let newFilePath = null;
    const { id } = req.params;
    const { token } = req.cookies;

    if (req.file) {
      const { originalname, path } = req.file;
      const fileExtension = originalname.split('.')[1];
      newFilePath = path + '.' + fileExtension;
      // rename the file
      fs.renameSync(path, newFilePath);
    }

    try {
      const post = await Post.findById(id);

      if (!post) return res.status(404).json({ msg: 'Post not found' });

      const data = {
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        cover: newFilePath ? newFilePath : post.cover
      };

      // now check if user has the right to update post
      if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, info) => {
          if (err) return res.status(401).json({ msg: 'Unauthenticated' });

          const isAuthor =
            JSON.stringify(post.author._id) === JSON.stringify(info.id);

          if (!isAuthor)
            return res.status(403).json({ msg: 'Unathorized access' });

          // update post
          await post.updateOne(data);
        });
      }

      return res.status(200).json(post);
    } catch (err) {
      res
        .status(400)
        .json({ msg: 'Something bad happened! Please try again.' });
    }
  }
);

app.get('/posts', (req, res) => {
  Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20)
    .then((posts) => res.status(200).json(posts));
});

app.post('/logout', (req, res) => {
  res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok');
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', [
      'username'
    ]);
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json('post not found');
  }
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
