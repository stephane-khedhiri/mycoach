import React,{FunctionComponent, useContext, createContext} from "react";
import {CookiesProvider, useCookies} from "react-cookie";
import {Redirect} from "../../routing";





export type AuthContextType = {


    coach: {
        login: (token: string) => void
    }

    logout: () => void
    IsAuth: () => boolean
}
export const useAuthProvider = () => {
    const [cookies, setCookie, removeCookie] = useCookies()

    const IsAuth = () => {
        if (!cookies.token) {
            return false
        }
        return true
    }
    const logout = () => {
        removeCookie('token')
        return <Redirect to={'/home'}/>
    }
    const coach = {
        login : (token: string) => {
            setCookie('token', token)
        }
    }

    return {
        IsAuth,
        logout,
        coach,
    }
}
export const authContext = createContext<AuthContextType | undefined>( undefined)



export const useAuth = () => {
    const context = useContext(authContext)
    if(!context){
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context
}

export const AuthWrappedProvider: FunctionComponent<{
    children: React.ReactNode
}> = ({children}) => {
    const auth = useAuthProvider()
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export const AuthProvider: FunctionComponent<{
    children: React.ReactNode
}> = ({children}) => (
    <CookiesProvider>
        <AuthWrappedProvider>
            {children}
        </AuthWrappedProvider>
    </CookiesProvider>
)