import { useState } from "react";
import { createContext } from "react";

export const userContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
    let [currentUser, setCurrentUser] = useState(null)
    let value = { currentUser, setCurrentUser }
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>

    )

}