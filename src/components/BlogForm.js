import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({
  user, displayNotification, setBlogs, blogs,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleAddNew = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    try {
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog));
      clearForm();
      displayNotification(`A new blog ${addedBlog.title} by ${addedBlog.author} added.`);
    } catch (exception) {
      displayNotification(exception.response.data.error);
    }
  };
  if (!user) {
    return null;
  }
  return (
    <>
      <h2> Create a new entry </h2>
      <form onSubmit={handleAddNew}>
        <div>
          {'title: '}
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          {'author: '}
          <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
          {'url: '}
          <input type="text" value={url} onChange={(event) => setUrl(event.target.value)} />
        </div>
        <br />
        <button type="submit"> create </button>
      </form>
    </>
  );
};

export default BlogForm;
