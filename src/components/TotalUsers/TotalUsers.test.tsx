import { render, screen, cleanup } from '@testing-library/react'
import { TotalUsers } from './TotalUsers'

describe('TotalUsers', () => {
  afterEach(cleanup)

  test('it renders the component with the text Total users: 739', async () => {
    render(<TotalUsers totalUsers={739} />)
    expect(screen.getByTestId('total-users')).toBeInTheDocument()
    expect(screen.getByTestId('total-users')).toHaveTextContent(
      'Total users: 739'
    )
  })

  test('it renders the component with the text Total users: 15', async () => {
    render(<TotalUsers totalUsers={15} />)
    expect(screen.getByTestId('total-users')).toBeInTheDocument()
    expect(screen.getByTestId('total-users')).toHaveTextContent(
      'Total users: 15'
    )
  })
})
