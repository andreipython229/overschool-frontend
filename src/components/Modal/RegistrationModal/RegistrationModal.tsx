import { FC, memo } from 'react'
// import { useFormik } from 'formik'
import { RegistrationModalPropsT } from '../ModalTypes'
// import { IconSvg } from '../../common/IconSvg/IconSvg'
// import { InputAuth } from '../../common/Input/InputAuth/InputAuth'
// import { Checkbox } from '../../common/Checkbox/Checkbox'
// import { Index } from '../../common/Index/Index'
// import { auth } from 'store/redux/users/slice'
// import { AuthSelect } from '../../common/AuthSelect'
// import { useAppDispatch } from '../../../store/hooks'
// import { registrIconPath } from './config/svgIconsPath'

// import { isSecurity, unSecurity } from '../../../assets/img/common/index'

import styles from '../Modal.module.scss'

export const RegistrationModal: FC<RegistrationModalPropsT> = memo(() => {
  // const dispatch = useAppDispatch()
  // const [security, setSecurity] = useState<boolean>(true)
  // const [authVariant, setAuthVariant] = useState<string>('email')

  // const getAuthVariant = (variant: string) => {
  //   setAuthVariant(variant)
  // }
  // const registration = () => {
  //   dispatch(auth(true))
  // }

  // const changeSecurityStatus = () => {
  //   setSecurity(!security)
  // }

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //     oferta: false,
  //     politics: false,
  //     phone: '',
  //   },
  //   onSubmit: () => {
  //     registration()
  //     setShowModal(false)
  //   },
  // })
  // const disabled = !(Object.keys(formik.errors).length === 0)

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.main}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.container}>
            <IconSvg
              className={styles.main_closed}
              width={16}
              height={16}
              viewBoxSize="0 0 16 16"
              functionOnClick={() => setShowModal(false)}
              path={registrIconPath}
            />

            <div className={styles.main_title}>Зарегистрироваться</div>
            <div className={styles.inputs_block}>
              <div style={{ display: 'flex' }}>
                {authVariant === 'phone' ? (
                  <InputAuth name={'phone'} type={'tel'} onChange={formik.handleChange} value={formik.values.phone} placeholder={'Номер телефона'} />
                ) : (
                  <InputAuth name={'email'} type={'text'} onChange={formik.handleChange} value={formik.values.email} placeholder={'Email'} />
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
                icon={security ? isSecurity : unSecurity}
              />
            </div>
            <div className={styles.main_blockDesc}>
              <div className={styles.main_blockDesc_checkbox}>
                <Checkbox id={'oferta'} name={'oferta'} checked={formik.values.oferta} onChange={formik.handleChange} />
              </div>
              <p className={styles.main_blockDesc_description}>
                Я подтверждаю согласие на обработку персональных данных в соответствии с условиями
                <a href={'/'} rel={'noreferrer'} target={'_blank'} className={styles.main_blockDesc_link}>
                  Политики конфиденциальности
                </a>
              </p>
            </div>
            <div className={styles.main_blockDesc}>
              <div className={styles.main_blockDesc_checkbox}>
                <Checkbox id={'politics'} name={'politics'} checked={formik.values.politics} onChange={formik.handleChange} />
              </div>
              <p className={styles.main_blockDesc_description}>
                Принимаю условия
                <a href={'/'} rel={'noreferrer'} target={'_blank'} className={styles.main_blockDesc_link}>
                  договора оферты
                </a>
              </p>
            </div>
            <div className={styles.main_btn}>
              <Index style={{ width: '246px' }} type={'submit'} variant={'primary'} text={'Зарегистрироваться'} />
            </div>
          </div>
        </form>
      </div> */}
    </div>
  )
})
