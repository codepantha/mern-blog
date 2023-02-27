import React from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
import { baseUrl } from '../utils';

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`posts/${_id}`}>
          <img src={`${baseUrl}/${cover}`} alt="post-img" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`posts/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            {author.username}
          </a>{' '}
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="excerpt">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
