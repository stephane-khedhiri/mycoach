import React from 'react'
import type { InputTypeProps } from '@ui/component/inputs'

type InputPasswordProps = InputTypeProps

export const InputPassword: React.FC<InputPasswordProps> = ({
  size,

  className,
  ...props
}) => {
  return <input type={'password'} {...props} />
}
