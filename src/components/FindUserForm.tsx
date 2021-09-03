import { FormEvent } from 'react'
import { Search } from 'react-bootstrap-icons'

export const FindUserForm = ({
  handleSubmit,
  inputValue,
  handleChange,
}: {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  inputValue: string
  handleChange: (e: FormEvent<HTMLInputElement>) => void
}) => {
  return (
    <form
      className="d-flex justify-content-center mt-2"
      onSubmit={handleSubmit}
    >
      <div className="col-auto">
        <label
          className="form-label visually-hidden"
          style={{ marginRight: '.3em' }}
          htmlFor="search"
        >
          Find users
        </label>
      </div>
      <div className="col-auto">
        <div className="input-group mb-3">
          <span className="input-group-text">
            <Search />
          </span>
          <input
            data-testid="search-input"
            id="search"
            className="form-control"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search for users"
          />
        </div>
      </div>
      <div className="col-auto">
        <button className="btn btn-outline-secondary" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}
