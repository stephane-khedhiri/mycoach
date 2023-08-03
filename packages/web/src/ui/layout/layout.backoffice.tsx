import {FC, useEffect} from 'react'
import './assets/css/layouts/main.css'
import {Outlet, useNavigate} from 'react-router-dom'
import {Sidebar} from "./component/sidebar";
import {useAuth} from "../../modules/auth/auth.provider";

export const LayoutBackoffice: FC = () => {
    const {token, profile} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token || !profile) {
            navigate('/auth/')
        }
    }, [])

    return (
        <div className="main">
            <Sidebar email={profile?.email}/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}