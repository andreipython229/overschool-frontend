import { useState, FC } from 'react'
import { useFormik } from 'formik'

import { Button } from 'components/common/Button'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import { InputAuth } from 'components/common/Input/InputAuth/InputAuth'
import { validationSchema } from './schemas/validationSchema'

import { isSecurity, unSecurity } from 'assets/img/common'

import styles from './registration.module.scss'

export const SignUp: FC = () => {
  const [security, setSecurity] = useState<boolean>(true)

  const changeSecurityStatus = () => {
    setSecurity(!security)
  }

  const formikPassword = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: () => {
      console.log('')
    },
  })

  const {
    values: { password, confirmPassword },
    errors,
    //touched,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = formikPassword

  const isDisabled = Boolean(errors.password) || Boolean(errors.confirmPassword) || isSubmitting

  return (
    <div className={styles.reg}>
      <form className={styles.reg__container} onSubmit={handleSubmit}>
        <h1 className={styles.reg__title}>Зарегистрироваться</h1>
        <div className={styles.reg__input_container}>
          <InputAuth
            className={errors.password ? styles.reg__input_error : styles.reg__input}
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Пароль"
          />
          {errors.password && <span className={styles.reg__input_errorMes}>{errors.password}</span>}

          <InputAuth
            className={errors.confirmPassword ? styles.reg__input_error : styles.reg__input}
            value={confirmPassword}
            placeholder="Подтвердить пароль"
            name={'confirmPassword'}
            type={security ? 'password' : 'text'}
            onClick={changeSecurityStatus}
            onChange={handleChange}
            icon={security ? isSecurity : unSecurity}
          />
          {errors.confirmPassword && <span className={styles.reg__input_errorMes}>{errors.confirmPassword}</span>}
        </div>
        <div>
          <div className={styles.reg__checkbox_container}>
            <Checkbox />
            <span className={styles.reg__checkbox_info}>
              Я подтверждаю согласие на обработку персональных данных в соответствии с условиями <a href="">Политики конфиденциальности</a>
            </span>
          </div>
          <div className={styles.reg__checkbox_container}>
            <Checkbox />
            <span className={styles.reg__checkbox_info}>
              Принимаю условия <a href="">договора оферты</a>
            </span>
          </div>
        </div>
        <div className={styles.reg__btn_container}>
          <Button
            disabled={isDisabled}
            className={styles.reg__btn}
            type="submit"
            text="Зарегистрироваться"
            variant={isDisabled ? 'disabled' : 'primary'}
          />
        </div>
      </form>
    </div>
  )
}
