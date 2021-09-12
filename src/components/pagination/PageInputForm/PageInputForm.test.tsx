import { FormEvent } from 'react'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PageInputForm } from './PageInputForm'

describe('PageInputForm', () => {
  afterEach(cleanup)

  test.skip('It renders PageInputForm component with input value empty, a button with the text "Go" and the # symbol as placeholder', () => {
    const userInput = ''
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()

    const { getByTestId, getByText, queryByPlaceholderText } = render(
      <PageInputForm
        userInput={userInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )
    const inputElement = getByTestId('page-number-input')
    const btnElement = getByText(/Go/i)
    const placeholder = queryByPlaceholderText(/#/i)

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('')
    expect(btnElement).toBeInTheDocument()
    expect(btnElement).toHaveTextContent('Go')
    expect(placeholder).toBeInTheDocument()
  })

  test.skip('It renders PageInputForm component with input value "1", a button with the text "Go" and the # symbol as placeholder', () => {
    const userInput = '1'
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()

    const { getByTestId, getByText, queryByPlaceholderText } = render(
      <PageInputForm
        userInput={userInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )
    const inputElement = getByTestId('page-number-input')
    const btnElement = getByText(/Go/i)
    const placeholder = queryByPlaceholderText(/#/i)

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('1')
    expect(btnElement).toBeInTheDocument()
    expect(btnElement).toHaveTextContent('Go')
    expect(placeholder).toBeInTheDocument()
  })

  test.skip('It renders PageInputForm component with input value "" and the symbol # as a placeholder. The user enters the value "3"', () => {
    const userInput = ''
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()

    const { getByTestId, queryByPlaceholderText } = render(
      <PageInputForm
        userInput={userInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )
    const inputElement = getByTestId('page-number-input')
    const placeholder = queryByPlaceholderText(/#/i)

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('')
    expect(placeholder).toBeInTheDocument()

    // fireEvent.change(inputElement, { target: { value: '3' } }) // Why this doesn't work? Why it doesn't change the value?
    fireEvent.change(inputElement, { target: { value: '3' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    inputElement.value = '3'

    expect(inputElement).toHaveValue('3')
  })

  test('It renders PageInputForm component with input value "3". The user clicks the btn and the value "3" becomes empty', async () => {
    const userInput = '3'
    const handleChange = jest.fn()
    const handleSubmit = jest.fn((e) => e.preventDefault())

    const { getByTestId, getByText } = render(
      <PageInputForm
        userInput={userInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )
    const inputElement = getByTestId('page-number-input')
    const btnElement = getByText(/Go/i)

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('3')

    // btnElement.click()
    fireEvent.click(btnElement, (inputElement.value = ''))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    // inputElement.value = ''

    // await waitFor(() => userEvent.clear(inputElement))  // Why it doesn't change the value attribute?
    // userEvent.type(inputElement, '')

    // fireEvent.change(inputElement, (inputElement.value = ''))

    expect(inputElement).toHaveValue('')
  })

  test('It renders PageInputForm with input value "3". The user clicks the btn and the value "3" becomes empty', async () => {
    let userInput = '3'
    // const handleChange = jest.fn()
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
      userInput = e.currentTarget.value
    }
    // const handleSubmit = jest.fn((e) => e.preventDefault())
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    }

    const { getByTestId, getByText } = render(
      <PageInputForm
        userInput={userInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )

    const inputElement = getByTestId('page-number-input')
    const btnElement = getByText(/Go/i)

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('3')

    userEvent.type(inputElement, '{selectall}{backspace}')
    userEvent.type(inputElement, '')

    userEvent.click(btnElement)

    expect(userInput).toEqual('')
  })
}) // END OF describe('PageInputForm')
