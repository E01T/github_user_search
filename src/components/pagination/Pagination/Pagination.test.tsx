import { render, screen, cleanup } from '@testing-library/react'
import { MemoizedPagination } from './Pagination'

describe('Pagination', () => {
  afterEach(cleanup)

  test('it renders Pagination component', () => {
    const setPageNumber = jest.fn()

    const { container } = render(
      <MemoizedPagination
        totalCount={739}
        pageNo={1}
        setPageNo={setPageNumber}
      />
    )
    expect(container).toBeInTheDocument()
  })
})
