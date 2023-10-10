import React from 'react'
import { FieldProps } from 'formik'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'

interface ExpirationDateInputProps extends FieldProps<any, any> {
  maskedInputProps: Omit<MaskedInputProps, 'value' | 'onChange'>
  type: string
}

export const ExpirationDateInput: React.FC<ExpirationDateInputProps> = ({ field, form: { touched, errors }, ...props }) => {
  return <MaskedInput {...field} {...props} mask={[/\d/, /\d/, '/', /\d/, /\d/]} guide={false} placeholder="MM/YY" type="text" />
}
