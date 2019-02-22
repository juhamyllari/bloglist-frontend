import React, { useState } from 'react'

const Blog = ({ blog, user, like, remove }) => {
  const [expanded, setExpanded] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = (event) => {
    event.preventDefault()
    like(blog.id)
  }
  const handleRemove = (event) => {
    event.preventDefault()
    remove(blog)
  }
  if (!expanded) return (
    <div style={blogStyle} onClick={() => setExpanded(true)}>
      {blog.title} {blog.author}
    </div>
  )
  return (
    <div style={blogStyle} onClick={() => setExpanded(false)}>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <p>likes: {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
      </div>
      <div>
        <p>added by: {blog.user.name}
          {user.name === blog.user.name && <button onClick={handleRemove}>delete</button>}
        </p>
      </div>
    </div>
  )
}
export default Blog