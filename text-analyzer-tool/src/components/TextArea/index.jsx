import { useContext, useState } from 'react'
import { AppContext } from '../../context/state'
import './index.scss'

const TextArea = () => {
  const state = useContext(AppContext)
  const { input, updateInput } = state

  return (
    <textarea
      className="text-area"
      placeholder="Paste your text here..."
      name='textArea'
      value={input.textArea ? input.textArea : ''}
      onChange={updateInput}
    />
  )
}

export default TextArea
