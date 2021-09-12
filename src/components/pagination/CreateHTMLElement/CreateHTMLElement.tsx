// The difference between isBetweenStyle and currentStyle is the padding
const isBetweenStyle = {
  borderColor: 'transparent',
  padding: '10px 15px',
  borderRadius: '50%',
  background: 'rgb(3, 102, 214)',
  color: 'white',
  boxShadow:
    '10px 10px 10px rgb(0 0 0 / 40%), inset -5px -5px 10px rgb(0 0 0 / 40%)',
}

const currentStyle = {
  borderColor: 'transparent',
  padding: '10px',
  borderRadius: '50%',
  background: 'rgb(3, 102, 214)',
  color: 'white',
  boxShadow:
    '10px 10px 10px rgb(0 0 0 / 40%), inset -5px -5px 10px rgb(0 0 0 / 40%)',
}

const normalBetweenStyle = {
  borderColor: 'transparent',
  padding: '10px 15px',
  borderRadius: '50%',
  boxShadow:
    '10px 10px 10px rgb(0 0 0 / 40%), inset -5px -5px 10px rgb(0 0 0 / 40%)',
}

const normalStyle = {
  borderColor: 'transparent',
  padding: '10px',
  borderRadius: '50%',
  boxShadow:
    '10px 10px 10px rgb(0 0 0 / 40%), inset -5px -5px 10px rgb(0 0 0 / 40%)',
}

const isNumberWithinRange =
  (min: number) =>
  (max: number) =>
  (x: number): boolean =>
    x >= min && x <= max

const isBetween1nd9 = isNumberWithinRange(1)(9)

const pageIsCurrent = (pageNo: number, newPagesArrayIndex: number): boolean =>
  pageNo === newPagesArrayIndex

const isGap = (newPagesArrayIndex: number): boolean => newPagesArrayIndex === -1
const gap = (
  <span data-testid="pagination-gap" className="gap">
    …
  </span>
)

const chooseStyle = (pageNo: number, newPagesArrayIndex: number) => {
  let btnStyle = {}
  // condition 1: is current page
  if (pageIsCurrent(pageNo, newPagesArrayIndex)) {
    // inner condition: page is between 1 and 9
    if (isBetween1nd9(newPagesArrayIndex)) {
      btnStyle = isBetweenStyle
    } else {
      // page is NOT between 1 and 9
      btnStyle = currentStyle
    }
  } // condition 2: is not current page
  else {
    if (isBetween1nd9(newPagesArrayIndex)) {
      btnStyle = normalBetweenStyle
    } else {
      btnStyle = normalStyle
    }
  }
  return btnStyle
}

const Button = ({
  style,
  handleClick,
  children,
}: {
  style: object
  handleClick: () => void
  children: React.ReactNode
}) => {
  return (
    <button
      data-testid="pagination-button"
      className="btn btn-outline-primary btn-sm"
      style={style}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export const CreateHTMLElement = ({
  pageNo,
  newPagesArrayIndex,
  handleClick,
}: {
  pageNo: number
  newPagesArrayIndex: number
  handleClick: () => void
}) => {
  if (isGap(newPagesArrayIndex)) {
    return gap
  }
  const btnStyle = chooseStyle(pageNo, newPagesArrayIndex)
  return (
    <Button style={btnStyle} handleClick={handleClick}>
      {newPagesArrayIndex}
    </Button>
  )
}
