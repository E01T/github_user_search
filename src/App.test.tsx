import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { handlers } from './mock_handlers/handlers'
import App from './App'

// Start the Mock Service Worker
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

afterEach(cleanup)

describe('App', () => {
  test('makes 11 http requests when the user clicks the submit btn, searching for uses with the name "foobar"', async () => {
    render(<App />)

    // Why? https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
    window.HTMLElement.prototype.scrollIntoView = function () {}
    window.innerWidth = 1200

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

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('makes 11 http requests when the user clicks the submit btn, searching for uses with the name "frontend masters"', async () => {
    render(<App />)
    const screenWidth = 370
    // Why? https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
    window.HTMLElement.prototype.scrollIntoView = function () {}
    window.innerWidth = screenWidth

    const inputElement = screen.getByTestId('search-input')
    const btnElement = screen.getByText(/Submit/i)

    userEvent.type(inputElement, 'frontend masters')
    inputElement.value = 'frontend masters'
    userEvent.click(btnElement)

    await waitFor(() => screen.getAllByTestId('card'))
    const users_ = screen.getAllByTestId('card')
    expect(users_.length).toBe(15)
    expect(screen.getByText('Total users: 15')).toBeInTheDocument()
    expect(window.innerWidth).toBe(screenWidth)

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  test('makes 1 http requests when the user clicks the submit btn, searching for uses with the name "lX0?qB1&pI6)jS4*"', async () => {
    render(<App />)
    const screenWidth = 1200
    window.innerWidth = screenWidth

    const inputElement = screen.getByTestId('search-input')
    const btnElement = screen.getByText(/Submit/i)

    userEvent.type(inputElement, 'lX0?qB1&pI6)jS4*')
    inputElement.value = 'lX0?qB1&pI6)jS4*'
    userEvent.click(btnElement)

    await waitFor(() => screen.getAllByText('No users found'))
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('No users found')).toBeInTheDocument()
    expect(screen.getByRole('alert').textContent).toMatchSnapshot(
      'No users found'
    )
    expect(window.innerWidth).toBe(screenWidth)
  })

  test('emulates a server error 503 "Service Unavailable"', async () => {
    server.use(
      rest.get('https://api.github.com/search/users', async (req, res, ctx) => {
        return res(
          ctx.status(503),
          ctx.json({
            message: 'Service Unavailable',
          })
        )
      })
    )

    render(<App />)

    const inputElement = screen.getByTestId('search-input')
    const btnElement = screen.getByText(/Submit/i)

    userEvent.type(inputElement, 'whatever')
    inputElement.value = 'whatever'
    userEvent.click(btnElement)

    // sos
    await waitFor(() => screen.getByText('Service Unavailable'), {
      timeout: 2000,
    })

    expect(screen.getByText('Service Unavailable')).toBeInTheDocument()
  })

  test('emulates a generic network error. This triggers the catch block.', async () => {
    server.use(
      rest.get('https://api.github.com/search/users', async (req, res, ctx) => {
        return res.networkError('Internal server error (500)')
      })
    )

    render(<App />)

    const inputElement = screen.getByTestId('search-input')
    const btnElement = screen.getByText(/Submit/i)

    userEvent.type(inputElement, 'any value goes')
    inputElement.value = 'any value goes'
    userEvent.click(btnElement)

    // sos
    await waitFor(() => screen.getByText('Network request failed'), {
      timeout: 2000,
    })

    expect(screen.getByText('Network request failed')).toBeInTheDocument()
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
