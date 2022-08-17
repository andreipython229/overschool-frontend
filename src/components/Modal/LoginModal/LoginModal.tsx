import React, { FC, memo, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import { InputAuth } from '../../common/Input/InputAuth/InputAuth'
import unSecurity from '../../../assets/img/unSecurity.svg'
import Security from '../../../assets/img/isecurity.svg'
import { Button } from '../../common/Button/Button'
import { validateLogin } from 'utils/validationLogin'
import { useAppDispatch } from '../../../store/hooks'
import { auth } from 'store/redux/users/slice'
import { AuthSelect } from '../../common/AuthSelect/AuthSelect'
import { useLoginMutation } from '../../../api/userLoginService'
import { useShowModal } from '../../../customHooks/useShowModal'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { cross } from '../../../constants/iconSvgConstants'

import styles from '../Modal.module.scss'

type LoginModalPropsT = {
  setShowModal: (value: boolean) => void
  logIn: (value: string) => void
}

export const LoginModal: FC<LoginModalPropsT> = memo(({ setShowModal, logIn }) => {
  const dispatch = useAppDispatch()
  const [security, setSecurity] = useState<boolean>(true)
  const [authVariant, setAuthVariant] = useState<string>('email')

  const [attemptAccess, { data, error, isSuccess }] = useLoginMutation()

  const getInputVariant = (variant: string) => {
    setAuthVariant(variant)
  }
  const changeSecurityStatus = () => {
    setSecurity(!security)
  }

  const formik = useFormik({
    validate: values => validateLogin(values),
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: () => {
      const user = formik.values
      const formdata = new FormData()
      formdata.append('email', user.email)
      formdata.append('password', user.password)
      attemptAccess(formdata)
      dispatch(auth(true))
    },
  })
  useEffect(() => {
    if (isSuccess) {
      setShowModal(false)
      dispatch(auth(true))
      document.cookie = `jwt=${data.jwt}`
      if (error) {
        console.log(error)
      }
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
              <IconSvg
                width={25}
                height={25}
                d={cross}
                stroke={'#E0DCED'}
                strokeWidth={'2'}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
              />
            </span>

            <div className={styles.main_title}>Войти</div>
            <div className={styles.inputs_block}>
              <div>
                <div style={{ display: 'flex' }}>
                  <InputAuth
                    name={authVariant}
                    type={'text'}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder={authVariant}
                  />
                  <AuthSelect getInputVariant={getInputVariant} />
                </div>
                <div className={styles.errors}>{formik.errors.email}</div>
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
              <Button
                text={'Войти'}
                style={{ width: '246px' }}
                type={'submit'}
                variant={'primary'}
              />
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
