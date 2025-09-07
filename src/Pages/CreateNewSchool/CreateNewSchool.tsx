import { Button } from '@/components/common/Button/Button'
import styles from './createNewSchool.module.scss'
import { Path } from '@/enum/pathE'
import { isSecurity, unSecurity, yandex, google } from '@/assets/img/common'
import { InputAuth } from '@/components/common/Input/InputAuth/InputAuth'
import { useFormik } from 'formik'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { generatePath, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useCreateSchoolOwnerMutation, useCreateSchoolOwnerRefMutation } from '@/api/schoolCreationService'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { SimpleLoader } from '@/components/Loaders/SimpleLoader'
import * as Yup from 'yup'
import { Input } from '@/components/common/Input/Input/Input'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/selectors'
import toast, { Toaster } from 'react-hot-toast'
import { Back } from './Back'
import { LogoHeader } from './LogoHeader'
import { TariffPlanT } from '@/api/tariffPlanService'

export type ErrorT = {
  status: number
  data: {
    errors: {
      [key: string]: string[]
    }
  }
}

export const CreateNewSchool = () => {
  const location = useLocation()
  const { auth } = useAppSelector(selectUser)
  const [searchParams] = useSearchParams(location.search)
  const [security, setSecurity] = useState<boolean>(true)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const [selectedTariff, setSelectedTariff] = useState<string>('Junior')

  // Fallback данные для тарифов (если API недоступен)
  const fallbackTariffData = [
    { id: 1, name: 'Junior', price: '0' },
    { id: 2, name: 'Middle', price: '1000' },
    { id: 3, name: 'Senior', price: '2000' },
  ]

  // Временно отключаем загрузку тарифов с сервера
  // const { data: tariffPlans, isLoading: isLoadingTariffs } = useFetchPublicTariffPlanTableQuery()
  const tariffPlans = null // Временно не загружаем с сервера

  const utmParams = useMemo(() => {
    const params: Record<string, string> = {}
    for (const [key, value] of searchParams) {
      if (key.startsWith('utm_')) {
        params[key] = value
      }
    }
    // Добавляем значения по умолчанию для UTM полей
    if (!params.utm_source) params.utm_source = ''
    if (!params.utm_medium) params.utm_medium = ''
    if (!params.utm_campaign) params.utm_campaign = ''
    if (!params.utm_term) params.utm_term = ''
    if (!params.utm_content) params.utm_content = ''
    return params
  }, [location.search])

  const [createOwner, { isSuccess, isLoading }] = useCreateSchoolOwnerMutation()
  const [createOwnerRef, { isSuccess: successRef }] = useCreateSchoolOwnerRefMutation()

  const authBaseUrl = window.location.hostname === 'localhost' ? 'http://sandbox.coursehb.ru' : 'https://apidev.coursehb.ru'

  const handleClose = useCallback(() => {
    setOpen(false)
    navigate(Path.InitialPage)
  }, [navigate])

  const validationSchema = Yup.object().shape({
    school_name: Yup.string().min(2, 'Слишком короткое!').max(50, 'Слишком длинное!').required('Поле обязательно для заполнения'),
    email: Yup.string().email('Введите корректный email').required('Введите email'),
    phone_number: Yup.string().required('Введите номер телефона').min(12, 'Некорректный номер телефона'),
    password: Yup.string().required('Введите пароль').min(6, 'Пароль слишком короткий - минимум 6 символов'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Пароли не совпадают')
      .required('Поле обязательно для заполнения'),
    tariff: Yup.string()
      .required('Выберите тариф')
      .oneOf(
        fallbackTariffData.map(t => t.name),
        'Выберите корректный тариф',
      ),
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
      tariff: 'Junior',
      utm_source: utmParams.utm_source || '',
      utm_medium: utmParams.utm_medium || '',
      utm_campaign: utmParams.utm_campaign || '',
      utm_term: utmParams.utm_term || '',
      utm_content: utmParams.utm_content || '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        if (searchParams.get('ref_code')) {
          await createOwnerRef({
            credentials: values,
            ref: String(searchParams.get('ref_code')),
          }).unwrap()
        } else {
          await createOwner(values).unwrap()
        }
      } catch (error: any) {
        const errorResponse = error.data?.errors || {}
        let firstError = 'Возникла ошибка при регистрации школы'

        if (errorResponse && typeof errorResponse === 'object') {
          const errorValues = Object.values(errorResponse)
          if (errorValues.length > 0 && Array.isArray(errorValues[0])) {
            firstError = errorValues[0][0] || firstError
          }
        }

        toast.error(firstError)
        setError(firstError)
      }
    },
  })

  useEffect(() => {
    if (isSuccess || successRef) {
      setOpen(true)
    }
  }, [isSuccess, successRef])

  const changeSecurityStatus = useCallback(() => {
    setSecurity(prev => !prev)
  }, [])

  const normalizePhoneNumber = (value: string) => '+' + value

  const returnLogin = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      navigate(Path.InitialPage)
    },
    [navigate],
  )

  return (
    <section className={styles.newCoursePage}>
      <Toaster position="bottom-right" reverseOrder={true} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Регистрация произведена успешно!</DialogTitle>
        <DialogContent>
          <DialogContentText>Поздравляем! Теперь вы можете авторизоваться под данными вашей учётной записи.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} text="Окей" style={{ marginInlineEnd: '1em', marginBottom: '.5em' }} />
        </DialogActions>
      </Dialog>

      <div className={styles.bg}>
        <div className={styles.bg_wrap1}></div>
        <div className={styles.bg_wrap2}></div>
        <div className={styles.bg_wrap3}></div>
        <div className={styles.bg_wrap4}></div>
      </div>

      <div className={styles.newCoursePage_btnBack}>
        <button onClick={() => navigate(Path.InitialPage)} className={styles.backButton} aria-label="Вернуться назад">
          <Back className={styles.back} />
        </button>
      </div>

      <div className={styles.newCoursePage_logoWrapper}>
        <LogoHeader />
      </div>

      <div className={styles.newCoursePage_formWrapper}>
        <span className={styles.returnLink} onClick={returnLogin}>
          Войти
        </span>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Регистрация</h2>
          <p className={styles.subtitle}>Создайте свой уникальный проект</p>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Название платформы:</label>
            <InputAuth
              name="school_name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.school_name}
              placeholder="Название платформы"
              error={!!(formik.touched.school_name && formik.errors.school_name)}
            />
            {formik.touched.school_name && formik.errors.school_name && <p className={styles.errorText}>{formik.errors.school_name}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>E-mail:</label>
            <InputAuth
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Электронная почта"
              error={!!(formik.touched.email && formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && <p className={styles.errorText}>{formik.errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Номер телефона:</label>
            <Input
              onChangePhone={value => formik.setFieldValue('phone_number', normalizePhoneNumber(value))}
              value={formik.values.phone_number}
              onBlur={formik.handleBlur}
              name="phone_number"
              type="text"
              variant="phone"
              error={!!(formik.touched.phone_number && formik.errors.phone_number)}
            />
            {formik.touched.phone_number && formik.errors.phone_number && <p className={styles.errorText}>{formik.errors.phone_number}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль:</label>
            <InputAuth
              name="password"
              type={security ? 'password' : 'text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Пароль"
              onClick={changeSecurityStatus}
              icon={security ? isSecurity : unSecurity}
              error={!!(formik.touched.password && formik.errors.password)}
            />
            {formik.touched.password && formik.errors.password && <p className={styles.errorText}>{formik.errors.password}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Повторите пароль:</label>
            <InputAuth
              name="password_confirmation"
              type={security ? 'password' : 'text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password_confirmation}
              placeholder="Повторите пароль"
              onClick={changeSecurityStatus}
              icon={security ? isSecurity : unSecurity}
              error={!!(formik.touched.password_confirmation && formik.errors.password_confirmation)}
            />
            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
              <p className={styles.errorText}>{formik.errors.password_confirmation}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Выберите тариф:</label>
            <select
              name="tariff"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tariff}
              className={styles.tariffSelect}
              aria-label="Выберите тариф"
              style={{
                width: '100%',
                padding: '12px',
                border: formik.touched.tariff && formik.errors.tariff ? '1px solid #ff4444' : '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'white',
              }}
            >
              {fallbackTariffData.map(tariff => (
                <option key={tariff.id} value={tariff.name}>
                  {tariff.name} - {tariff.price} руб./месяц
                </option>
              ))}
            </select>
            {formik.touched.tariff && formik.errors.tariff && <p className={styles.errorText}>{formik.errors.tariff}</p>}
          </div>

          <div className={styles.buttonWrapper}>
            <Button
              text={isLoading ? <SimpleLoader style={{ width: '24px', height: '24px' }} /> : 'Создать свой проект'}
              variant="newCreate"
              type="submit"
              style={{ width: '100%', height: '54px', borderRadius: '10px', marginBottom: '1rem' }}
              disabled={isLoading}
            />
            <p className={styles.helpText}>
              Уже есть свой аккаунт?{' '}
              <a href={Path.LoginPage} className={styles.loginLink}>
                Войти
              </a>
            </p>
          </div>

          <div className={styles.socialDivider}>
            <div className={styles.dividerLine}></div>
            <span className={styles.dividerText}>Или</span>
            <div className={styles.dividerLine}></div>
          </div>

          <div className={styles.socialButtons}>
            <a href={`${authBaseUrl}/accounts/google/login/`} className={styles.socialButton} aria-label="Авторизация через Google">
              <img src={google} alt="Google" className={styles.socialIcon} />
            </a>
            <a href={`${authBaseUrl}/accounts/yandex/login/`} className={styles.socialButton} aria-label="Авторизация через Yandex">
              <img src={yandex} alt="Yandex" className={styles.socialIcon} />
            </a>
          </div>
        </form>
      </div>
    </section>
  )
}
