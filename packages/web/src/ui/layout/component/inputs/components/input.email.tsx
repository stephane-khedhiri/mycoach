import React from 'react'
import type { InputTypeProps } from '@ui/component/inputs'

type InputEmailProps = InputTypeProps

export const InputEmail: React.FC<InputEmailProps> = ({
  size,
  className,
  ...props
}) => {
  return <input type={'email'} {...props} />
}
