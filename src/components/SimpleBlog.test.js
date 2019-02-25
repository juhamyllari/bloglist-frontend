import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
// import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title', () => {
  const blog = {
    title: 'Started Blogging',
    author: 'Richard Bran',
    likes: 9001
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Started Blogging')
})

test('renders author', () => {
  const blog = {
    title: 'Started Blogging',
    author: 'Richard Bran',
    likes: 9001
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Richard Bran')
})

test('renders likes', () => {
  const blog = {
    title: 'Started Blogging',
    author: 'Richard Bran',
    likes: 9001
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('9001')
})

it('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'Started Blogging',
    author: 'Richard Bran',
    likes: 9001
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})