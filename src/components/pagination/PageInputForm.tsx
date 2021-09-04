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
        style={{ display: 'inline' }}
        className="btn btn-outline-primary"
        type="submit"
      >
        Go
      </button>
    </form>
  )
}
