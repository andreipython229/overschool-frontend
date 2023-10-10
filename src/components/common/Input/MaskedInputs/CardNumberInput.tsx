import React from 'react'
import { FieldProps } from 'formik'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'

interface CardNumberInputProps extends FieldProps<any, any> {
  maskedInputProps: Omit<MaskedInputProps, 'value' | 'onChange'>
  type: string
}

export const CardNumberInput: React.FC<CardNumberInputProps> = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <MaskedInput
      {...field}
      {...props}
      mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
      guide={false}
      placeholder="XXXX XXXX XXXX XXXX"
      type="text"
    />
  )
}
