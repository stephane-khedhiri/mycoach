import React, {FunctionComponent, useContext, createContext, useState} from "react";
import {CoachType} from "../../service/coach.service";


type ProfileType = Omit<CoachType, 'password' | 'apiPaypal'>
export type AuthContextType = {
    saveToken: (value: string | null) => void
    token: string | null
    setProfile: React.Dispatch<React.SetStateAction<ProfileType | undefined>>
    profile: ProfileType | undefined
}


export const useAuthProvider = () => {
    const [profile, setProfile] = useState<ProfileType | undefined>(undefined)
    const [token, setToken] = useState<string | null>(null)
    const saveToken = (value: string | null) => {
        if (value) {
            setToken(value)
            localStorage.setItem('token', value)
        } else {
            setToken(null)
            localStorage.removeItem('token')
        }
    }

    return {
        token,
        saveToken,
        profile,
        setProfile
    }
}
export const authContext = createContext<AuthContextType | undefined>(undefined)


export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context
}

export const AuthProvider: FunctionComponent<{
    children: React.ReactNode
}> = ({children}) => {
    const auth = useAuthProvider()
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

