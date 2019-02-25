import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
// import { prettyDOM } from 'dom-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {

  let component
  beforeEach(() => {
    const blog = {
      title: 'Jim Collins — A Rare Interview with a Reclusive Polymath (#361)',
      author: 'Tim Ferriss',
      url: 'https://tim.blog/',
      likes: 23,
      user: { name: 'Test User' }
    }
    const user = {
      name: 'Test User'
    }
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  afterEach(cleanup)

  it('initially renders title and author but not url', () => {
    expect(component.container)
      .toHaveTextContent('Jim Collins — A Rare Interview with a Reclusive Polymath (#361)')
    expect(component.container)
      .toHaveTextContent('Tim Ferriss')
    expect(component.container)
      .not.toHaveTextContent('https://tim.blog/')
  })

  it('clicking expands blog', () => {
    const div = component.container.querySelector('.blogdiv')
    fireEvent.click(div)
    expect(component.container)
      .toHaveTextContent('likes:')
    expect(component.container)
      .toHaveTextContent('https://tim.blog/')
  })
})