import {FC} from 'react'
import './assets/css/layouts/main.css'
import {LinkNavbar} from "./component/navbar/components/linknavbar";
import {NavBar} from "./component/navbar";
import {Outlet} from 'react-router-dom'


export const DefaultLayout: FC = () => {
    return (
        <div className="main">
            <header>
                <NavBar>
                    <LinkNavbar to={'/home'}>home</LinkNavbar>
                    <LinkNavbar to={'/auth/Login'}>Login</LinkNavbar>
                </NavBar>
            </header>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}