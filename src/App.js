import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import useField from './hooks/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('text')
  const [message, setMessage] = useState('')
  const [messageIsError, setMessageIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
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
      const user = await loginService.login(
        { username: username.value,
          password: password.value })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      username.reset()
      password.reset()
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
        password={password}
      />
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

const Login = ({ handleLogin, username, password }) => {
  return (
    <div>
      <h2>Log into application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input { ...username.formProps } />
        </div>
        <div>
          password
          <input { ...password.formProps }/>
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

const BlogDisplay = ({ user, setUser, blogs, setBlogs }) => {
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
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
  const title = useField('')
  const author = useField('')
  const url = useField('')
  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value }
    const createdBlog = await blogService.create(newBlog)
    showMessage(`added new blog: ${title.value} by ${author.value}`, false)
    setBlogs(blogs.concat(createdBlog))
    title.reset()
    author.reset()
    url.reset()
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input { ...title.formProps } />
        </div>
        <div>
          author:
          <input { ...author.formProps } />
        </div>
        <div>
          url:
          <input { ...url.formProps } />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App