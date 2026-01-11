import { createContext , useState , useEffect } from "react";

export const AdminAuthContext = createContext()

export const AdminAuthProvider = ({children}) => {
    const [ loginStatus , setLoginStatus ] = useState(false)


    return(
        <AdminAuthContext.Provider value={{ loginStatus , setLoginStatus }}>
            {children}
        </AdminAuthContext.Provider>
    )
}