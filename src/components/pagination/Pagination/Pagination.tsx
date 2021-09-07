import React from 'react'
import {
  calcNoOfPages,
  isSequence,
  createNewPagesArray,
} from '../pagination_logic/utils'
import { Info } from 'react-bootstrap-icons'
import { PreviousPage } from '../PreviousPage/PreviousPage'
import { NextPage } from '../NextPage/NextPage'
import { CreateHTMLElement } from '../CreateHTMLElement/CreateHTMLElement'
import { PageNumberInput } from '../PageNumberInput/PageNumberInput'

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
        <CreateHTMLElement
          pageNo={pageNo}
          newPagesArrayIndex={newPagesArray[i]}
          handleClick={() => setPageNo(newPagesArray[i])}
        />
      </li>
    )
  }
  return pages
}

// Linsten to window resizing evt and set window width
const getWindowSize = (cb: (num: number) => void) => {
  cb(window.innerWidth)
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

  React.useEffect(() => {
    window.addEventListener('resize', () => getWindowSize(setWindowWidth))
    return () =>
      window.removeEventListener('resize', () => getWindowSize(setWindowWidth))
  }, [windowWidth])

  const noOfPages = calcNoOfPages(totalCount, pageNo, windowWidth)
  const indexes = isSequence(noOfPages)
  const newPagesArray = createNewPagesArray(noOfPages, indexes)
  const lastPage = noOfPages[noOfPages.length - 1]
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
          <PageNumberInput lastPage={lastPage} setPageNo={setPageNo} />
        )}

        <div id="next-page-comp">
          <NextPage pageNo={pageNo} setPageNo={setPageNo} lastPage={lastPage} />
        </div>
      </div>
    </>
  ) : null
}

export const MemoizedPagination = React.memo(Pagination)
