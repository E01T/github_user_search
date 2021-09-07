import React from 'react'
import { ChevronLeft } from 'react-bootstrap-icons'

export const PreviousPage = ({
  pageNo,
  setPageNo,
}: {
  pageNo: number
  setPageNo: (pageNo: number) => void
}) => {
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
