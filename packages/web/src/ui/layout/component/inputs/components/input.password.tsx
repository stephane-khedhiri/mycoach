import React from 'react'
import type { InputTypeProps } from './../index'

type InputPasswordProps = InputTypeProps

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>((props, ref) => {
  return (
      <input type={'password'} {...props} ref={ref} />
  )
})
