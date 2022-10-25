export type LoginParamsT = {
  email?: string
  phone?: string
  password: string
}

export const validateLogin = (values: LoginParamsT, authVariant: keyof LoginParamsT): LoginParamsT => {
  const errors = {} as LoginParamsT

  if (!values[authVariant]) {
    errors[authVariant] = 'Поле обязательно для заполнения'
  }

  return errors
}
