import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Input } from 'components/common/Input/Input/Input'
import { userDataSchema } from './schemas'
import { useFetchProfileDataQuery, useUpdateProfileMutation } from '../../api/profileService'
import { useFetchIndividualRatingQuery, useLazyFetchIndividualRatingQuery } from '../../api/ratingService'
import { useAppDispatch, useAppSelector } from 'store/hooks/index'
import { selectUser } from 'selectors/index'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'
import { profileT } from 'types/profileT'
import styles from './profile.module.scss'
import formStyles from './formStyles.module.scss'
import { individualRatingT } from '../../types/ratingT'
import { RoleE } from '../../enum/roleE'
import { setUserProfile } from 'store/redux/users/profileSlice'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'

type AboutUserT = {
  handleSubmitAboutUser: boolean
}

export const AboutUser: FC<AboutUserT> = memo(({ handleSubmitAboutUser }) => {
  const { role: UserRole } = useAppSelector(selectUser)
  const [avatarFile, setAvatarFile] = useState<File | Blob>()
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const dispatch = useAppDispatch()

  const { data, isFetching, isSuccess: profileIsSuccess } = useFetchProfileDataQuery()
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation()

  const [profileData, setProfileData] = useState<profileT>()
  const [sex, setSex] = useState<string>()
  const [phoneError, setPhoneError] = useState<string>()
  const [avatarError, setAvatarError] = useState<string>('')
  const schoolName = window.location.href.split('/')[4]
  const [fetchRates, { data: ratingData, isSuccess: ratingSuccess }] = useLazyFetchIndividualRatingQuery()
  const [rating, setRating] = useState<individualRatingT>()

  const restrictedEmails = ['admin@coursehub.ru', 'teacher@coursehub.ru', 'student@coursehub.ru']
  const [isRestrictedUser, setIsRestrictedUser] = useState(false)

  useEffect(() => {
    if (UserRole === RoleE.Student) {
      fetchRates({ schoolName: schoolName })
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      avatar: profileData?.avatar || '',
      avatar_url: avatarUrl || profileData?.avatar,
      city: profileData?.city || '',
      first_name: profileData?.user.first_name || '',
      last_name: profileData?.user.last_name || '',
      email: profileData?.user.email || '',
      phone_number: profileData?.user.phone_number || '',
      patronymic: profileData?.user.patronymic || '',
    },
    enableReinitialize: true,
    validationSchema: userDataSchema,
    onSubmit: values => {
      if (isRestrictedUser) return

      const { avatar, avatar_url, city, ...rest } = values

      const formData = new FormData()

      const objToSend = {
        city,
        sex,
        user: { ...rest },
      }

      avatarFile && formData.append('avatar', avatarFile)
      formData.append('user.email', objToSend.user.email)
      formData.append('user.first_name', objToSend.user.first_name)
      formData.append('user.last_name', objToSend.user.last_name)
      formData.append('user.phone_number', objToSend.user.phone_number)
      formData.append('user.patronymic', objToSend.user.patronymic)
      formData.append('city', objToSend.city)
      objToSend.sex && formData.append('sex', objToSend.sex)

      if (data) {
        avatarFile
          ? updateProfile({ userInfo: formData, id: data[0]?.profile_id })
              .unwrap()
              .then(data =>
                dispatch(
                  setUserProfile({
                    id: data.profile_id,
                    first_name: data.user.first_name,
                    last_name: data.user.last_name,
                    email: String(data.user.email),
                    username: String(data.user.username),
                    phone_number: String(data.user.phone_number),
                    avatar: data.avatar,
                    additional_roles: data.additional_roles,
                  }),
                ),
              )
              .catch(error => {
                console.log(error.data)
                error.data['errors']['user']['phone_number'] && setPhoneError(error.data['errors']['user']['phone_number'][0])
              })
          : updateProfile({ userInfo: objToSend, id: data[0]?.profile_id })
              .unwrap()
              .catch(error => {
                console.log(error.data)
                if (error.data['errors']['user']['phone_number']) {
                  setPhoneError(error.data['errors']['user']['phone_number'][0])
                  formik.setSubmitting(false)
                }
              })
      }
    },
  })

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatarError('')
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size <= 7 * 1024 * 1024) {
        const url = URL.createObjectURL(e.target.files[0])
        setAvatarUrl(url)
        setAvatarFile(e.target.files[0])
      } else {
        setAvatarError('Допустимый размер файла не должен превышать 7 МБ')
      }
    }
  }

  useEffect(() => {
    isSuccess && formik.setSubmitting(false)
  }, [isSuccess])

  useEffect(() => {
    if (profileIsSuccess) {
      setProfileData(data[0])

      const userEmail = data[0]?.user?.email
      if (userEmail && restrictedEmails.includes(userEmail)) {
        setIsRestrictedUser(true)
      } else {
        setIsRestrictedUser(false)
      }
    }
  }, [profileIsSuccess])

  useEffect(() => {
    profileData && setSex(profileData.sex)
  }, [profileData])

  useEffect(() => {
    if (ratingSuccess) {
      setRating(ratingData)
    }
  }, [ratingSuccess])

  const {
    values: { city, email, last_name, first_name, patronymic, phone_number, avatar_url },
    handleChange,
    handleSubmit,
    //touched,
    // errors,
    isSubmitting,
  } = formik

  useEffect(() => {
    if (handleSubmitAboutUser) {
      handleSubmit()
    }
  }, [handleSubmitAboutUser])

  if (!profileData) {
    return <LoaderLayout />
  }

  return (
    <form className={styles.container + ' ' + formStyles.form} onSubmit={handleSubmit}>
      {(isSubmitting || isFetching) && (
        <div className={styles.profile_loader}>
          <SimpleLoader style={{ width: '50px', height: '50px' }} />
        </div>
      )}
      {UserRole === RoleE.Student && (
        <div className={styles.profile_rating}>
          <p className={styles.profile_rating_top}>
            Пройденных занятий: {rating?.completed_lessons}{' '}
            {rating?.top_by_lessons_num && <span> | вы в топ {rating?.top_by_lessons_num} пользователей</span>}
          </p>
          <p>
            Доступных курсов: {rating?.available_courses}{' '}
            {rating?.top_by_courses_num && <span> | вы в топ {rating?.top_by_courses_num} пользователей</span>}
          </p>
        </div>
      )}
      <h1 className={styles.profile_title}>Настройка профиля</h1>
      <div className={styles.profile_block}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            lineHeight: '19px',
            gap: '0.5rem',
            fontSize: '16px',
            marginBottom: '20px',
            marginTop: '20px',
          }}
        >
          <strong>Email:</strong>
          {email}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', lineHeight: '19px', gap: '0.5rem', fontSize: '16px' }}>
          <strong>Имя Пользователя:</strong>
          {first_name}
        </span>
      </div>
      <div className={formStyles.form_avatarWrapper}>
        <div className={formStyles.form_avatarWrapper_avatarBlock}>
          {avatar_url ? (
            <div className={styles.profile_block}>
              <img className={formStyles.form_avatarWrapper_avatarBlock_img} src={profileData.avatar} alt="" />
            </div>
          ) : (
            <div className={styles.profile_block_avatarBlock_avatar} />
          )}
          <input
            className={styles.profile_block_avatarBlock_input}
            value={''}
            name={'avatar'}
            type={'file'}
            onChange={onChangeAvatar}
            disabled={isRestrictedUser}
          />
        </div>
        {avatarError && <p className={formStyles.form_avatarWrapper_error}>{avatarError}</p>}
      </div>
      <div className={styles.profile_block}>
        <Input name={'first_name'} type={'text'} label={'Имя:'} onChange={handleChange} value={first_name as string} disabled={isRestrictedUser} />
      </div>
      <div className={styles.profile_block}>
        <Input name={'last_name'} type={'text'} label={'Фамилия:'} onChange={handleChange} value={last_name as string} disabled={isRestrictedUser} />
      </div>
      <div className={styles.profile_block}>
        <Input
          name={'patronymic'}
          type={'text'}
          label={'Отчество:'}
          onChange={handleChange}
          value={patronymic as string}
          disabled={isRestrictedUser}
        />
      </div>
      <div className={styles.profile_block}>
        <Input
          name={'phone_number'}
          type={'text'}
          label={'Телефон:'}
          onChange={handleChange}
          onInput={() => setPhoneError('')}
          value={phone_number as string}
          placeholder={'Введите номер телефона'}
          required={false}
          disabled={isRestrictedUser}
        />
        {phoneError && <span className={styles.container_error}>{phoneError}</span>}
      </div>
    </form>
  )
})
