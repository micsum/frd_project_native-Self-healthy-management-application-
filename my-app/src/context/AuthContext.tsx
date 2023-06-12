import { createContext, useContext, useState } from "react";
import { AuthProps } from "../utils/type";

const AuthContext = createContext<AuthProps>({})

export const useAuth =()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}:any)=>{
    const [authState, setAuthState] = useState<{
        token:string | null;
        authenticated : boolean | null;
    }>({token:null, authenticated:null})
    const value ={}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}