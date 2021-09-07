import { render, screen } from '@testing-library/react'
import { NextPage } from './NextPage'

describe('NextPage', () => {
  test('it should render NextPage component', () => {
    const setPage = jest.fn()
    render(<NextPage pageNo={1} setPageNo={setPage} lastPage={74} />)
    expect(screen.getByText('Next')).toBeInTheDocument()
  })
})
