import { Button } from '../../components/common/Button/Button'
import styles from './createNewSchool.module.scss'
import { Path } from '../../enum/pathE'
import { isSecurity, unSecurity } from '../../assets/img/common'
import { InputAuth } from '../../components/common/Input/InputAuth/InputAuth'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { generatePath, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useCreateSchoolOwnerMutation, useCreateSchoolOwnerRefMutation } from 'api/schoolCreationService'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import * as Yup from 'yup'
import PhoneInput from 'react-phone-input-2'
import { logoHeaderLogin, facebook, google, maillog, leftArrow } from '../../assets/img/common/index'

import 'react-phone-input-2/lib/style.css'
import { Input } from 'components/common/Input/Input/Input'

export const CreateNewSchool = () => {
  const location = useLocation()
  const [utmParams, setUtmParams] = useState<{
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
  }>({})
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const [security, setSecurity] = useState<boolean>(true)
  const [createOwner, { isSuccess, isLoading }] = useCreateSchoolOwnerMutation()
  const [createOwnerRef, { isSuccess: successRef, isLoading: loadingRef }] = useCreateSchoolOwnerRefMutation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  const handleClose = () => {
    setOpen(false)
    navigate(Path.InitialPage)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams && searchParams.values.length > 2) {
      const params: { [key: string]: string } = {}
      for (const [key, value] of searchParams) {
        if (typeof key === 'string' && key.startsWith('utm_')) {
          params[key] = value
        }
      }
      setUtmParams(params)
    }
  }, [location.search])

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      utm_source: utmParams['utm_source'] || '',
      utm_medium: utmParams['utm_medium'] || '',
      utm_campaign: utmParams['utm_campaign'] || '',
      utm_term: utmParams['utm_term'] || '',
      utm_content: utmParams['utm_content'] || '',
    })
  }, [utmParams])

  const validationSchema: any = Yup.object().shape({
    school_name: Yup.string().min(2, 'Слишком короткое!').max(50, 'Слишком длинное!').required('Поле  обязательно для заполнения'),
    email: Yup.string().email('Введите корректный email').required('Введите email'),
    phone_number: Yup.string().required('Введите номер телефона').min(12, 'Некорректный номер телефона'),
    password: Yup.string().required('Введите пароль').min(6, 'Пароль слишком короткий - должно быть минимум 6 символов'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
      .required('Поле обязательно для заполнения'),
    utm_source: Yup.string(),
    utm_medium: Yup.string(),
    utm_campaign: Yup.string(),
    utm_term: Yup.string(),
    utm_content: Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      school_name: '',
      email: '',
      phone_number: '',
      password: '',
      password_confirmation: '',
      ...utmParams,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      if (formik.values.school_name.length > 0 && formik.values.password === formik.values.password_confirmation) {
        const utmData = {
          utm_source: formik.values.utm_source || '',
          utm_medium: formik.values.utm_medium || '',
          utm_campaign: formik.values.utm_campaign || '',
          utm_term: formik.values.utm_term || '',
          utm_content: formik.values.utm_content || '',
        }

        const userData = {
          ...formik.values,
          ...utmData,
        }
        if (searchParams && searchParams.get('ref_code')) {
          await createOwnerRef({ credentials: userData, ref: String(searchParams.get('ref_code')) })
            .unwrap()
            .catch((response: any) => {
              if (response.status === 400) {
                const errorResponse = JSON.parse(response.data)
                const errorMessage = errorResponse.errors.phone_number[0]
                setError(errorMessage)
              }
            })
        } else {
          await createOwner(userData)
            .unwrap()
            .catch((response: any) => {
              if (response.status === 400) {
                const errorResponse = JSON.parse(response.data)
                const errorMessage = errorResponse.errors.phone_number[0]
                setError(errorMessage)
              }
            })
        }
      } else {
        setError('Проверьте правильность введенных данных')
      }
    },
  })

  useEffect(() => {
    if (isSuccess || successRef) {
      setOpen(true)
    }
  }, [isSuccess, isLoading, loadingRef, successRef])

  const changeSecurityStatus = () => {
    setSecurity(!security)
  }

  const normalizePhoneNumber = (value: string) => {
    return '+' + value
  }
  const returnLogin = (event: any) => {
    event.preventDefault()
    navigate(generatePath(Path.InitialPage))
  }

  return (
    <section className={styles.newCoursePage}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Регистрация произведена успешно!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Поздравляем, Вы стали на шаг ближе к своей цели. Теперь вы можете авторизоваться под данными Вашей, только что созданной, учётной записи и
            приступить к администрированию собственной платформы!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ marginInlineEnd: '1em', marginBottom: '.5em' }} onClick={handleClose} text={'Окей'} />
        </DialogActions>
      </Dialog>

      <div className={styles.bg}>
        <div className={styles.bg_wrap1}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap2}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap3}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap4}></div>
      </div>
      <div className={styles.newCoursePage_btnBack}>
        <button style={{ zIndex: 10, background: 'transparent', border: 'none' }} onClick={() => navigate(generatePath(Path.InitialPage))}>
          <img src={leftArrow} alt="leftArrow" />
        </button>
      </div>
      <div className={styles.newCoursePage_logoWrapper}>
        <img src={logoHeaderLogin} alt="logoHeaderLogin" />
      </div>
      <div className={styles.newCoursePage_formWrapper}>
        <span className={styles.newCoursePage_formWrapper_form_btnCreateWrapper_return} onClick={returnLogin}>
          Войти
        </span>
        <form className={styles.newCoursePage_formWrapper_form} onSubmit={formik.handleSubmit}>
          <p className={styles.newCoursePage_formWrapper_form_title}>Регистрация</p>
          <p className={styles.newCoursePage_formWrapper_form_title_comment}>Создайте свой уникальный проект</p>
          <div className={styles.newCoursePage_formWrapper_form_eMailWrapper}>
            {error && <p style={{ color: 'red', marginTop: '.5em' }}>{error}</p>}
            <p className={styles.newCoursePage_formWrapper_form_eMailWrapper_title}>Введите название Вашей платформы:</p>
            <InputAuth
              name={'school_name'}
              type={'text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.school_name}
              placeholder={'Название платформы'}
              error={formik.touched.school_name && formik.errors.school_name ? true : false}
            />
            {formik.touched.school_name && formik.errors.school_name ? (
              <p style={{ color: 'red', marginTop: '.5em' }}>{formik.errors.school_name}</p>
            ) : null}
          </div>
          <div className={styles.newCoursePage_formWrapper_form_eMailWrapper}>
            <p className={styles.newCoursePage_formWrapper_form_eMailWrapper_title}>E-mail:</p>
            <InputAuth
              name={'email'}
              type={'text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder={'Электронная почта'}
              error={formik.touched.email && formik.errors.email ? true : false}
            />
            {formik.touched.email && formik.errors.email ? <p style={{ color: 'red', marginTop: '.5em' }}>{formik.errors.email}</p> : null}
          </div>
          <div className={styles.newCoursePage_formWrapper_form_passwordWrapper}>
            <p className={styles.newCoursePage_formWrapper_form_passwordWrapper_title}>Номер телефона:</p>

            <Input
              onChangePhone={values => formik.setFieldValue('phone_number', normalizePhoneNumber(values))}
              value={formik.values.phone_number}
              onBlur={formik.handleBlur}
              name="phone_number"
              type="text"
              variant="phone"
              error={formik.errors.phone_number && formik.touched.phone_number ? true : false}
            />

            {formik.errors.phone_number && formik.touched.phone_number ? (
              <p style={{ color: 'red', marginTop: '.5em' }}>{formik.errors.phone_number}</p>
            ) : null}
          </div>
          <div className={styles.newCoursePage_formWrapper_form_passwordWrapper}>
            <p className={styles.newCoursePage_formWrapper_form_passwordWrapper_title}>Пароль:</p>
            <InputAuth
              name={'password'}
              type={security ? 'password' : 'text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder={'Пароль'}
              onClick={changeSecurityStatus}
              icon={security ? isSecurity : unSecurity}
              error={formik.touched.password && formik.errors.password ? true : false}
            />
            {formik.touched.password && formik.errors.password ? <p style={{ color: 'red', marginTop: '.5em' }}>{formik.errors.password}</p> : null}
          </div>
          <div className={styles.newCoursePage_formWrapper_form_passwordWrapper}>
            <p className={styles.newCoursePage_formWrapper_form_passwordWrapper_title}>Повторите пароль:</p>
            <InputAuth
              name={'password_confirmation'}
              type={security ? 'password' : 'text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password_confirmation}
              placeholder={'Повторите пароль'}
              onClick={changeSecurityStatus}
              icon={security ? isSecurity : unSecurity}
              error={formik.touched.password_confirmation && formik.errors.password_confirmation ? true : false}
            />
            {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
              <p style={{ color: 'red', marginTop: '.5em' }}>{formik.errors.password_confirmation}</p>
            ) : null}
          </div>
          <div className={styles.newCoursePage_formWrapper_form_btnCreateWrapper}>
            <Button
              text={isLoading ? <SimpleLoader style={{ width: '2em', height: '2em' }} /> : 'Создать свой проект'}
              variant={'newCreate'}
              type={'submit'}
              style={{ width: '400px', height: '54px', borderRadius: '10px', marginBottom: '1rem' }}
            />
            <p className={styles.newCoursePage_formWrapper_form_btnCreateWrapper_help}>
              Уже есть свой аккаунт?
              <a href={Path.LoginPage}>Войти</a>
            </p>
            <div className={styles.newCoursePage_formWrapper_form_btnCreateWrapper_or}>
              <div className={styles.newCoursePage_formWrapper_form_btnCreateWrapper_or_lineLeft}></div>
              <p>Или</p>
              <div className={styles.newCoursePage_formWrapper_form_btnCreateWrapper_or_lineRight}></div>
            </div>
            <div className={styles.newCoursePage_formWrapper_form_btnCreateWrapper_socialMedia}>
              <img src={facebook} alt="facebook" />
              <img src={google} alt="google" />
              <img src={maillog} alt="maillog" />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
