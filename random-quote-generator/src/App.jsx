import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import "./App.css"

import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentQuote, handleCurrentQuote] = useState(0)
  const [prevQuote, handlePrevQuote] = useState([])

  useEffect(() => {
    setLoading(true)

    axios
      .get("http://localhost:4000/quotes")
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const updateCurrentQuote = () => {
    let maxIndex = data.length
    let randomNum = Math.floor(Math.random() * maxIndex)
    let prevQuoteList = prevQuote.concat([currentQuote])
    handlePrevQuote(prevQuoteList)
    handleCurrentQuote(randomNum)
  }

  const handleBackBtn = () => {
    if (prevQuote.length < 1) {
      return
    }
    let lastQuote = prevQuote[prevQuote.length - 1]
    let newLastQuotes = prevQuote.slice(0, prevQuote.length - 1)
    handlePrevQuote(newLastQuotes)
    handleCurrentQuote(lastQuote)
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <header>
            <div className="top-strip" />
          </header>
          <div className="container">
            <div className="quotation-box ">
              <Quotation />
              {data.map((quotes, i) => {
                const { quote, author } = quotes
                return (
                  currentQuote === i && (
                    <div className="quote" key={`${author}-${i}`}>
                      <p>{quote}</p>
                      <span>- {author}</span>
                    </div>
                  )
                )
              })}
              <div className="bottom-navigation">
                <div>
                  <Button
                    className={classnames("rotate cp")}
                    onClick={handleBackBtn}
                  />
                  <Button className="cp" onClick={updateCurrentQuote} />
                </div>
                <div className="share">
                  <span>Share At:</span>
                  <Twitter title="Post this quote on twitter!" className="cp" />
                  <Whatsapp
                    title="Post this quote on WhatsApp!"
                    className="cp"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-strip" />
        </>
      )}
    </>
  )
}

export default App
