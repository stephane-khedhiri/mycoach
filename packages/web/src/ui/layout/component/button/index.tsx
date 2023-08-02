import React, {ButtonHTMLAttributes, DetailedHTMLProps, FunctionComponent} from "react"
import {ButtonTypes, ThemeSizes} from "./../../theme";

type ButtonPropsType = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

export type ButtonProps = ButtonPropsType & {
    color?: string,
    children: React.ReactNode | React.ReactNode[]
    className?: string
    types?: ButtonTypes
    size?: ThemeSizes
    onClick?: Function
}
export const Button: FunctionComponent<ButtonProps> = ({
    className,
    children,
    color,
    types,
    size,
    onClick}  ) => {
    const classNames = ['btn', className]
    if (color){
        classNames.push(`btn-${color}`)
    }
    if(types){
        classNames.push(`btn-${types}`)
    }
    if(size){
        classNames.push(`btn-${size}`)
    }
    return (
        <button className={classNames.join(' ')} onClick={onClick} >
            {Array.isArray(children)
                ? children.map((child, index) =>
                    typeof child === 'string' ? <span key={index}>{child}</span>: child
                )
                : children
            }
        </button>
    )
}