import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FindUserForm } from './FindUserForm'

describe('FindUserForm component', () => {
  afterEach(cleanup)

  test('It render FindUserForm element', () => {
    const onSubmit = jest.fn()
    const onChange = jest.fn()
    const userInput = ''
    const { getByTestId, getByText } = render(
      <FindUserForm
        handleSubmit={onSubmit}
        inputValue={userInput}
        handleChange={onChange}
      />
    )
    const inputElement = getByTestId('search-input')
    const btnElement = getByText(/Submit/i)

    expect(inputElement).toBeInTheDocument()
    expect(btnElement).toBeInTheDocument()
  })

  test('On first render, the text input placeholder should be "Search for users"', () => {
    const onSubmit = jest.fn()
    const onChange = jest.fn()
    const userInput = ''

    render(
      <FindUserForm
        handleSubmit={onSubmit}
        inputValue={userInput}
        handleChange={onChange}
      />
    )

    // On first render the text input placeholder should be 'Search for users'
    const placeholder = screen.queryByPlaceholderText(/Search for users/i)
    expect(placeholder).toBeInTheDocument()
  })

  test('On change (when user types) FindUsersForm component will get the value "foobar"', async () => {
    const onSubmit = jest.fn()
    const onChange = jest.fn()

    const { getByTestId } = render(
      <FindUserForm
        handleSubmit={onSubmit}
        inputValue="foobar"
        handleChange={onChange}
      />
    )
    const inputElement = getByTestId('search-input')
    userEvent.type(inputElement, 'foobar')
    expect(onChange).toHaveBeenCalledTimes(6)
    expect(getByTestId('search-input')).toHaveValue('foobar')
  })

  test('On submit(btn click) the current input value "foobar" will become empty', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault())
    const onChange = jest.fn()
    let userInput = ''

    const { getByTestId, getByText, getByLabelText } = render(
      <FindUserForm
        handleSubmit={onSubmit}
        inputValue={userInput}
        handleChange={onChange}
      />
    )

    const inputElement = getByLabelText('Search for users')
    const btnElement = getByText(/Submit/i)

    expect(inputElement).toBeInTheDocument()
    expect(btnElement).toBeInTheDocument()

    userEvent.type(inputElement, 'foobar')
    expect(onChange).toHaveBeenCalledTimes(6)
    fireEvent.change(inputElement, { target: { value: 'foobar' } })
    // console.log(screen.getByTestId('search-input'))
    inputElement.value = 'foobar'
    expect(inputElement).toHaveValue('foobar')

    userEvent.click(btnElement)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    fireEvent.change(inputElement, { target: { value: '' } })
    expect(screen.getByTestId('search-input')).toHaveValue('')
  })
})
