import React, { FormEvent } from 'react'
import './App.css'
import { calcNoOfPages, isSequence, createNewPagesArray } from './utils'
import { Search, ChevronLeft, ChevronRight, Info } from 'react-bootstrap-icons'

type users_type = {
  total_count: number
  items: Array<user_type>
}

type user_type = {
  avatar_url: string | undefined
  bio: string | null
  blog: string
  company: string | null
  created_at: string
  email: string | null
  events_url: string | null
  followers: number
  followers_url: string | null
  following: 0
  following_url: string | null
  gists_url: string | null
  gravatar_id: string
  hireable: boolean | null
  html_url: string
  id: number
  location: string | null
  login: string
  name: string | null
  node_id: string
  organizations_url: string | null
  public_gists: number
  public_repos: number
  received_events_url: string | null
  repos_url: string | null
  site_admin: boolean
  starred_url: string | null
  subscriptions_url: string | null
  twitter_username: string | null
  type: string
  updated_at: string | null
  url: string
}

const getUser = (user: string) =>
  fetch(`https://api.github.com/users/${user}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  }).then((response) => response.json())

const searchGithubApi = (userName: string, pageNo: number = 1) =>
  fetch(
    `https://api.github.com/search/users?q=${userName}&type=users&per_page=10&page=${pageNo}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  ).then((res) => res.json())

function PageView({
  users,
  children,
}: {
  users: user_type[]
  children: React.ReactNode
}) {
  // console.log('PageView')
  const usersProfiles = users.map((user: user_type) => {
    return (
      <div className="card" style={{ maxWidth: '600px' }} key={user.id}>
        <div className="row">
          <div className="col-md-4 ">
            <img
              className="img-fluid rounded-start"
              style={{ width: '80px' }}
              src={user.avatar_url}
              alt="user avatar"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                <a href={user.html_url} rel="noreferrer" target="_blank">
                  {user.login}
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href={user.html_url} rel="noreferrer" target="_blank">
                  {user.name}
                </a>
              </h5>
              <p className="card-text">{user.bio}</p>
              <p className="card-text">
                <span>{user.followers} followers</span>{' '}
                <span>Following: {user.following}</span>
              </p>
              {user.location ? (
                <p className="card-text"> Location: {user.location}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  })
  return (
    <>
      {usersProfiles}
      {children}
    </>
  )
}

function arraysIdentical(
  prevProps: Readonly<{ users: user_type[]; children: React.ReactNode }>,
  currentProps: Readonly<{ users: user_type[]; children: React.ReactNode }>
) {
  const a = prevProps.users
  const b = currentProps.users

  let i = a.length
  if (i !== b.length) return false
  while (i--) {
    if (a[i] !== b[i]) return false
  }
  return true
}

const MemoizedPageView = React.memo(PageView, arraysIdentical)

function PreviousPage({
  pageNo,
  setPageNo,
}: {
  pageNo: number
  setPageNo: (pageNo: number) => void
}) {
  const [disabled, setDisabled] = React.useState(false)

  React.useEffect(() => {
    if (pageNo === 1) setDisabled(true)
    else setDisabled(false)
  }, [pageNo])

  return (
    <button
      id="prev-btn"
      className="btn btn-outline-primary btn-sm"
      disabled={disabled}
      onClick={() => setPageNo(pageNo - 1)}
      style={{ borderColor: 'transparent' }}
    >
      <ChevronLeft className="me-2 mb-0" />
      Previous
    </button>
  )
}

function NextPage({
  pageNo,
  setPageNo,
  last_page,
}: {
  pageNo: number
  setPageNo: (pageNo: number) => void
  last_page: number
}) {
  const [disabled, setDisabled] = React.useState(false)

  React.useEffect(() => {
    if (pageNo === last_page) setDisabled(true)
    else setDisabled(false)
  }, [pageNo, last_page])

  return (
    <button
      id="next-btn"
      className="btn btn-outline-primary btn-sm"
      disabled={disabled}
      onClick={() => setPageNo(pageNo + 1)}
      style={{ borderColor: 'transparent' }}
    >
      Next
      <ChevronRight className="ms-2 mb-0" />
    </button>
  )
}

function PageNumberInput({
  setPageNo,
}: {
  setPageNo: (pageNo: number) => void
}) {
  const [userInput, setUserInput] = React.useState('')

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    setUserInput(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPageNo(parseInt(userInput))
    setUserInput('')
  }

  return (
    <form
      id="page-number-input"
      className="d-flex justify-content-center"
      onSubmit={handleSubmit}
    >
      <label
        style={{ display: 'none' }}
        className="form-label"
        htmlFor="page-no"
      >
        Page No:
      </label>
      <input
        id="page-no"
        autoComplete="off"
        type="text"
        maxLength={2}
        className="form-control form-control-inline"
        placeholder="#"
        value={userInput}
        onChange={handleChange}
      />
      <button
        style={{ display: 'inline' }}
        className="btn btn-outline-primary"
        type="submit"
      >
        Go
      </button>
    </form>
  )
}

function createPagesList(
  newPagesArray: number[],
  pageNo: number,
  setPageNo: (pageNo: number) => void
) {
  const pages = []
  for (let i = 0; i < newPagesArray.length; i++) {
    pages.push(
      <li
        key={i}
        className="page-item"
        style={{ display: 'inline', margin: '.3em .6em' }}
      >
        {pageNo === newPagesArray[i] ? ( // if this is the current page apply special style
          <button
            className="btn btn-outline-secondary btn-sm pagination-btn"
            style={{
              borderColor: 'transparent',
              padding: '10px',
              borderRadius: '50%',
              background: 'rgb(3, 102, 214)',
              color: 'white',
              boxShadow:
                '10px 10px 10px rgb(0 0 0 / 40%), inset -5px -5px 10px rgb(0 0 0 / 40%)',
            }}
            onClick={() => setPageNo(newPagesArray[i])}
          >
            {newPagesArray[i]}
          </button>
        ) : newPagesArray[i] === -1 ? (
          <span className="gap">…</span>
        ) : (
          <button
            className="btn btn-outline-secondary btn-sm"
            style={{
              borderColor: 'transparent',
              padding: '10px',
              borderRadius: '50%',
              boxShadow:
                '10px 10px 10px rgb(0 0 0 / 40%), inset -5px -5px 10px rgb(0 0 0 / 40%)',
            }}
            onClick={() => setPageNo(newPagesArray[i])}
          >
            {newPagesArray[i]}
          </button>
        )}
      </li>
    )
  }
  return pages
}

const Pagination = ({
  total_count,
  pageNo,
  setPageNo,
}: {
  total_count: number
  pageNo: number
  setPageNo: (pageNo: number) => void
}) => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  // Rezing the window event and set window width
  React.useEffect(() => {
    window.addEventListener('resize', (e: Event) => {
      setWindowWidth(window.innerWidth)
    })
  }, [windowWidth])

  const noOfPages = calcNoOfPages(total_count, pageNo, windowWidth)
  // console.log('noOfPages', noOfPages)
  const indexes = isSequence(noOfPages)
  // console.log('indexes', indexes)
  const newPagesArray = createNewPagesArray(noOfPages, indexes)
  // console.log('newPagesArray', newPagesArray)
  const last_page = noOfPages[noOfPages.length - 1]
  // console.log('last_page', last_page)

  const pages = createPagesList(newPagesArray, pageNo, setPageNo)

  return pages.length > 0 ? (
    <>
      <div className="d-flex mt-1 justify-content-center text-primary">
        <output id="pages-output" style={{ fontSize: '.8em' }}>
          <Info />
          Pages: {pageNo}/{newPagesArray[newPagesArray.length - 1]}
        </output>
      </div>
      <div id="pages" style={{ maxWidth: '100%' }}>
        <div id="previous-page-comp">
          <PreviousPage pageNo={pageNo} setPageNo={setPageNo} />
        </div>
        {windowWidth > 589 ? (
          <div id="pages-ul">
            <ul style={{ display: 'inline', padding: '0 5px' }}>{pages}</ul>
          </div>
        ) : (
          <PageNumberInput setPageNo={setPageNo} />
        )}

        <div id="next-page-comp">
          <NextPage
            pageNo={pageNo}
            setPageNo={setPageNo}
            last_page={last_page}
          />
        </div>
      </div>
    </>
  ) : null
}

const MemoizedPagination = React.memo(Pagination)

function App() {
  const [users, setUsers] = React.useState<users_type>({
    total_count: 0,
    items: [],
  })

  const [inputValue, setInputValue] = React.useState<string>('') // handle change of input field

  const [userInput, setUserInput] = React.useState<string>('')
  const [pageNo, setPageNo] = React.useState<number>(1)
  // const [state, setState] = React.useState<users_type2>({total_count: 0, pageNo: 0, items: []});

  const [outputMessage, setOutputMessage] = React.useState<string>('')

  const topRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    // console.log('userInput', userInput, 'pageNo', pageNo)
    if (userInput === '') return // exit if userInput is empty (initial state)

    searchGithubApi(userInput, pageNo).then(
      (users) => {
        const total_count: number = users.total_count

        if (total_count === 0) {
          setOutputMessage('No users found')
          return // exit
        }

        const userPromises = users.items.map((user: user_type) => {
          return getUser(user.login)
        })

        Promise.all<user_type>(userPromises).then((users) => {
          setUsers({ items: users, total_count: total_count })
          topRef?.current?.scrollIntoView({ behavior: 'smooth' })
        })
      },
      (err) => console.error(err)
    )
  }, [userInput, pageNo])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // reset all state
    setUsers({ items: [], total_count: 0 })
    setPageNo(1)
    setInputValue('')
    setOutputMessage('')
    setUserInput(inputValue)
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
  }
  // console.log('users.items', users.items)
  return (
    <div ref={topRef} className="container-lg" style={{ margin: '0px auto' }}>
      <div className="container-lg">
        <form
          className="d-flex justify-content-center mt-2"
          onSubmit={handleSubmit}
        >
          <div className="col-auto">
            <label
              className="form-label visually-hidden"
              style={{ marginRight: '.3em' }}
              htmlFor="search"
            >
              Find users
            </label>
          </div>
          <div className="col-auto">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <Search />
              </span>
              <input
                id="search"
                className="form-control"
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Search for users"
              />
            </div>
          </div>
          <div className="col-auto">
            <button className="btn btn-outline-secondary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="container-lg">
        <div className="row">
          <div className="d-flex justify-content-center text-danger">
            <output>{outputMessage}</output>
          </div>
        </div>
      </div>

      {users.items.length > 0 ? (
        <div className="container-lg">
          <div className="row d-flex justify-content-center">
            <div className="col-auto">
              <h2>Total users: {users.total_count}</h2>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <MemoizedPageView users={users.items}>
              <MemoizedPagination
                total_count={users.total_count}
                pageNo={pageNo}
                setPageNo={setPageNo}
              />
            </MemoizedPageView>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
