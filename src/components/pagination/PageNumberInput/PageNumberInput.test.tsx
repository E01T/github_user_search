import { render, cleanup, screen } from '@testing-library/react'
import { PageNumberInput } from './PageNumberInput'

describe('PageNumberInput', () => {
  afterEach(cleanup)

  test('it should render PageNumberInput component with the subcomponent(PageInputForm)', () => {
    const setPageNumber = jest.fn()
    const { container } = render(
      <PageNumberInput lastPage={74} setPageNo={setPageNumber} />
    )
    const form = screen.getByTestId('form-for-page-number-input')
    const input = screen.getByTestId('page-number-input')
    const btn = screen.getByText('Go')

    expect(container).toBeInTheDocument()
    expect(form).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(btn).toBeInTheDocument()
  })
})
