import React, {ButtonHTMLAttributes, DetailedHTMLProps, FunctionComponent} from "react"
import {ButtonTypes, ThemeColors, ThemeSizes} from "./../../theme";
import './index.css'

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
    rounded?: boolean
}
export const Button: FunctionComponent<ButtonProps> = ({
    className,
    children,
    color,
    types,
    size,
    rounded,
    onClick}  ) => {
    const classNames = [`btn`, className]
    if(types && types.toUpperCase() in ButtonTypes ){
        classNames.push(`btn-${types}`)
        classNames.push(color && color in ThemeColors ? `btn-${types}-${color}`: `btn-${types}-primary`)
    }else{
        classNames.push(`btn-${color?? ThemeColors.PRIMARY}`)
    }
    if(rounded){
        classNames.push(`btn-rounded`)
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