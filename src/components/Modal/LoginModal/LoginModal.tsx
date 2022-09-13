import { FC, memo, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import { InputAuth } from '../../common/Input/InputAuth/InputAuth'
import { Button } from '../../common/Button/Button'
import { LoginParamsT, validateLogin } from 'utils/validationLogin'
import { useAppDispatch } from '../../../store/hooks'
import { auth, token } from 'store/redux/users/slice'
import { AuthSelect } from '../../common/AuthSelect'
import { useLoginMutation } from '../../../api/userLoginService'
import { useShowModal } from '../../../customHooks/useShowModal'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { cross } from '../../../constants/iconSvgConstants'

import unSecurity from '../../../assets/img/unSecurity.svg'
import Security from '../../../assets/img/isecurity.svg'
import styles from '../Modal.module.scss'

type LoginModalPropsT = {
  setShowModal: (value: boolean) => void
}

export const LoginModal: FC<LoginModalPropsT> = memo(({ setShowModal }) => {
  const dispatch = useAppDispatch()

  const [security, setSecurity] = useState<boolean>(true)
  const [authVariant, setAuthVariant] = useState<keyof LoginParamsT>('email')

  const [attemptAccess, { data, error, isSuccess }] = useLoginMutation()

  const getInputVariant = (variant: keyof LoginParamsT): void => {
    setAuthVariant(variant)
  }
  const changeSecurityStatus = () => {
    setSecurity(!security)
  }

  const formik = useFormik({
    validate: values => validateLogin(values, authVariant),
    initialValues: {
      email: '',
      phone: '',
      password: '',
    },

    onSubmit: async () => {
      const user = formik.values
      const loginUser = {
        email: user.email,
        phone: user.phone,
        password: user.password,
      }
      await attemptAccess(loginUser)
    },
  })
  useEffect(() => {
    if (isSuccess) {
      setShowModal(false)
      dispatch(token(data?.user?.token as string))
      dispatch(auth(true))
    }
  }, [isSuccess, error])

  const handleClose = () => {
    setShowModal(false)
  }
  useShowModal({ setShowModal })

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.container}>
            <span className={styles.main_closed} onClick={handleClose}>
              <IconSvg width={25} height={25} d={cross} stroke={'#E0DCED'} strokeWidth={'2'} strokeLinecap={'round'} strokeLinejoin={'round'} />
            </span>

            <div className={styles.main_title}>Войти</div>
            <div className={styles.inputs_block}>
              <div>
                <div style={{ display: 'flex' }}>
                  <InputAuth
                    name={authVariant}
                    type={authVariant === 'email' ? 'email' : 'tel'}
                    onChange={formik.handleChange}
                    value={authVariant === 'email' ? formik.values.email : formik.values.phone.replace(/\D/g, '')}
                    placeholder={authVariant}
                  />
                  <AuthSelect getInputVariant={getInputVariant} />
                </div>
                <div className={styles.errors}>{formik.errors.email || (error && 'Неверный логин или пароль')}</div>
              </div>
              <InputAuth
                name={'password'}
                type={security ? 'password' : 'text'}
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder={'Пароль'}
                onClick={changeSecurityStatus}
                icon={security ? Security : unSecurity}
              />
              <div className={styles.errors}>{formik.errors.password}</div>
            </div>

            <div className={styles.main_btn}>
              <Button text={'Войти'} style={{ width: '246px' }} type={'submit'} variant={'primary'} />
            </div>

            <div className={styles.restorePass}>
              <Link style={{ textDecoration: 'none', padding: '15px' }} to={'/'}>
                Забыли пароль?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
})
