import { FC, memo, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { InputAuth } from '../../common/Input/InputAuth/InputAuth'
import { Button } from '../../common/Button/Button'
import { LoginParamsT, validateLogin } from 'utils/validationLogin'
import { useAppDispatch } from '../../../store/hooks'
import { auth, token } from 'store/redux/users/slice'
import { AuthSelect } from '../../common/AuthSelect'
import { useLoginMutation } from '../../../api/userLoginService'
import { useShowModal } from '../../../customHooks/useShowModal'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../config/commonSvgIconsPath'

import { isSecurity, unSecurity } from '../../../assets/img/common/index'

import { Path } from '../../../enum/pathE'

import { LoginModalPropsT } from '../ModalTypes'

import styles from '../Modal.module.scss'

export const LoginModal: FC<LoginModalPropsT> = memo(({ setShowModal }) => {
  const dispatch = useAppDispatch()
  const screenWidth = window.screen.width

  const navigate = useNavigate()

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
      await attemptAccess(user)
    },
  })
  useEffect(() => {
    if (isSuccess) {
      setShowModal(false)
      dispatch(token({ access_token: data?.access_token as string, refresh_token: data?.refresh_token as string }))
      dispatch(auth(true))
      if (screenWidth <= 1025) {
        navigate(Path.Courses)
      }
    }
  }, [isSuccess])

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
              <IconSvg width={25} height={25} path={crossIconPath} />
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
                icon={security ? isSecurity : unSecurity}
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
