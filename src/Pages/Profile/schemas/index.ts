import * as yup from 'yup'

export const userDataSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').trim(),
  avatar: yup.string(),
  fullName: yup.string().trim(),
  phone: yup.string().matches(/^[+\d](?:.*\d)?$/, { message: 'Invalid phone number' }).trim(),
  city: yup.string().trim(),
  desc: yup.string().trim(),
  sex: yup.string().oneOf(['male', 'female']),
})
