/* eslint-disable no-alert */
import { useState, useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import Togglable from './components/Toggable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  const keepUserLoggedIn = () => {
    const loggedUserText = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserText) {
      const loggedUser = JSON.parse(loggedUserText);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  };

  useEffect(keepUserLoggedIn, []);
  useEffect(() => {
    blogService.getAll()
      .then((receivedBlogs) => setBlogs(receivedBlogs));
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    blogService.setToken(null);
  };

  const display5secNotification = (text) => {
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addNewBlog = async (blog) => {
    try {
      const addedBlog = await blogService.create(blog);
      addedBlog.user = user;
      setBlogs(blogs.concat(addedBlog));
      display5secNotification(`A new blog ${addedBlog.title} by ${addedBlog.author} added.`);
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      display5secNotification(exception.response.data.error);
    }
  };

  const like = async (targetBlog) => {
    const blogWithLike = { ...targetBlog, likes: targetBlog.likes + 1 };
    try {
      await blogService.update(blogWithLike);
      const updatedBlogs = blogs.map((blog) => (blog.id === blogWithLike.id ? blogWithLike : blog));
      setBlogs(updatedBlogs);
    } catch (exception) {
      display5secNotification(exception.response.data.error);
    }
  };

  const deleteBlog = async (targetBlog) => {
    if (window.confirm(`Remove blog ${targetBlog.title} by ${targetBlog.author}?`)) {
      try {
        await blogService.deleteBlog(targetBlog);
        const updatedBlogs = blogs.filter((blog) => blog.id !== targetBlog.id);
        setBlogs(updatedBlogs);
      } catch (exception) {
        display5secNotification(exception.response.data.error);
      }
    }
  };

  if (user === null) {
    return (
      <>
        <p>
          {/* Only rendered if exists */}
          {notification}
        </p>
        <LoginForm setUser={setUser} displayNotification={display5secNotification} />
      </>
    );
  }
  return (
    <>
      <p>
        {/* Only rendered if exists */}
        {notification}
      </p>
      <p>
        Logged in as
        {` ${user.name} `}
        <button type="button" onClick={handleLogOut}>
          logout
        </button>
      </p>
      {/* BlogForm is rendering can be toggled on and off with button */}
      <Togglable buttonLabel="Add blog" ref={blogFormRef}>
        <BlogForm addNewBlog={addNewBlog} />
      </Togglable>
      <Blogs blogs={blogs} like={like} deleteBlog={deleteBlog} user={user} />
    </>
  );
};

export default App;
