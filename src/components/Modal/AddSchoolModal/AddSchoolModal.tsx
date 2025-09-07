import React, { FC, useState } from 'react'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { AddSchoolModalPropsT } from '../ModalTypes'
import * as Yup from 'yup'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from '../Modal.module.scss'
import { useCreateSchoolWCredentialsMutation } from 'api/schoolService'
import { Portal } from '../Portal'
import { LimitModal } from '../LimitModal/LimitModal'
import { useBoolean } from '../../../customHooks'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { Input } from 'components/common/Input/Input/Input'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'

export const AddSchoolModal: FC<AddSchoolModalPropsT> = ({ setShowModal, schools }) => {
  const { email } = useAppSelector(selectUser)
  const [createSchool, { isLoading }] = useCreateSchoolWCredentialsMutation()

  const [isOpenLimitModal, { onToggle }] = useBoolean()
  const [message, setMessage] = useState<string>('')

  const validationSchema: any = Yup.object().shape({
    name: Yup.string().min(2, 'Слишком короткое!').max(50, 'Слишком длинное!').required('Поле  обязательно для заполнения'),
    email: Yup.string().email('Введите корректный email').required('Введите email'),
    phone_number: Yup.string().required('Введите номер телефона').min(12, 'Некорректный номер телефона'),
    password: Yup.string().min(6, 'Пароль должен содержать минимум 6 символов').required('Введите пароль'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли не совпадают')
      .required('Подтвердите пароль'),
    tariff: Yup.string().required('Выберите тарифный план'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: email,
      phone_number: '',
      password: '',
      password_confirmation: '',
      tariff: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      const userData = {
        school_name: formik.values.name,
        email: formik.values.email,
        phone_number: formik.values.phone_number,
        password: formik.values.password,
        password_confirmation: formik.values.password_confirmation,
        tariff: formik.values.tariff,
      }
      await createSchool(userData)
        .unwrap()
        .then(async (data: any) => {
          await setShowModal()
          await window.location.reload()
        })
        .catch(error => {
          if (error.status === 400) {
            const errMessage = error.data
            if ('errors' in errMessage) {
              if ('phone_number' in errMessage.errors) {
                toast.error(errMessage.errors.phone_number[0])
              }
              if ('school_name' in errMessage.errors) {
                toast.error(errMessage.errors.school_name[0])
              }
              if ('email' in errMessage.errors) {
                toast.error(errMessage.errors.email[0])
              }
              if ('password' in errMessage.errors) {
                toast.error(errMessage.errors.password[0])
              }
              if ('password_confirmation' in errMessage.errors) {
                toast.error(errMessage.errors.password_confirmation[0])
              }
              if ('tariff' in errMessage.errors) {
                toast.error(errMessage.errors.tariff[0])
              }
            }
            if ('error' in errMessage) {
              toast.error(errMessage.error)
            }
          }
        })
    },
  })

  const normalizePhoneNumber = (value: string) => {
    return '+' + value
  }

  const handleClose = () => {
    setShowModal()
  }

  return (
    <>
      <form
        noValidate
        onSubmit={e => {
          e.preventDefault()
          formik.handleSubmit(e)
        }}
        className={styles.main_school}
      >
        <div className={styles.main_school_container}>
          <div onClick={handleClose} className={styles.main_school_closedModal}>
            <IconSvg width={30} height={30} viewBoxSize="0 0 64 64" path={crossIconPath} />
          </div>
          <div style={{ textAlign: 'center' }}>
            {/*<IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={addStudentIconPath}/>*/}
            <span className={styles.main_school_title}>Создание школы</span>
          </div>
          <div className={styles.main_school_name}>
            <label htmlFor="name">Название школы:</label>
            <br />
            <Input name="name" value={formik.values.name} onChange={formik.handleChange} type="text" />
            <br />
          </div>
          <div className={styles.main_school_name}>
            <label htmlFor="email">Email:</label>
            <br />
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              error={formik.errors.email && formik.touched.email ? true : false}
            />
            <br />
          </div>
          <div className={styles.main_school_name} style={{ margin: 0 }}>
            <label htmlFor="phone_number">Номер телефона:</label>
            <br />
            <Input
              onChangePhone={values => formik.setFieldValue('phone_number', normalizePhoneNumber(values))}
              value={formik.values.phone_number}
              onBlur={formik.handleBlur}
              name="phone_number"
              type="text"
              variant="phone"
              error={formik.errors.phone_number && formik.touched.phone_number ? true : false}
            />
          </div>
          <div className={styles.main_school_name}>
            <label htmlFor="password">Пароль:</label>
            <br />
            <Input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              error={formik.errors.password && formik.touched.password ? true : false}
            />
            <br />
          </div>
          <div className={styles.main_school_name}>
            <label htmlFor="password_confirmation">Подтверждение пароля:</label>
            <br />
            <Input
              name="password_confirmation"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              type="password"
              error={formik.errors.password_confirmation && formik.touched.password_confirmation ? true : false}
            />
            <br />
          </div>
          <div className={styles.main_school_name}>
            <label htmlFor="tariff">Тарифный план:</label>
            <br />
            <select
              name="tariff"
              value={formik.values.tariff}
              onChange={formik.handleChange}
              aria-label="Выберите тарифный план"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            >
              <option value="">Выберите тариф</option>
              <option value="Junior">Junior - 468 BYN/год (3 курса, 10 учеников)</option>
              <option value="Middle">Middle - 948 BYN/год (10 курсов, 50 учеников)</option>
              <option value="Senior">Senior - 1788 BYN/год (50 курсов, 500 учеников)</option>
            </select>
            <br />
          </div>

          <div className={styles.main_school_btn}>
            <Button
              type={'submit'}
              style={{ width: '474px' }}
              variant={
                isLoading ||
                !formik.values.name ||
                !formik.values.email ||
                !formik.values.phone_number ||
                !formik.values.password ||
                !formik.values.password_confirmation ||
                !formik.values.tariff
                  ? 'newDisabled'
                  : 'newPrimary'
              }
              text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Создать'}
              disabled={
                isLoading ||
                !formik.values.name ||
                !formik.values.email ||
                !formik.values.phone_number ||
                !formik.values.password ||
                !formik.values.password_confirmation ||
                !formik.values.tariff
              }
            />
          </div>
        </div>
      </form>
      {isOpenLimitModal ? (
        <Portal closeModal={onToggle}>
          <LimitModal message={message} setShowLimitModal={onToggle} setShowMainModal={setShowModal} />
        </Portal>
      ) : null}
    </>
  )
}
