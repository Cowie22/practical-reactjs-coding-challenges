import { createContext, useContext, useCallback, useState, useEffect } from 'react';
const AppContext = createContext();

const AppWrapper = ({children}) => {

  const [input, handleInput] = useState({})

  const updateInput = (evt) => {
    const { name, value } = evt.target
    handleInput({
      ...input,
      [name] : value
    })
  }

  const sharedState = {
    input,
    updateInput,
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppWrapper };