import {DetailedHTMLProps, FunctionComponent, LinkHTMLAttributes} from "react";
type LinkPropsType = DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>

export type LinkProps = Omit<LinkPropsType, 'href'> & {
    to: string
    children: string
}

export const LinkNavbar: FunctionComponent<LinkProps> = (props) => {
    return (
        <a href={props.to} className={`link_nav ${props.className}`}>
            {props.children}
        </a>
    )
}