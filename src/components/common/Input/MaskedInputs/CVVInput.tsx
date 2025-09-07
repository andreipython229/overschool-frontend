import React from 'react'
import { FieldProps } from 'formik'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'

interface CVVInputProps extends FieldProps<any, any> {
  maskedInputProps: Omit<MaskedInputProps, 'value' | 'onChange'>
  type: string
}

export const CVVInput: React.FC<CVVInputProps> = ({ field, form: { touched, errors }, ...props }) => {
  return <MaskedInput {...field} {...props} mask={[/\d/, /\d/, /\d/]} guide={false} placeholder="***" type="text" />
}
