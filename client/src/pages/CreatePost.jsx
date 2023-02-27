import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components';
import { baseUrl } from '../utils';

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

    const res = await fetch(`${baseUrl}/posts`, {
      method: 'POST',
      credentials: 'include',
      body: data
    });

    if (res.status === 201) return navigate('/');
  };

  return (
    <>
      <Form
        title={title}
        setTitle={setTitle}
        summary={summary}
        setSummary={setSummary}
        content={content}
        setContent={setContent}
        files={files}
        setFiles={setFiles}
        handleSubmit={handleSubmit}
        buttonText="Create Post"
      />
    </>
  );
};

export default CreatePost;
