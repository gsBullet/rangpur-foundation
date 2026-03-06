import React from 'react'

export const FrontendAuthContext = React.createContext();

const FrontendAuthContextProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
   


  return (
    <FrontendAuthContext.Provider value={{ user, setUser }}>
      {children}
    </FrontendAuthContext.Provider >
  )
}

export default FrontendAuthContextProvider