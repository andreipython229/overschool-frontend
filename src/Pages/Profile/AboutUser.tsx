import { ChangeEvent, FC, memo, useState } from 'react'
import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { userDataSchema } from './schemas/index'
import { useFetchProfileDataQuery, useUpdateProfileMutation } from '../../api/profileService'

import styles from './profile.module.scss'
import formStyles from './formStyles.module.scss'

const optionsList = ['Женский', 'Мужской']

export const AboutUser: FC = memo(() => {
  const [avatarFile, setAvatarFile] = useState<File | Blob>()
  const [avatarUrl, setAvatarUrl] = useState<string>()

  const { data } = useFetchProfileDataQuery(1)
  const [updateProfile] = useUpdateProfileMutation()

  const formik = useFormik({
    initialValues: {
      avatar: data?.avatar || '',
      avatar_url: avatarUrl || data?.avatar_url,
      city: data?.city,
      description: data?.description,
      sex: data?.sex || '',
      first_name: data?.user.first_name,
      last_name: data?.user.last_name,
      email: data?.user.email,
      phone_number: data?.user.phone_number,
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

      avatarFile && updateProfile({ userInfo: formData, id: 1 })
      updateProfile({ userInfo: objToSend, id: 1 })
    },
  })

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setAvatarUrl(url)
      setAvatarFile(e.target.files[0])
    }
  }

  const {
    values: { city, description, email, last_name, first_name, phone_number, avatar_url },
    handleChange,
    handleSubmit,
    //touched,
    //errors,
  } = formik

  return (
    <form className={styles.container + ' ' + formStyles.form} onSubmit={handleSubmit}>
      <h3>Настройка профиля</h3>
      <div className={styles.profile_block}>
        <Input name={'email'} type={'text'} label={'Email:'} value={email as string} onChange={handleChange} />
        {/* {errors.email} */}
      </div>
      <div className={formStyles.form_avatarWrapper}>
        <div className={formStyles.form_avatarWrapper_avatarBlock}>
          <span className={formStyles.form_avatarWrapper_avatarBlock_title}>Аватар:</span>
          {avatar_url ? (
            <img className={formStyles.form_avatarWrapper_avatarBlock_img} src={avatar_url} alt="User Avatar" />
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
        <select onChange={handleChange} value={formik.values.sex} name="sex" id="sex">
          <option value={'М'}>Мужской</option>
          <option value={'Ж'}>Женский</option>
        </select>
      </div>
      <div className={formStyles.form_btnSave}>
        <Button type="submit" text={'Сохранить'} variant={'primary'} />
      </div>
    </form>
  )
})
