import React from 'react'
import { ChevronRight } from 'react-bootstrap-icons'

export const NextPage = ({
  pageNo,
  setPageNo,
  lastPage,
}: {
  pageNo: number
  setPageNo: (pageNo: number) => void
  lastPage: number
}) => {
  const [disabled, setDisabled] = React.useState(false)

  React.useEffect(() => {
    if (pageNo === lastPage) setDisabled(true)
    else setDisabled(false)
  }, [pageNo, lastPage])

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
