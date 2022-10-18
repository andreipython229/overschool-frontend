import * as Yup from 'yup'

export const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Не менее 8 символов')
    .matches(/[a-z]+/, 'Пароль должен содержать минимум одну строчную букву')
    .matches(/[A-Z]+/, 'Пароль должен содержать минимум одну заглавную букву')
    .matches(/[@$!%*#?&]+/, 'Пароль должен содержать минимум один символ')
    .matches(/\d+/, 'Пароль должен содержать минимум одну цифру')
    .required('Это поле обязательно'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Неверный пароль')
    .required('Это поле обязательно'),
})
