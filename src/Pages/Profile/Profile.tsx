import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { AboutUser } from './AboutUser'
import { notifications } from './config/notif'
import { changePasswordSchema } from './schemas/changePasswordSchema'
import {
    useChangePasswordMutation,
    useFetchProfileDataQuery,
    useUpdateProfileMutation,
    useConfirmEmailMutation
} from '../../api/profileService'
import { NotificationItem } from './NotificationItem'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'
import { profileT } from 'types/profileT'
import { useLazyLogoutQuery } from "../../api/userLoginService";
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { auth, role } from "../../store/redux/users/slice"
import { validateEmail } from 'utils/validateEmail'
import { tgNotificationsService, useFetchNotificationsQuery } from 'api/tgNotificationsServices'

import { motion } from 'framer-motion'
import {authSelector, selectUser} from "../../selectors";


import styles from './profile.module.scss'
import { validatePhone } from "../../utils/validatePhone";
import { IconSvg } from "../../components/common/IconSvg/IconSvg";
import { crossIconPath } from "../../config/commonSvgIconsPath";
import { Path } from "../../enum/pathE";
import { log } from 'console'
import { boolean } from 'yup/lib/locale'
import { bool } from 'yup'

type notifForStudentAndTeacher = {
    id: number;
    info: string;
    desc: string;
    toggleType: string;
}


