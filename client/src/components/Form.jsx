import React from 'react';
import WYSIWYGEditor from './WYSIWYGEditor';

const Form = (props) => {
  const {
    title,
    setTitle,
    summary,
    setSummary,
    content,
    setContent,
    setFiles,
    handleSubmit,
    buttonText
  } = props;

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
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
