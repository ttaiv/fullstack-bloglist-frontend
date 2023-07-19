import { useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = ({ setUser, displayNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clearForm = () => {
    setUsername('');
    setPassword('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = { username, password };
    try {
      const newUser = await loginService.login(credentials);
      setUser(newUser);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      clearForm();
    } catch (exception) {
      displayNotification('Wrong username or password');
    }
  };

  return (
    <div>
      <h2> Log in to application </h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          {' '}
          <input type="text" value={username} name="Username" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          password
          {' '}
          <input type="password" value={password} name="Password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit"> login </button>
      </form>
    </div>
  );
};

export default LoginForm;