export const Profile = () => {
    const [changePasswordFunc, { isError, isSuccess }] = useChangePasswordMutation()
    const [changeEmailFunc] = useUpdateProfileMutation()
    const [confirmEmail] = useConfirmEmailMutation()
    const { data, isFetching, isSuccess: profileIsSuccess } = useFetchProfileDataQuery()
    const [profileData, setProfileData] = useState<profileT>()
    const email = profileData?.user.email
    const dispatch = useAppDispatch()
    const [logout] = useLazyLogoutQuery()
    const [error, setError] = useState<string>('')
    const [isOpen, setOpen] = useState(false)
    const [newEmail, setNewEmail] = useState<string>('')
    const [tokenError, setTokenError] = useState<string>('')
    const { data: notificationsResponseData, isSuccess: notificaionsSuccess } = useFetchNotificationsQuery()
    const [notificationsData, setNotificatonsData] = useState<notifForStudentAndTeacher[]>([])
    const isLogin = useAppSelector(authSelector);
    const {role: userRole} = useAppSelector(selectUser);

  
    // console.log(notificaionsSuccess);
    // console.log(typeof userRole);
    const notifForStudentAndTeacher = notifications.slice(0, 2)
    const notifForAdmin = notifications.slice(1, 3)

    useEffect(() => {
        if (userRole === 1 || userRole === 2) {          
            setNotificatonsData(notifForStudentAndTeacher)       
        } else if (userRole === 6) {
            setNotificatonsData(notifForAdmin)

        } else {
            setNotificatonsData(notificationsData)
        }
    }, [])
    

    const changePassword = useFormik({
        initialValues: {
            new_password: '',
            email: email,
            new_password_again: '',
        },
        // validationSchema: changePasswordSchema,
        onSubmit: (values, { resetForm }) => {
            const { new_password: new_password, new_password_again: new_password2 } = values
            changePasswordFunc({ new_password, new_password_again })
            resetForm()
        },
    })

    const logOut = async () => {
        await localStorage.clear()
        await logout()
        window.location.reload()

        dispatch(auth(false))
    }

    useEffect(() => {
        if (profileIsSuccess) {
            setProfileData(data[0])
        }
    }, [profileIsSuccess])

    useEffect(() => {
        isSuccess && changePassword.setSubmitting(false)
    }, [isSuccess])

    const {
        values: { new_password, new_password_again },
        errors,
        isSubmitting,
        handleSubmit: handlePasswordsSubmit,
        handleChange: handlePasswordChange,
    } = changePassword


    const isBtnDisabled = !new_password || !new_password_again || Boolean(errors.new_password) || Boolean(errors.new_password_again) || isError || isSubmitting || new_password !== new_password_again
    /*const isEmailBtnDisabled = !email
    const email_edit = (val: any) => {
      if (!val.data) {
        if (email == "") return;
        setEmail(email.slice(0, -1))
        return
      }
     setEmail(email+val.data)
    }
  */
    const changeEmail = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: async (values, { resetForm }) => {
            if (validateEmail(values.email)) {
                setError('')
                const emailData = { user: values }
                await changeEmailFunc({ userInfo: emailData, id: profileData?.profile_id })
                    .unwrap()
                    .then(async (data: any) => {
                        if (data.email_confirm) {
                            setOpen(true)
                        }
                        setNewEmail(values.email)
                        resetForm()
                    })
                    .catch((response: any) => {
                        if (response.status === 400) {
                            setError(response.data)
                        }
                    })
            } else {
                setError('Некорректный email')
            }
        },
    })

    const sendToken = useFormik({
        initialValues: {
            token: ''
        },
        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append('token', values.token)
            formData.append('email', newEmail)
            await confirmEmail(formData)
                .unwrap()
                .then(() => {
                    setOpen(false)
                    window.location.reload()
                })
                .catch((response: any) => {
                    setTokenError(response.data)
                })
        },
    })

    const handleClose = () => {
        setOpen(false)
    }


    function isToggleType(toggleType: string): toggleType is "homework_notifications" | "messages_notifications" | "completed_courses_notifications" {
        return toggleType === 'homework_notifications' || toggleType === 'messages_notifications' || toggleType === 'completed_courses_notifications';
    }



    // console.log(notifications.slice(1, 3));
    


    return (
        <motion.div className={styles.wrapper}
            initial={{
                scale: 0.1,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                delay: 0.1,
                ease: 'easeInOut',
                duration: 0.5,
            }}
        >
            <div className={styles.profile}>
                <AboutUser />
                <div className={styles.forms_wrapper}>
                    <form className={styles.container} onSubmit={handlePasswordsSubmit}>
                        <h5 className={styles.profile_block_title}>Смена пароля</h5>
                        <Input name="new_password" type="text" onChange={handlePasswordChange} value={new_password}
                            placeholder="Новый пароль" />
                        <div className={styles.container_wrapper}>
                            <Input
                                name="new_password_again"
                                placeholder="Повторить новый пароль"
                                type="text"
                                onChange={handlePasswordChange}
                                value={new_password_again}
                            />
                        </div>
                        <div className={styles.container_wrapper}>
                            <Button
                                style={{
                                    paddingTop: isSubmitting ? '7px' : '11px',
                                    paddingBottom: isSubmitting ? '7px' : '11px'
                                }}
                                disabled={isBtnDisabled}
                                className={styles.profile_block_btn}
                                type="submit"
                                variant={isBtnDisabled ? 'disabled' : 'primary'}
                                text={isSubmitting ? <SimpleLoader style={{ width: '15px', height: '15px' }}
                                    loaderColor="#ffff" /> : 'Сменить пароль'}
                                onClick={logOut}
                            />
                        </div>
                    </form>

                    <form className={styles.container} onSubmit={changeEmail.handleSubmit}>
                        <h5 className={styles.profile_block_title}>Смена email</h5>
                        <Input name="email" type="text" id={'email-change'} onChange={changeEmail.handleChange} onInput={() => setError('')}
                            value={changeEmail.values.email} placeholder="Новый email" />
                        {error && <span className={styles.container_error}>{error}</span>}
                        <div className={styles.container_wrapper}>
                            <Button
                                style={{
                                    paddingTop: changeEmail.isSubmitting ? '7px' : '11px',
                                    paddingBottom: changeEmail.isSubmitting ? '7px' : '11px'
                                }}
                                disabled={!changeEmail.values.email}
                                className={styles.profile_block_btn}
                                type="submit"
                                variant={!changeEmail.values.email ? 'disabled' : 'primary'}
                                text={changeEmail.isSubmitting ? <SimpleLoader style={{ width: '15px', height: '15px' }}
                                    loaderColor="#ffff" /> : 'Сменить email'}
                            />
                        </div>
                    </form>


                    {notificationsResponseData && notificationsResponseData[0] ? (
                        <div className={styles.notification}>
                            <h5 className={styles.profile_block_title}>Уведомления</h5>
                            <div className={styles.notification_toggleWrapper}>
                                {notificationsResponseData && notificationsResponseData[0] ? notificationsData.map(({ id, info, desc, toggleType }) => {
                                    if (isToggleType(toggleType)) {
                                        return (
                                            <NotificationItem
                                                key={id}
                                                id={id}
                                                info={info}
                                                desc={desc}
                                                initialStates={{
                                                    id: notificationsResponseData[0].id,
                                                    homework_notifications: Boolean(notificationsResponseData[0].homework_notifications),
                                                    messages_notifications: Boolean(notificationsResponseData[0].messages_notifications),
                                                    completed_courses_notifications: Boolean(notificationsResponseData[0].completed_courses_notifications),
                                                    tg_user: notificationsResponseData[0].tg_user,
                                                    user_role: userRole
                                                }}
                                                toggleType={toggleType}
                                            />
                                        );
                                    }
                                }) : null}
                            </div>
                        </div>
                    ) : (
                        <form className={styles.container}>
                            <h5 className={styles.profile_block_title}>Уведомления</h5>

                            <div className={styles.container_wrapper}>
                                <Button
                                    className={styles.profile_block_btn}
                                    variant={'primary'}
                                    text={'Включить Телеграм уведомления'}
                                    onClick={() => window.open('https://t.me/overschool_news_bot', '_blank')}
                                />
                            </div>
                        </form>
                    )}


                </div>
                {isOpen && (
                    <div className={styles.modal}>
                        <div>
                            <div className={styles.modal_closed} onClick={handleClose}>
                                <IconSvg width={15} height={15} viewBoxSize="0 0 14 14" path={crossIconPath} />
                            </div>
                            <form className={styles.container} onSubmit={sendToken.handleSubmit}>
                                <h5 className={styles.profile_block_title}>Введите токен подтверждения, который был выслан
                                    на Ваш новый email:</h5>
                                <Input name="token" type="text" onChange={sendToken.handleChange}
                                    value={sendToken.values.token} placeholder="Токен подтверждения" />
                                {tokenError && <span className={styles.container_error}>{tokenError}</span>}
                                <div className={styles.container_wrapper}>
                                    <Button
                                        style={{
                                            paddingTop: sendToken.isSubmitting ? '7px' : '11px',
                                            paddingBottom: sendToken.isSubmitting ? '7px' : '11px'
                                        }}
                                        disabled={!sendToken.values.token}
                                        className={styles.profile_block_btn}
                                        type="submit"
                                        variant={!sendToken.values.token ? 'disabled' : 'primary'}
                                        text={sendToken.isSubmitting ?
                                            <SimpleLoader style={{ width: '15px', height: '15px' }}
                                                loaderColor="#ffff" /> : 'Отправить'}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
