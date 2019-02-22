import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageIsError, setMessageIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (msg, isError) => {
    setMessage(msg)
    setMessageIsError(isError)
    setTimeout(() => {
      setMessage(null)
      setMessageIsError(false)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (error) {
      showMessage('wrong username or password', true)
    }
  }

  if (user === null) {
    return (
      <>
      <Notifier
        message={message}
        setMessage={setMessage}
        messageIsError={messageIsError}
        setMessageIsError={setMessageIsError}
      />
      <Login
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}/>
      </>
    )
  } else {
    return (
      <>
        <Notifier
          message={message}
          setMessage={setMessage}
          messageIsError={messageIsError}
          setMessageIsError={setMessageIsError}
        />
        <BlogDisplay
          user={user}
          setUser={setUser}
          blogs={blogs}
          setBlogs={setBlogs} />
        <Togglable buttonLabel="new blog">
          <CreateBlog blogs={blogs} setBlogs={setBlogs} showMessage={showMessage} />
        </Togglable>
      </>
    )
  }
}

const Notifier = ({ message, messageIsError }) => {
  if (!message) {
    return null
  }
  if (messageIsError) {
    return <div className="error">{message}</div>
  } else {
    return <div className="success">{message}</div>
  }
}

const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h2>Log into application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

const BlogDisplay = ({ user, setUser, blogs, setBlogs }) => {
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }
  const like = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlogs = blogs
      .filter(b => b.id !== id)
      .concat(updatedBlog)
    await blogService.update(id, { ...updatedBlog, user: updatedBlog.user.id })
    setBlogs(updatedBlogs)
  }
  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      await blogService.remove(blog.id)
      setBlogs(updatedBlogs)
    }
  }
  return (
    <div>
      <h2>Blogs</h2>
      <p>Logged in as {user.name}
        <button onClick={handleLogout}>log out</button>
      </p>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} user={user} blog={blog} like={like} remove={remove}/>
      )}
    </div>
  )
}

const CreateBlog = ({ blogs, setBlogs, showMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleCreate = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    blogService.create(newBlog)
    showMessage(`added new blog: ${title} by ${author}`, false)
    setBlogs(blogs.concat(newBlog))
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Username"
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Username"
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Username"
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App