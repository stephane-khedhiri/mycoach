import {DetailedHTMLProps, FunctionComponent, HTMLAttributes} from "react";
import './index.css'
type NavbarLinksPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export type NavbarLinksProp = NavbarLinksPropsType & {
    children: HTMLLinkElement | HTMLLinkElement[]
}

export const NavbarLinks: FunctionComponent<NavbarLinksPropsType> = ({className, children}) => {
    return (
        <div className={className?? 'hidden w-full md:block md:w-auto'}>
            <ul className={"container_link"}>
                {Array.isArray(children)
                    ? children.map((child, index) =>
                        <li key={index}>{child}</li>
                    )
                    : children
                }
            </ul>
        </div>
    )
}