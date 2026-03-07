import React from 'react'

export const FrontendAuthContext = React.createContext();

const FrontendAuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    const logout = () => {
        setUser(null);
    }
   


  return (
    <FrontendAuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </FrontendAuthContext.Provider >
  )
}

export default FrontendAuthProvider