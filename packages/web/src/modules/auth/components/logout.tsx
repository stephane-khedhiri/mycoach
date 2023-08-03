import {useEffect} from "react";
import {useAuth} from "../auth.provider";
import {useNavigate} from "react-router-dom";


export const Logout = () => {
    const {saveToken} = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        saveToken(null)
        navigate('/auth')
    }, [])

    return (<></>)
}