import React from 'react'
import { InputTypeProps } from '@ui/component/inputs'

type InputTextProps = InputTypeProps

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
  return (
    <input type={'text'} {...props} ref={ref} />
  )
})
