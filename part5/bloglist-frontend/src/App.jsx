import { useState, useEffect } from 'react';
import Notification from './components/Notification';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    console.log('se renderizaron los blogs', blogs)
  },[]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogOut = async () => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser');
      setUser(null);
    } catch (error) {
      setErrorMessage('Error logging out');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      const response = await blogService.create(newBlog);
      
      const newList = blogs.concat(response)
      console.log('newList: ',newList)
      setBlogs(newList)
      setSuccessMessage(`New blog "${response.title}" by ${response.author} has been added`);
      setTimeout(() => setSuccessMessage(null), 5000);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      setErrorMessage('Error posting');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <div>
      <h2>
        {user.name} logged in <button onClick={handleLogOut}>Log out</button>
      </h2>
      <form onSubmit={handleNewBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br></br>
        <button type="submit">Post</button>
      </form>
    </div>
  );

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blogs key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification errorMessage={errorMessage} successMessage = {successMessage}/>
      {user === null && loginForm()}
      {user !== null && blogForm()}
      {user !== null && blogList()}
    </div>
  );
};

export default App;
