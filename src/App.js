import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

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
    blogService.setToken(null);
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
      <BlogForm user={user} displayNotification={display5secNotification} setBlogs={setBlogs} blogs={blogs} />
    </div>
  );
};

export default App;
