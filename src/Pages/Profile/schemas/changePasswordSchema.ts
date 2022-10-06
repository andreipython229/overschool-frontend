import * as yup from 'yup'

export const changePasswordSchema = yup.object().shape({
  password: yup.string().min(6, 'Не менее 6 символов').required('Это поле обязательно'),
  confirmPassword: yup
    .string()
    .min(6, 'Не менее 6 символов')
    .oneOf([yup.ref('password')], 'Пароль не совпадает')
    .required('Это поле обязательно'),
})
