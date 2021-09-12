import { render, screen, cleanup } from '@testing-library/react'
import { MemoizedPageView } from './UsersView'
import mockUsers from '../../mock_data/users_10.json'

const users = mockUsers.users

describe('UsersView component', () => {
  afterEach(cleanup)

  test('it renders the component with 10 users (cards)', async () => {
    render(
      <MemoizedPageView users={users}>
        <h1 data-testid="hello">Hello</h1>
      </MemoizedPageView>
    )
    // console.log(screen.getAllByTestId('card'))
    expect(screen.getAllByTestId('card').length).toEqual(10)
    expect(screen.getByTestId('hello')).toHaveTextContent('Hello')
  })
})
