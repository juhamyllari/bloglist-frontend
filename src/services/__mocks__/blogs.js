const blogs = [
  {
    likes: 6,
    title: 'Meditations on Moloch',
    author: 'Scott Alexander',
    url: 'https://slatestarcodex.com/2014/07/30/meditations-on-moloch/',
    user: {
      username: 'freddym',
      name: 'Freddy Mercury',
      id: '5c6a7d5251ffc82266b51e5d'
    },
    id: '5c6d88ff3329a2592aa95939'
  },
  {
    likes: 0,
    title: 'Jim Collins — A Rare Interview with a Reclusive Polymath (#361)',
    author: 'Tim Ferriss',
    url: 'https://tim.blog/',
    user: {
      username: 'freddym',
      name: 'Freddy Mercury',
      id: '5c6a7d5251ffc82266b51e5d'
    },
    id: '5c6d8f1b342fb26d2a358ac6'
  },
  {
    likes: 1,
    title: 'Why are amplitudes complex?',
    author: 'Scott Aaronson',
    url: 'https://www.scottaaronson.com/blog/?p=4021',
    user: {
      username: 'freddym',
      name: 'Freddy Mercury',
      id: '5c6a7d5251ffc82266b51e5d'
    },
    id: '5c6d988a342fb26d2a358ac7'
  },
  {
    likes: 2,
    title: 'Joe Rosenstein: The Art of Being Discrete',
    author: 'M. Goldenberg',
    url: 'https://mathblog.com/joe-rosenstein-art-discrete/',
    user: {
      username: 'jonvn',
      name: 'John von Neumann',
      id: '5c6ecb9723f849259891024f'
    },
    id: '5c6ed1765543312dc280e2b7'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {

}

export default { getAll, setToken }