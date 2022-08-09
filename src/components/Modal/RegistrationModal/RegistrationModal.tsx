import React, { FC, memo, useState } from 'react'
import { useFormik } from 'formik'
import { InputAuth } from '../../common/Input/InputAuth/InputAuth'
import unSecurity from '../../../assets/img/unSecurity.svg'
import Security from '../../../assets/img/isecurity.svg'
import { Checkbox } from '../../common/Checkbox/Checkbox'
import { Button } from '../../common/Button/Button'
import { RegistrParamsT, validateRegistration } from 'utils/validationRegistation'
import { auth } from 'store/redux/users/slice'
import { AuthSelect } from '../../common/AuthSelect/AuthSelect'
import { useAppDispatch } from '../../../store/hooks'

import styles from '../Modal.module.scss'

import { setUserService } from '../../../api/setUserService'

type RegistrationModalPropsT = {
  setShowModal: (value: boolean) => void
}

export const RegistrationModal: FC<RegistrationModalPropsT> = memo(({ setShowModal }) => {
  const { data } = setUserService.useFetchUsersQuery(15)
  const [createUser, { isLoading }] = setUserService.useCreateUserMutation()

  const handleCreate = async () => {
    const user = formik.values

    await createUser(user)
    console.log(setUserService.useCreateUserMutation)
    console.log(formik.values)
    console.log(isLoading)
  }

  const dispatch = useAppDispatch()
  const [security, setSecurity] = useState<boolean>(true)
  const [authVariant, setAuthVariant] = useState<string>('email')

  const getAuthVariant = (variant: string) => {
    setAuthVariant(variant)
  }
  const registration = () => {
    dispatch(auth(true))
  }

  const changeSecurityStatus = () => {
    setSecurity(!security)
  }

  const formik = useFormik({
    validate: values => validateRegistration(values),
    initialValues: {
      email: '',
      password: '',
      oferta: false,
      politics: false,
      phone: '',
    },
    onSubmit: (values: RegistrParamsT) => {
      // onSubmitForm(values)
      //     .then(() => {
      //         formik.resetForm()
      //     })
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values))
      registration()
      setShowModal(false)
    },
  })
  const disabled = !(Object.keys(formik.errors).length === 0)

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.container}>
            <svg
              className={styles.main_closed}
              onClick={() => setShowModal(false)}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 15L15 1M15 15L1 1"
                stroke="#2E4454"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className={styles.main_title}>Зарегистрироваться</div>
            <div className={styles.inputs_block}>
              <div style={{ display: 'flex' }}>
                {authVariant === 'phone' ? (
                  <InputAuth
                    name={'phone'}
                    type={'tel'}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    placeholder={'Номер телефона'}
                  />
                ) : (
                  <InputAuth
                    name={'email'}
                    type={'text'}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder={'Email'}
                  />
                )}
                <AuthSelect getInputVariant={getAuthVariant} />
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
            </div>
            <div className={styles.main_blockDesc}>
              <div className={styles.main_blockDesc_checkbox}>
                <Checkbox
                  id={'oferta'}
                  name={'oferta'}
                  checked={formik.values.oferta}
                  onChange={formik.handleChange}
                />
              </div>
              <p className={styles.main_blockDesc_description}>
                Я подтверждаю согласие на обработку персональных данных в соответствии с условиями
                <a
                  href={'/'}
                  rel={'noreferrer'}
                  target={'_blank'}
                  className={styles.main_blockDesc_link}
                >
                  Политики конфиденциальности
                </a>
              </p>
            </div>
            <div className={styles.main_blockDesc}>
              <div className={styles.main_blockDesc_checkbox}>
                <Checkbox
                  id={'politics'}
                  name={'politics'}
                  checked={formik.values.politics}
                  onChange={formik.handleChange}
                />
              </div>
              <p className={styles.main_blockDesc_description}>
                Принимаю условия
                <a
                  href={'/'}
                  rel={'noreferrer'}
                  target={'_blank'}
                  className={styles.main_blockDesc_link}
                >
                  договора оферты
                </a>
              </p>
            </div>
            <div className={styles.main_btn}>
              <Button
                onClick={handleCreate}
                style={{ width: '246px' }}
                type={'submit'}
                variant={'primary'}
                text={'Зарегистрироваться'}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
})
