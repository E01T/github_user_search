import { render, screen, cleanup } from '@testing-library/react'
import { OutputMessage } from './OutputMessage'

describe('OutputMessage', () => {
  afterEach(cleanup)

  test('it renders the component with the text Hello', async () => {
    render(<OutputMessage outputMessage="Hello" />)
    expect(screen.getByTestId('output-message')).toBeInTheDocument()
    expect(screen.getByTestId('output-message')).toHaveTextContent('Hello')
  })

  test('it renders the component without text (empty string)', async () => {
    render(<OutputMessage outputMessage="" />)
    expect(screen.getByTestId('output-message')).toBeInTheDocument()
    expect(screen.getByTestId('output-message')).toHaveTextContent('')
    expect(screen.getByTestId('output-message')).toBeEmptyDOMElement()
  })
})
