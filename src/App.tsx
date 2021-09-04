import React, { FormEvent } from 'react'

import { MemoizedPageView } from './components/UsersView'
import { MemoizedPagination } from './components/pagination/Pagination'
import { FindUserForm } from './components/FindUserForm'
import { OutputMessage } from './components/OutputMessage'
import { TotalUsers } from './components/TotalUsers'
import { user_type, users_type } from './types/user_types'

const getUser = (user: string, signal: AbortSignal) =>
  fetch(`https://api.github.com/users/${user}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
    signal,
  }).then((response) => response.json())

const searchGithubApi = (
  userName: string,
  pageNo: number = 1,
  signal: AbortSignal
) =>
  fetch(
    `https://api.github.com/search/users?q=${userName}&type=users&per_page=10&page=${pageNo}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      signal,
    }
  ).then((res) => res.json())

function App() {
  const [users, setUsers] = React.useState<users_type>({
    total_count: 0,
    items: [],
  })

  const [inputValue, setInputValue] = React.useState<string>('') // handle change of input field
  const [userInput, setUserInput] = React.useState<string>('')
  const [pageNo, setPageNo] = React.useState<number>(1)
  const [outputMessage, setOutputMessage] = React.useState<string>('')

  const topRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (userInput === '') return // exit if userInput is empty (initial state)

    const abortCtrl = new AbortController()
    const signal = abortCtrl.signal

    searchGithubApi(userInput, pageNo, signal).then(
      (users) => {
        const total_count: number = users.total_count

        if (total_count === 0) {
          setOutputMessage('No users found')
          return // exit
        }

        const userPromises = users.items.map((user: user_type) => {
          // console.log('user', user)
          return getUser(user.login, signal)
        })

        Promise.all<user_type>(userPromises).then((users) => {
          // console.log('users', users)
          setUsers({ items: users, total_count: total_count })
          topRef?.current?.scrollIntoView({ behavior: 'smooth' })
        })
      },
      (err) => console.error(err)
    )

    return () => abortCtrl.abort()
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

  // console.log('users', users)
  return (
    <div ref={topRef} className="container-lg" style={{ margin: '0px auto' }}>
      <div className="container-lg">
        <FindUserForm
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          handleChange={handleChange}
        />
      </div>
      <OutputMessage outputMessage={outputMessage} />
      {users.items.length > 0 ? (
        <div className="container-lg">
          <div className="row d-flex justify-content-center">
            <div className="col-auto">
              <TotalUsers totalUsers={users.total_count} />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <MemoizedPageView users={users.items}>
              <MemoizedPagination
                totalCount={users.total_count}
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
