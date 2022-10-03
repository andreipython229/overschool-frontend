import * as yup from 'yup'

export const userDataSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').trim().max(128, 'Максимально допустимое значение'),
  // avatar: yup.string(),
  last_name: yup.string().trim().min(1, 'Это поле не может быть пустым').max(150, 'Максимально допустимое значение'),
  first_name: yup.string().trim().min(1, 'Это поле не может быть пустым').max(150, 'Максимально допустимое значение'),
  phone: yup
    .string()
    // .matches(/^[+\d](?:.*\d)?$/, { message: 'Invalid phone number' })
    .trim(),
  city: yup.string().trim().min(1, 'Это поле не может быть пустым').max(256, 'Максимально допустимое значение'),
  desc: yup.string().trim(),
  sex: yup.string().oneOf(['М', 'Ж']),
})
