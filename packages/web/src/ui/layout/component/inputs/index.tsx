import React from 'react'
import 'index.css'
export * from './components/input.email'
export * from "./components/input.text"
export * from "./components/input.password"

export type InputTypeProps = Omit<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'type'
>