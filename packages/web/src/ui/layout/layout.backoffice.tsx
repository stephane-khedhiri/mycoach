import {FC} from 'react'
import './assets/css/layouts/main.css'
import {Outlet} from 'react-router-dom'
import {Sidebar} from "./component/sidebar";
import {useAuth} from "../../modules/auth/auth.provider";

export const LayoutBackoffice: FC = () => {
    const {profile} = useAuth()

    return (
        <div className="backoffice">
            <Sidebar email={profile?.email}/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}