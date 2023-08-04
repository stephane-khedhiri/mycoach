import React from 'react'

import type { InputTypeProps } from './../index'

type InputEmailProps = InputTypeProps

export const InputEmail = React.forwardRef<HTMLInputElement, InputEmailProps>((props, ref) => {
  return (
      <input type={'email'} {...props} ref={ref} />
  )
})
