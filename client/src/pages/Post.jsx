import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const [fetchedPost, setFetchedPost] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/posts/${id}`);
        const data = await res.json();

        if (res.ok) setFetchedPost(data);
        else setError(true);
      } catch (e) {
        setError(true);
      }
    };

    fetchPost();
  }, []);

  if (error) return <p>Post not found</p>;

  return (
    <div>
      <div className="image">
        <img
          src={`http://localhost:5000/${fetchedPost?.cover}`}
          alt="cover-img"
        />
      </div>

      <h1>{fetchedPost?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: fetchedPost?.content }} />
    </div>
  );
};

export default Post;
