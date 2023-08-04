import {Logo} from "../logo";

import('./index.css')
import {ThemeColors} from "../../theme";
import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes} from 'react'
import {NavbarLinks} from "./components/navbarLinks";


type NavbarPropsType = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export type NavBarProps = NavbarPropsType & {
    children: React.ReactNode | React.ReactNode[]
    color?: ThemeColors
}
export const NavBar: FunctionComponent<NavBarProps> = (props) => {

    return (
        <nav {...props}>
            <div className={"navbar_container"}>
                <Logo/>
            <NavbarLinks>
                {props.children}
            </NavbarLinks>
            </div>
        </nav>
    )
}