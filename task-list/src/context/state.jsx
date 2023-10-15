import { createContext, useContext, useCallback, useState, useEffect } from 'react';
const AppContext = createContext();

const AppWrapper = ({children}) => {

  const [modalOpen, handleModalOpen] = useState({
    addAndEditModal: false,
    deleteModal: false,
  })

  const updateModalOpen = (name, bool) => {
    handleModalOpen({
      ...modalOpen,
      [name] : bool
    })
  }

  const sharedState = {
    modalOpen,
    updateModalOpen,
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppWrapper };