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
import 'react-phone-input-2/lib/style.css'

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
      <div className={styles.newCoursePage_logoWrapper}>
        <div className={styles.newCoursePage_logoWrapper_container} onClick={() => navigate(generatePath(Path.InitialPage))}>
          <svg width="230" height="103" viewBox="0 0 230 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M174.192 -0.000967405C174.904 -0.00278475 175.589 0.265959 176.117 0.752598L210.92 32.9128L229.043 49.3535C230.294 50.4876 230.322 52.4704 229.104 53.6405L216.612 65.6498L181.693 101.708C181.157 102.26 180.429 102.571 179.669 102.573L136.491 102.684C133.936 102.69 132.661 99.5321 134.482 97.7044L179.251 52.7929C179.93 52.0414 179.888 51.7491 179.251 51.0602L170.272 41.4769L131.505 5.15145C129.594 3.36052 130.832 0.110076 133.429 0.1034L174.192 -0.000967405Z"
              fill="url(#paint0_linear_1323_4107)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M68.4455 74.6878C67.4499 75.8543 67.5243 77.6104 68.614 78.6856L91.5215 101.278C92.7028 102.443 94.6034 102.352 95.6726 101.08L176.552 4.79767C178.139 2.90863 176.818 -0.00723445 174.377 -0.000966474L133.392 0.103958C132.569 0.106072 131.787 0.470392 131.246 1.10331L68.4455 74.6878Z"
              fill="url(#paint1_linear_1323_4107)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.0084 26.3669L46.0685 1.16134C46.6015 0.620036 47.3227 0.315242 48.0754 0.313313L90.3417 0.205088C92.8834 0.198561 94.1643 3.32724 92.3713 5.16357L48.7023 49.8892C48.3891 50.2232 48.3837 50.4334 48.7023 50.8181L95.3713 97.8173C97.1716 99.6447 95.9061 102.778 93.3651 102.785L90.656 102.792C90.6366 102.792 90.6175 102.792 90.5981 102.792L52.2512 102.891C52.2328 102.891 52.2145 102.891 52.1962 102.89L51.538 102.892C50.7604 102.894 50.0157 102.572 49.4761 102.002L0.798224 50.4967C-0.289989 49.3451 -0.262078 47.5144 0.86075 46.3981L21.0084 26.3669Z"
              fill="url(#paint2_linear_1323_4107)"
            />
            <defs>
              <linearGradient id="paint0_linear_1323_4107" x1="140.844" y1="0.0844086" x2="209.849" y2="59.4753" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9228FF" />
                <stop offset="1" stopColor="#EC40FF" />
              </linearGradient>
              <linearGradient id="paint1_linear_1323_4107" x1="150.641" y1="0.0597811" x2="67.4794" y2="103.714" gradientUnits="userSpaceOnUse">
                <stop stopColor="#CD99FF" />
                <stop offset="1" stopColor="#6D1CBA" />
              </linearGradient>
              <linearGradient id="paint2_linear_1323_4107" x1="8.10532" y1="38.9434" x2="70.8075" y2="102.291" gradientUnits="userSpaceOnUse">
                <stop stopColor="#61A3ED" />
                <stop offset="1" stopColor="#5048D8" />
              </linearGradient>
            </defs>
          </svg>
          <p className={styles.newCoursePage_logoWrapper_container_title}>OVERSCHOOL</p>
        </div>
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
              placeholder={'E-mail'}
            />
            {formik.touched.email && formik.errors.email ? <p style={{ color: 'red', marginTop: '.5em' }}>{formik.errors.email}</p> : null}
          </div>
          <div className={styles.newCoursePage_formWrapper_form_passwordWrapper}>
            <p className={styles.newCoursePage_formWrapper_form_passwordWrapper_title}>Номер телефона:</p>
            <div className={styles.input_container}>
              <div className={styles.input_container_input}>
                <PhoneInput
                  inputProps={{
                    name: 'phone_number',
                    style: {
                      border: 'none',
                      height: '38px',
                      borderRadius: '10px',
                      width: '100%',
                    },
                  }}
                  onChange={values => formik.setFieldValue('phone_number', normalizePhoneNumber(values))}
                  value={formik.values.phone_number}
                  onBlur={formik.handleBlur}
                  placeholder="Номер телефона"
                  country={'by'}
                />
              </div>
            </div>
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
            />
            {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
              <p style={{ color: 'red', marginTop: '.5em' }}>{formik.errors.password_confirmation}</p>
            ) : null}
          </div>
          <div className={styles.newCoursePage_formWrapper_form_btnCreateWrapper}>
            <Button
              text={isLoading ? <SimpleLoader style={{ width: '2em', height: '2em' }} /> : 'Создать свой проект'}
              variant={'create'}
              type={'submit'}
              style={{ fontSize: '0.8rem' }}
            />
            <p className={styles.newCoursePage_formWrapper_form_btnCreateWrapper_help}>
              Уже есть свой аккаунт?
              <a href={Path.LoginPage}>Войти</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
