import { FormEvent } from 'react'
export const PageInputForm = ({
  userInput,
  handleChange,
  handleSubmit,
}: {
  userInput: string
  handleChange: (e: FormEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}) => {
  return (
    <form
      data-testid="form-for-page-number-input"
      id="page-number-input"
      className="d-flex justify-content-center"
      onSubmit={handleSubmit}
    >
      <label
        style={{ display: 'none' }}
        className="form-label"
        htmlFor="page-no"
      >
        Page No:
      </label>
      <input
        data-testid="page-number-input"
        id="page-no"
        autoComplete="off"
        type="text"
        maxLength={2}
        className="form-control form-control-inline"
        placeholder="#"
        value={userInput}
        onChange={handleChange}
      />
      <button
        data-testid="page-no-submit"
        style={{ display: 'inline' }}
        className="btn btn-outline-primary"
        type="submit"
      >
        Go
      </button>
    </form>
  )
}
