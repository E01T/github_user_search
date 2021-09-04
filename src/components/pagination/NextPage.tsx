import React from 'react'
import { ChevronRight } from 'react-bootstrap-icons'

export const NextPage = ({
  pageNo,
  setPageNo,
  last_page,
}: {
  pageNo: number
  setPageNo: (pageNo: number) => void
  last_page: number
}) => {
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
