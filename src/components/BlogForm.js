import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleAddNew = (event) => {
    event.preventDefault();
    clearForm();
    const newBlog = { title, author, url };
    addNewBlog(newBlog);
  };

  return (
    <>
      <h2> Create a new entry </h2>
      <form onSubmit={handleAddNew}>
        <div>
          {'title: '}
          <input type="text" value={title} id="title-input" onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          {'author: '}
          <input type="text" value={author} id="author-input" onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
          {'url: '}
          <input type="text" value={url} id="url-input" onChange={(event) => setUrl(event.target.value)} />
        </div>
        <br />
        <button type="submit"> create </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
};

export default BlogForm;
