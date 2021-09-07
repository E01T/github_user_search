import { render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { CreateHTMLElement } from './CreateHTMLElement'

describe('CreateHTMLElement', () => {
  afterEach(cleanup)

  test('it renders CreateHTMLElement component', () => {
    const handleClick = jest.fn()
    render(
      <CreateHTMLElement
        pageNo={1}
        newPagesArrayIndex={0}
        handleClick={handleClick}
      />
    )
  })

  test('it should create a button element', () => {
    const handleClick = jest.fn()
    const { getByTestId } = render(
      <CreateHTMLElement
        pageNo={1}
        newPagesArrayIndex={1}
        handleClick={handleClick}
      />
    )

    // console.log(getByTestId('pagination-button'))
    const btn = getByTestId('pagination-button')
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveClass('btn btn-outline-primary btn-sm')
  })

  test('it should create a gap(...) element', () => {
    const handleClick = jest.fn()
    const { getByTestId } = render(
      <CreateHTMLElement
        pageNo={1}
        newPagesArrayIndex={-1}
        handleClick={handleClick}
      />
    )

    // console.log(getByTestId('pagination-button'))
    const gap = getByTestId('pagination-gap')
    expect(gap).toBeInTheDocument()
    expect(gap).toHaveClass('gap')
  })
})
