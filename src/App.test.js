import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('kirjaudu')
    )

    expect(component.container)
      .not.toHaveTextContent('Why are amplitudes complex?')
  })

  it('if a user is logged in, blogs are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('kirjaudu')
    )

    expect(component.container)
      .toHaveTextContent('Why are amplitudes complex?')

  })
})