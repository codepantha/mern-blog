import React, { useEffect, useState } from 'react'
import { Post } from '../components'
import { baseUrl } from '../utils';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/posts`).then(res => {
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