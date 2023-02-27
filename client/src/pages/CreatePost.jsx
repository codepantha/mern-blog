import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WYSIWYGEditor } from '../components';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    e.preventDefault();

    const res = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      credentials: 'include',
      body: data
    });

    if (res.status === 201) return navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <WYSIWYGEditor
        value={content}
        onChange={(newValue) => setContent(newValue)}
      />
      <button style={{ marginTop: '5px' }} type="submit">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
