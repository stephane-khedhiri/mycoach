import React from 'react'
import './assets/css/layouts/main.css'
import {LinkNavbar} from "./component/navbar/components/linknavbar";
import {NavBar} from "./component/navbar";
import {useAuth} from "../../modules/auth/auth.provider";
import {Sidebar} from "./component/sidebar";

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[]
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    const {IsAuth} = useAuth()
    return (

        <div className="main">
            {!IsAuth ?
                <header>

                    <NavBar>
                        <LinkNavbar to={'/home'}>home</LinkNavbar>
                        <LinkNavbar to={'/Login'}>Login</LinkNavbar>
                    </NavBar>
                </header>
                :
                <Sidebar/>

            }


            <div className="content">
                {Array.isArray(children) ? children.map((child) => child) : children}
            </div>
        </div>

    )
}