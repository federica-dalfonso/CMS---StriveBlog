import { createContext } from "react";
import { useState, useEffect } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider ({children}) {

    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [authorId, setAuthorId] = useState(localStorage.getItem("authorId") || "");
    const [authenticated, setAuthenticated] = useState(token !== "");


    //per lo stato di autenticazione delle routes:
    useEffect(() => {
        setAuthenticated(token !== "");
    }, [token]);

    const value = {token, setToken, authorId, setAuthorId, authenticated, setAuthenticated};

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
}