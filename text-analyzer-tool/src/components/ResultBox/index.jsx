import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/state'

import './index.scss'

const ResultBox = () => {
  const state = useContext(AppContext)
  const { input, updateInput } = state

  const resultBar = [
    {
      title: 'Words',
      value: 0,
    },
    {
      title: 'Characters',
      value: 0,
    },
    {
      title: 'Sentences',
      value: 0,
    },
    {
      title: 'Paragraphs',
      value: 0,
    },
    {
      title: 'Pronouns',
      value: 0,
    },
  ]

  const [fieldValues, handleFieldValues] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    pronouns: 0,
  })

  useEffect(() => {
    let textLength = input.textArea ? input.textArea.length : 0;
    let paragraphsCount = 0;
    let wordCount = 0;
    let sentenceCount = 0;

    if (input.textArea) {
      for (let i = 0; i < input.textArea.length; i++) {
        let char = input.textArea[i]

        if (char === '\n') {
          paragraphsCount++
        }
        if (char === ' ') {
          wordCount++
        }
        if (char === '.') {
          sentenceCount++
        }
      }
    }

    handleFieldValues({
      ...fieldValues,
      characters: textLength,
      paragraphs: paragraphsCount,
      words: wordCount,
      sentences: sentenceCount,
    })

  }, [input])

  return (
    <div className="result-bar">
      {resultBar.map(({title, value}) => {
        let newVal = fieldValues[title.toLocaleLowerCase()]
        return (
          <div className="result-box" key={title}>
            <span className="box-title">{title}</span>
            <span className="box-value">{newVal}</span>
          </div>
        )
      })}
    </div>
  )
}

export default ResultBox


// const resultBar = [
//   {
//     title: 'Words',
//     value: 0,
//   },
//   {
//     title: 'Characters',
//     value: 0,
//   },
//   {
//     title: 'Sentences',
//     value: 0,
//   },
//   {
//     title: 'Paragraphs ',
//     value: 0,
//   },
//   {
//     title: 'Pronouns',
//     value: 0,
//   },
// ]