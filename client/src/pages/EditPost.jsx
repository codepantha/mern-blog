import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '../components';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
      const data = await res.json();

      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
    };

    fetchPost();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);

    if (files?.[0]) data.set('file', files[0]);

    e.preventDefault();

    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: data
    });

    if (res.status === 200) return navigate('/');
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
        buttonText="Edit Post"
      />
    </>
  );
};

export default EditPost;
