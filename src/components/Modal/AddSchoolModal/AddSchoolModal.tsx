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
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: email,
      phone_number: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      const userData = {
        school_name: formik.values.name,
        phone_number: formik.values.phone_number,
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
          <div className={styles.main_school_name} style={{ margin: 0 }}>
            <label htmlFor="name">Номер телефона:</label>
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

          <div className={styles.main_school_btn}>
            <Button
              type={'submit'}
              style={{ width: '474px' }}
              variant={isLoading || !formik.values.name || !formik.values.phone_number ? 'newDisabled' : 'newPrimary'}
              text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Создать'}
              disabled={isLoading || !formik.values.name || !formik.values.phone_number}
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
