export type LoginParamsT = {
    email: string
    password: string
}


const MIN_PASS_LENGTH = 8

export const validateLogin = (
    values: LoginParamsT,
): LoginParamsT => {
    const errors = {} as LoginParamsT
    if (!values.email) {
        errors.email = 'Поле обязательно для заполнения'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Не корректные данные'
    }
    if (values.password.length < MIN_PASS_LENGTH) {
        errors.password = 'Пароль должен содержать минимум 8 символов'
    } else if (!values.password) {
        errors.password = 'Пароль обязателен'
    }
    return errors
}