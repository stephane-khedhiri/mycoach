import React from 'react'
import type { InputTypeProps } from './../index'

type InputTextProps = InputTypeProps

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
  return (
    <input type={'text'} {...props} ref={ref} />
  )
})
