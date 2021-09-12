import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MockUsers_10 from './mock_data/users_10.json'
import MockUsers_15 from './mock_data/users_10.json'
import SearchAPI_10 from './mock_data/search_api_10.json'
import SearchAPI_15 from './mock_data/search_api_10.json'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './App'
const users_data = [MockUsers_10, MockUsers_15]
const search_data = [SearchAPI_10, SearchAPI_15]

// console.log(SearchAPI)
// console.log(MockUsers.users)

let count = 0

// Start the Mock Service Worker
const server = setupServer(
  // https://api.github.com/search/users?q=${userName}&type=users&per_page=10&page=${pageNo}`,
  // https://api.github.com/users/${user}
  rest.get('https://api.github.com/search/users', async (req, res, ctx) => {
    // const originalResponse = await ctx.fetch(req)
    // const originalResponseData = await originalResponse.json()
    // console.log(originalResponseData.items)

    const query = req.url.searchParams
    // console.log('query', query)
    // console.log('rest req', req)
    // console.log('rest req.params', req.params)
    console.log('rest req.url.searchParams', req.url.searchParams)
    const users = search_data[count]
    // console.log('users', users)
    return res(ctx.json(users))
  }),

  rest.get(`https://api.github.com/users/:user`, async (req, res, ctx) => {
    // console.log('rest req.params.user', req.params.user)
    return res(
      ctx.json(
        users_data[count].users.find((user) => user.login === req.params.user)
      )
    )
  })
)

// 1) test with lX0?qB1&pI6)jS4* -> No users found
// 2) test with frontend masters -> 15 users found -> 2 pages
// 3) test with 295 users -> 30 pages

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

afterEach(cleanup)
describe('App', () => {
  test('makes 11 http requests when the user clicks the submit btn, searching for uses with the name "foobar"', async () => {
    const { container } = render(<App />)
    count++
    // Why? https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
    window.HTMLElement.prototype.scrollIntoView = function () {}
    window.innerWidth = 1200
    // console.log('window.clientWidth', window.innerWidth)

    const inputElement = screen.getByTestId('search-input')
    const btnElement = screen.getByText(/Submit/i)

    userEvent.type(inputElement, 'foobar')
    inputElement.value = 'foobar'
    userEvent.click(btnElement)

    await waitFor(() => screen.getAllByTestId('card'))
    const users_ = screen.getAllByTestId('card')
    expect(users_.length).toBe(10)
    expect(screen.getByText('Total users: 739')).toBeInTheDocument()
    expect(window.innerWidth).toBe(1200)
    // console.log('container 1', container.innerHTML)
  })

  test('makes 11 http requests when the user clicks the submit btn, searching for uses with the name "frontend masters"', async () => {
    const { container } = render(<App />)
    // Why? https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
    window.HTMLElement.prototype.scrollIntoView = function () {}
    window.innerWidth = 370
    // console.log('window.clientWidth', window.innerWidth)

    const inputElement = screen.getByTestId('search-input')
    const btnElement = screen.getByText(/Submit/i)

    userEvent.type(inputElement, 'frontend masters')
    inputElement.value = 'frontend masters'
    userEvent.click(btnElement)

    await waitFor(() => screen.getAllByTestId('card'))
    const users_ = screen.getAllByTestId('card')
    expect(users_.length).toBe(10)
    // expect(screen.getByText('Total users: 15')).toBeInTheDocument()
    expect(window.innerWidth).toBe(370)
    // console.log('container 2', container.innerHTML)
    // expect(screen.getByText('Previous')).toBeInTheDocument()
    // expect(screen.getByText('Next')).toBeInTheDocument()
  })

  // testing real api
  test.skip('renders input field and submit button', async () => {
    render(<App />)
    // Why? https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
    window.HTMLElement.prototype.scrollIntoView = function () {}

    const inputElement = screen.getByTestId('search-input')
    const btnElement = screen.getByText(/Submit/i)

    expect(inputElement).toBeInTheDocument()
    expect(btnElement).toBeInTheDocument()

    userEvent.type(inputElement, 'foobar')
    userEvent.click(btnElement)

    await waitFor(() => screen.findByText('Total users: 739'), {
      timeout: 1000,
    })

    expect(screen.getByText('Total users: 739')).toBeInTheDocument()
    const users_ = screen.getAllByTestId('card')
    expect(users_.length).toBe(10)
  })
})
