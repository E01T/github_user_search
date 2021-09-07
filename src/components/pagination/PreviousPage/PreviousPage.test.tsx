import { render, screen } from '@testing-library/react'
import { PreviousPage } from './PreviousPage'

describe('NextPage', () => {
  test('it should render NextPage component', () => {
    const setPage = jest.fn()
    render(<PreviousPage pageNo={1} setPageNo={setPage} />)
    expect(screen.getByText('Previous')).toBeInTheDocument()
  })
})
