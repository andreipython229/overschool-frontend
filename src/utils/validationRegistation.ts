export type RegistrParamsT = {
  email?: string
  phone?: string
  password: string
  politics: boolean
  oferta: boolean
}

const MIN_PASS_LENGTH = 8

export const validateRegistration = (values: RegistrParamsT): RegistrParamsT => {
  const errors = {} as RegistrParamsT
  if (!values.email) {
    errors.email = 'Поле обязательно для заполнения'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Не корректные данные'
  }
  if (!values.phone) {
    errors.phone = 'Поле обязательно для заполнения'
  } else if (Number(values.phone)) {
    errors.phone = 'Не корректные данные'
  }
  if (values.password.length < MIN_PASS_LENGTH) {
    errors.password = 'Пароль должен содержать минимум 8 символов'
  } else if (!values.password) {
    errors.password = 'Пароль обязателен'
  }
  if (values.oferta !== true) {
    errors.oferta = false
  }
  if (values.politics !== true) {
    errors.politics = false
  }
  return errors
}
