import React from 'react'
import './assets/css/layouts/main.css'
import {LinkNavbar} from "./component/navbar/components/linknavbar";
import {NavBar} from "./component/navbar";


interface LayoutProps {
    children: React.ReactNode | React.ReactNode[]
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    return (

        <div className="main">

                <header>

                    <NavBar>
                        <LinkNavbar to={'/home'}>home</LinkNavbar>
                        <LinkNavbar to={'/auth/Login'}>Login</LinkNavbar>
                    </NavBar>
                </header>





            <div className="content">
                {Array.isArray(children) ? children.map((child) => child) : children}
            </div>
        </div>

    )
}