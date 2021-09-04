import React, { FormEvent } from 'react'
import { PageInputForm } from './PageInputForm'

// Input Field which sets page
export const PageNumberInput = ({
  setPageNo,
  lastPage,
}: {
  lastPage: number
  setPageNo: (pageNo: number) => void
}) => {
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
    <PageInputForm
      userInput={userInput}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
