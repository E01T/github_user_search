import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MockUsers from './mock_data/users.json'
import SearchAPI from './mock_data/search_api.json'
import App from './App'

// console.log(MockUsers.users)
afterEach(cleanup)

describe('App', () => {
  test('renders input field and submit button', async () => {
    render(<App />)

    // window.fetch = jest.fn(() => {
    //   const users = { items: MockUsers.users, total_count: 739 }
    //   return Promise.resolve({
    //     json: () => {
    //       return Promise.resolve(users)
    //     },
    //   })
    // })

    // jest.mock(fetch)
    // fetch.get.mockResolvedValue((res:any) => res.json(MockUsers.users));

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
