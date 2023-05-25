import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { userDataSchema } from './schemas'
import { useFetchProfileDataQuery, useUpdateProfileMutation } from '../../api/profileService'
import { useAppSelector } from 'store/hooks/index'
import { userIdSelector } from 'selectors/index'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'
import { profileT } from 'types/profileT'

import styles from './profile.module.scss'
import formStyles from './formStyles.module.scss'

const optionsList = ['Женский', 'Мужской']

export const AboutUser: FC = memo(() => {
  const [avatarFile, setAvatarFile] = useState<File | Blob>()
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const userId = useAppSelector(userIdSelector)

  const { data, isFetching, isError, isSuccess: profileIsSuccess } = useFetchProfileDataQuery()
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation()

  const [profileData, setProfileData] = useState<profileT>()

  const formik = useFormik({
    initialValues: {
      avatar: profileData?.avatar || '',
      avatar_url: avatarUrl || window.appConfig.imagePath + profileData?.avatar_url,
      city: profileData?.city || '',
      description: profileData?.description || '',
      sex: profileData?.sex || '',
      first_name: profileData?.user.first_name || '',
      last_name: profileData?.user.last_name || '',
      email: profileData?.user.email || '',
      phone_number: profileData?.user.phone_number || '',
    },
    enableReinitialize: true,
    validationSchema: userDataSchema,
    onSubmit: values => {
      const { avatar, avatar_url, city, description, sex, ...rest } = values

      const formData = new FormData()

      const objToSend = {
        city,
        description,
        sex,
        user: { ...rest },
      }

      avatarFile && formData.append('avatar', avatarFile)

      avatarFile && updateProfile({ userInfo: formData, id: userId })
      updateProfile({ userInfo: objToSend, id: userId })
    },
  })

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setAvatarUrl(url)
      setAvatarFile(e.target.files[0])
    }
  }

  useEffect(() => {
    isSuccess && formik.setSubmitting(false)
  }, [isSuccess])

  useEffect(() => {
    profileIsSuccess && setProfileData(data[0])
  }, [profileIsSuccess])

  const {
    values: { city, description, email, last_name, first_name, phone_number, avatar_url, sex },
    handleChange,
    handleSubmit,
    //touched,
    //errors,
    isSubmitting,
  } = formik

  return (
    <form className={styles.container + ' ' + formStyles.form} onSubmit={handleSubmit}>
      <h3 className={styles.profile_title}>Настройка профиля</h3>

      <div className={styles.profile_block}>
        <Input name={'email'} type={'text'} label={'Email:'} value={email as string} onChange={handleChange} />
        {/* {errors.email} */}
      </div>
      <div className={formStyles.form_avatarWrapper}>
        <div className={formStyles.form_avatarWrapper_avatarBlock}>
          <span className={formStyles.form_avatarWrapper_avatarBlock_title}>Аватар:</span>
          {avatar_url ? (
            <img className={formStyles.form_avatarWrapper_avatarBlock_img} src={avatar_url} alt="" />
          ) : (
            <div className={styles.profile_block_avatarBlock_avatar} />
          )}
          <input className={styles.profile_block_avatarBlock_input} value={''} name={'avatar'} type={'file'} onChange={onChangeAvatar} />
        </div>
      </div>
      <div className={styles.profile_block}>
        <Input name={'first_name'} type={'text'} label={'Имя:'} onChange={handleChange} value={first_name as string} />
      </div>
      <div className={styles.profile_block}>
        <Input name={'last_name'} type={'text'} label={'Фамилия:'} onChange={handleChange} value={last_name as string} />
      </div>
      <div className={styles.profile_block}>
        <Input
          name={'phone_number'}
          type={'text'}
          label={'Телефон:'}
          onChange={handleChange}
          value={phone_number as string}
          placeholder={'Введите номер телефона'}
        />
        {/* {errors.phone_number} */}
      </div>
      <div className={styles.profile_block}>
        <Input name={'city'} type={'text'} label={'Город:'} onChange={handleChange} value={city as string} placeholder={'Введите город'} />
      </div>
      <div className={styles.profile_block}>
        <span className={styles.profile_block_avatarBlock_title}>О себе:</span>
        <textarea
          className={styles.profile_block_textArea}
          onChange={handleChange}
          value={description}
          name="description"
          placeholder={
            description
              ? description
              : 'Опишите вашу карьеру и достижения. Эта информация будет отображена на страницах курсов, в которых вы являетесь преподавателем'
          }
        />
      </div>
      <div className={styles.profile_block}>
        <span className={styles.profile_block_avatarBlock_title}>Пол:</span>
        <select className={styles.profile_block_select} onChange={handleChange} value={formik.values.sex} name="sex" id="sex" required>
          <option value="" disabled>
            Выбрать пол
          </option>
          <option value={'М'}>Мужской</option>
          <option value={'Ж'}>Женский</option>
        </select>
      </div>
      <div className={formStyles.form_btnSave}>
        <Button
          style={{ paddingTop: isSubmitting ? '10px' : '11px', paddingBottom: isSubmitting ? '10px' : '11px' }}
          disabled={isSubmitting || isFetching || isError}
          className={styles.profile_block_btn}
          type="submit"
          text={isSubmitting || isFetching ? <SimpleLoader style={{ width: '15px', height: '15px' }} loaderColor="#ffff" /> : 'Сохранить'}
          variant={isSubmitting || isFetching || isError ? 'disabled' : 'primary'}
        />
      </div>
    </form>
  )
})
