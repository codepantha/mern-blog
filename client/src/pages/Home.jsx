import React, { useEffect, useState } from 'react'
import { Post } from '../components'

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts').then(res => {
      res.json().then((data) => setPosts(data))
    })
  }, []);

  return (
    <>
      { posts?.map(post => (
        <Post key={post._id} { ...post } />
      ))}
    </>
  )
}

export default Home