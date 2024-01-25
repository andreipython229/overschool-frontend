import {ChangeEvent, FC, memo, useEffect, useState} from 'react'
import {useFormik} from 'formik'

import {Input} from 'components/common/Input/Input/Input'
import {Button} from 'components/common/Button/Button'
import {userDataSchema} from './schemas'
import {useFetchProfileDataQuery, useUpdateProfileMutation} from '../../api/profileService'
import {useAppSelector} from 'store/hooks/index'
import {userIdSelector} from 'selectors/index'
import {SimpleLoader} from 'components/Loaders/SimpleLoader/index'
import {profileT} from 'types/profileT'
import {SelectInput} from 'components/common/SelectInput/SelectInput'

import styles from './profile.module.scss'
import formStyles from './formStyles.module.scss'

const optionsList = [
    {
        label: 'Женский',
        value: 'Ж',
    },
    {
        label: 'Мужской',
        value: 'М',
    },
]

export const AboutUser: FC = memo(() => {
    const [avatarFile, setAvatarFile] = useState<File | Blob>()
    const [avatarUrl, setAvatarUrl] = useState<string>('')

    const {data, isFetching, isError, isSuccess: profileIsSuccess} = useFetchProfileDataQuery()
    const [updateProfile, {isSuccess}] = useUpdateProfileMutation()

    const [profileData, setProfileData] = useState<profileT>()
    const [sex, setSex] = useState<string>()

    const formik = useFormik({
        initialValues: {
            avatar: profileData?.avatar || '',
            avatar_url: avatarUrl || profileData?.avatar,
            city: profileData?.city || '',
            // description: profileData?.description || '',
            first_name: profileData?.user.first_name || '',
            last_name: profileData?.user.last_name || '',
            email: profileData?.user.email || '',
            phone_number: profileData?.user.phone_number || '',
            patronymic: profileData?.user.patronymic || '',
        },
        enableReinitialize: true,
        validationSchema: userDataSchema,
        onSubmit: values => {
            const {avatar, avatar_url, city, ...rest} = values

            const formData = new FormData()

            const objToSend = {
                city,
                sex,
                user: {...rest},
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
                avatarFile ?
                    updateProfile({userInfo: formData, id: data[0]?.profile_id}).unwrap().catch(error => console.log(error.data))
                    : updateProfile({userInfo: objToSend, id: data[0]?.profile_id}).unwrap().catch(error => console.log(error.data));
            }
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
        if (profileIsSuccess) {
            setProfileData(data[0])
        }
    }, [profileIsSuccess])

    useEffect(() => {
        profileData && setSex(profileData.sex)
    }, [profileData])

    const {
        values: {city, email, last_name, first_name, patronymic, phone_number, avatar_url},
        handleChange,
        handleSubmit,
        //touched,
        //errors,
        isSubmitting,
    } = formik

    return (
        <form className={styles.container + ' ' + formStyles.form} onSubmit={handleSubmit}>
            {(isSubmitting || isFetching) && (
                <div className={styles.profile_loader}>
                    <SimpleLoader style={{width: '50px', height: '50px'}}/>
                </div>
            )}
            <h3 className={styles.profile_title}>Настройка профиля</h3>

            <div className={styles.profile_block}>
                <Input name={'email'} type={'text'} label={'Email:'} value={email as string} contentEditable={false}/>
                {/* {errors.email} */}
            </div>
            <div className={formStyles.form_avatarWrapper}>
                <div className={formStyles.form_avatarWrapper_avatarBlock}>
                    <span className={formStyles.form_avatarWrapper_avatarBlock_title}>Аватар:</span>
                    {avatar_url ? (
                        <img className={formStyles.form_avatarWrapper_avatarBlock_img} src={avatar_url} alt=""/>
                    ) : (
                        <div className={styles.profile_block_avatarBlock_avatar}/>
                    )}
                    <input className={styles.profile_block_avatarBlock_input} value={''} name={'avatar'} type={'file'}
                           onChange={onChangeAvatar}/>
                </div>
            </div>
            <div className={styles.profile_block}>
                <Input name={'first_name'} type={'text'} label={'Имя:'} onChange={handleChange}
                       value={first_name as string}/>
            </div>
            <div className={styles.profile_block}>
                <Input name={'last_name'} type={'text'} label={'Фамилия:'} onChange={handleChange}
                       value={last_name as string}/>
            </div>
            <div className={styles.profile_block}>
                <Input name={'patronymic'} type={'text'} label={'Отчество:'} onChange={handleChange}
                       value={patronymic as string}/>
            </div>
            <div className={styles.profile_block}>
                <Input
                    name={'phone_number'}
                    type={'text'}
                    label={'Телефон:'}
                    onChange={handleChange}
                    value={phone_number as string}
                    placeholder={'Введите номер телефона'}
                    required={false}
                />
                {/* {errors.phone_number} */}
            </div>
            <div className={styles.profile_block}>
                <Input name={'city'} type={'text'} label={'Город:'} onChange={handleChange} value={city as string}
                       placeholder={'Введите город'} required={false}/>
            </div>
            {/* <div className={styles.profile_block}>
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
            </div> */}
            <div className={styles.profile_block}>
                <SelectInput optionsList={optionsList} selectedOption={sex} defaultOption="Выберите пол"
                             setSelectedValue={setSex}/>
            </div>
            <div className={formStyles.form_btnSave}>
                <Button
                    style={{paddingTop: '11px', paddingBottom: '11px'}}
                    disabled={isSubmitting || isFetching || isError}
                    className={styles.profile_block_btn}
                    type="submit"
                    text={'Сохранить'}
                    variant={isSubmitting || isFetching || isError ? 'disabled' : 'primary'}
                />
            </div>
        </form>
    )
})
