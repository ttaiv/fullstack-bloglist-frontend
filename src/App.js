/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

const Blogs = ({ user, blogs }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2> Blogs </h2>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const keepUserLoggedIn = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
    }
  };

  useEffect(keepUserLoggedIn, []);
  useEffect(() => {
    blogService.getAll()
      .then((receivedBlogs) => setBlogs(receivedBlogs));
  }, []);

  const display5secNotification = (text) => {
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const loggedInText = () => (
    <p>
      Logged in as
      {` ${user.name}`}
    </p>
  );
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const logOutButton = () => (
    <button type="button" onClick={handleLogOut}>
      logout
    </button>
  );

  return (
    <div>
      <p>
        {/* Only rendered if exists */}
        {notification}
      </p>
      {/* Only rendered if user is null */}
      <LoginForm user={user} setUser={setUser} displayNotification={display5secNotification} />
      {/* Only rendered if user is not null */}
      {user && loggedInText()}
      {user && logOutButton()}
      <Blogs user={user} blogs={blogs} />
    </div>
  );
};

export default App;
