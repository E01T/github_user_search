import React, { FormEvent } from 'react'
import { calcNoOfPages, isSequence, createNewPagesArray } from '../utils/utils'
import { ChevronLeft, ChevronRight, Info } from 'react-bootstrap-icons'

// < Previous Page Button
function PreviousPage({
  pageNo,
  setPageNo,
}: {
  pageNo: number
  setPageNo: (pageNo: number) => void
}) {
  const [disabled, setDisabled] = React.useState(false)

  React.useEffect(() => {
    if (pageNo === 1) setDisabled(true)
    else setDisabled(false)
  }, [pageNo])

  return (
    <button
      id="prev-btn"
      className="btn btn-outline-primary btn-sm"
      disabled={disabled}
      onClick={() => setPageNo(pageNo - 1)}
      style={{ borderColor: 'transparent' }}
    >
      <ChevronLeft className="me-2 mb-0" />
      Previous
    </button>
  )
}

// Next Page Button >
function NextPage({
  pageNo,
  setPageNo,
  last_page,
}: {
  pageNo: number
  setPageNo: (pageNo: number) => void
  last_page: number
}) {
  const [disabled, setDisabled] = React.useState(false)

  React.useEffect(() => {
    if (pageNo === last_page) setDisabled(true)
    else setDisabled(false)
  }, [pageNo, last_page])

  return (
    <button
      id="next-btn"
      className="btn btn-outline-primary btn-sm"
      disabled={disabled}
      onClick={() => setPageNo(pageNo + 1)}
      style={{ borderColor: 'transparent' }}
    >
      Next
      <ChevronRight className="ms-2 mb-0" />
    </button>
  )
}

// Input Field which sets page
function PageNumberInput({
  setPageNo,
  lastPage,
}: {
  lastPage: number
  setPageNo: (pageNo: number) => void
}) {
  const [userInput, setUserInput] = React.useState('')

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    setUserInput(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isNaN(Number(userInput)) || userInput === '') {
      setUserInput('')
      return
    }

    if (lastPage < Number(userInput) || Number(userInput) < 1) {
      userInput.trim()
      return
    } else {
      setPageNo(parseInt(userInput))
      setUserInput('')
    }
  }

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

function createPagesList(
  newPagesArray: number[],
  pageNo: number,
  setPageNo: (pageNo: number) => void
) {
  const pages = []
  for (let i = 0; i < newPagesArray.length; i++) {
    pages.push(
      <li
        key={i}
        className="page-item"
        style={{ display: 'inline', margin: '.3em .6em' }}
      >
        {pageNo === newPagesArray[i] ? ( // if this is the current page apply special style
          <button
            className="btn btn-outline-secondary btn-sm pagination-btn"
            style={{
              borderColor: 'transparent',
              padding: '10px',
              borderRadius: '50%',
              background: 'rgb(3, 102, 214)',
              color: 'white',
              boxShadow:
                '10px 10px 10px rgb(0 0 0 / 40%), inset -5px -5px 10px rgb(0 0 0 / 40%)',
            }}
            onClick={() => setPageNo(newPagesArray[i])}
          >
            {newPagesArray[i]}
          </button>
        ) : newPagesArray[i] === -1 ? (
          <span className="gap">…</span>
        ) : (
          <button
            className="btn btn-outline-secondary btn-sm"
            style={{
              borderColor: 'transparent',
              padding: '10px',
              borderRadius: '50%',
              boxShadow:
                '10px 10px 10px rgb(0 0 0 / 40%), inset -5px -5px 10px rgb(0 0 0 / 40%)',
            }}
            onClick={() => setPageNo(newPagesArray[i])}
          >
            {newPagesArray[i]}
          </button>
        )}
      </li>
    )
  }
  return pages
}

const Pagination = ({
  totalCount,
  pageNo,
  setPageNo,
}: {
  totalCount: number
  pageNo: number
  setPageNo: (pageNo: number) => void
}) => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  // Linsten to window resizing evt and set window width
  const getWindowSize = (cb: (num: number) => void) => {
    cb(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', () => getWindowSize(setWindowWidth))
    return () =>
      window.removeEventListener('resize', () => getWindowSize(setWindowWidth))
  }, [windowWidth])

  const noOfPages = calcNoOfPages(totalCount, pageNo, windowWidth)
  const indexes = isSequence(noOfPages)
  const newPagesArray = createNewPagesArray(noOfPages, indexes)
  const last_page = noOfPages[noOfPages.length - 1]
  const pages = createPagesList(newPagesArray, pageNo, setPageNo)

  return pages.length > 0 ? (
    <>
      <div className="d-flex mt-1 justify-content-center text-primary">
        <output id="pages-output" style={{ fontSize: '.8em' }}>
          <Info />
          Pages: {pageNo}/{newPagesArray[newPagesArray.length - 1]}
        </output>
      </div>
      <div id="pages" style={{ maxWidth: '100%' }}>
        <div id="previous-page-comp">
          <PreviousPage pageNo={pageNo} setPageNo={setPageNo} />
        </div>
        {windowWidth > 589 ? (
          <div id="pages-ul">
            <ul style={{ display: 'inline', padding: '0 5px' }}>{pages}</ul>
          </div>
        ) : (
          <PageNumberInput lastPage={last_page} setPageNo={setPageNo} />
        )}

        <div id="next-page-comp">
          <NextPage
            pageNo={pageNo}
            setPageNo={setPageNo}
            last_page={last_page}
          />
        </div>
      </div>
    </>
  ) : null
}

export const MemoizedPagination = React.memo(Pagination)
